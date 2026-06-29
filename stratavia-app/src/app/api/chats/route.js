import conexao_promessa from "@/lib/mongodb";
import { cookies } from "next/headers";
import { gerar_resposta_gemini } from "@/services/ai/gemini";

export async function GET() {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;

    if (!email_usuario) {
      return Response.json({ erro: "Não autenticado" }, { status: 401 });
    }

    const cliente_banco = await conexao_promessa;
    const banco_dados = cliente_banco.db("stratavia");
    
    // AQUI MUDOU: Ordenamos primeiro pelos fixados (-1 é descrescente, ou seja, true vem antes), e depois pela data
    const chats = await banco_dados.collection("chats")
      .find({ email_usuario })
      .sort({ fixado: -1, atualizado_em: -1 })
      .project({ titulo: 1, atualizado_em: 1, fixado: 1 }) // Trouxemos o campo fixado
      .toArray();

    return Response.json({ sucesso: true, chats }, { status: 200 });
  } catch (erro) {
    console.error("Erro ao buscar histórico:", erro);
    return Response.json({ erro: "Erro interno no servidor." }, { status: 500 });
  }
}

export async function POST(requisicao) {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;
    if (!email_usuario) return Response.json({ erro: "Não autenticado" }, { status: 401 });

    const { texto } = await requisicao.json();
    if (!texto) return Response.json({ erro: "Texto vazio" }, { status: 400 });

    const titulo = texto.length > 28 ? texto.substring(0, 28) + "..." : texto;
    const nova_mensagem_usuario = { id: Date.now().toString(), autor: "usuario", texto };

    const texto_resposta_ia = await gerar_resposta_gemini(texto, []);

    const nova_mensagem_ia = { 
      id: (Date.now() + 1).toString(), 
      autor: "ia", 
      texto: texto_resposta_ia 
    };

    const novo_chat = {
      email_usuario,
      titulo,
      fixado: false, // Por padrão, nasce desfixado
      criado_em: new Date(),
      atualizado_em: new Date(),
      mensagens: [nova_mensagem_usuario, nova_mensagem_ia]
    };

    const cliente_banco = await conexao_promessa;
    const banco_dados = cliente_banco.db("stratavia");
    const resultado = await banco_dados.collection("chats").insertOne(novo_chat);

    return Response.json({ sucesso: true, chat: { ...novo_chat, _id: resultado.insertedId } }, { status: 201 });
  } catch (erro) {
    console.error("Erro ao criar chat:", erro);
    return Response.json({ erro: "Erro interno." }, { status: 500 });
  }
}