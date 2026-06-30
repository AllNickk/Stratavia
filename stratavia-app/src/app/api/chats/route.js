import conexao_promessa from "@/lib/mongodb";
import { cookies } from "next/headers";

// GET: Pega todos os chats do usuário para popular a Sidebar
export async function GET() {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;

    if (!email_usuario) {
      return Response.json({ erro: "Não autenticado" }, { status: 401 });
    }

    const cliente_banco = await conexao_promessa;
    const banco_dados = cliente_banco.db("stratavia");
    
    // Busca os chats, ordenando do mais novo pro mais velho
    const chats = await banco_dados.collection("chats")
      .find({ email_usuario })
      .sort({ atualizado_em: -1 })
      .project({ titulo: 1, atualizado_em: 1 }) // Traz só o título para a barra lateral não ficar pesada
      .toArray();

    return Response.json({ sucesso: true, chats }, { status: 200 });
  } catch (erro) {
    console.error("Erro ao buscar histórico:", erro);
    return Response.json({ erro: "Erro interno no servidor." }, { status: 500 });
  }
}

// POST: Cria um chat inteiramente novo e salva a primeira mensagem
export async function POST(requisicao) {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;
    if (!email_usuario) return Response.json({ erro: "Não autenticado" }, { status: 401 });

    const { texto } = await requisicao.json();
    if (!texto) return Response.json({ erro: "Texto vazio" }, { status: 400 });

    // Gera o título baseado nas primeiras 28 letras da mensagem
    const titulo = texto.length > 28 ? texto.substring(0, 28) + "..." : texto;

    const nova_mensagem_usuario = { id: Date.now().toString(), autor: "usuario", texto };
    const nova_mensagem_ia = { 
      id: (Date.now() + 1).toString(), 
      autor: "ia", 
      texto: "Análise inicial registrada. A integração com o motor de inteligência Stratavia será acionada nesta etapa para gerar insights geoeconômicos." 
    };

    const novo_chat = {
      email_usuario,
      titulo,
      criado_em: new Date(),
      atualizado_em: new Date(),
      mensagens: [nova_mensagem_usuario, nova_mensagem_ia]
    };

    const cliente_banco = await conexao_promessa;
    const banco_dados = cliente_banco.db("stratavia");
    const resultado = await banco_dados.collection("chats").insertOne(novo_chat);

    // Devolvemos o chat completo com o ID que o Mongo gerou
    return Response.json({ sucesso: true, chat: { ...novo_chat, _id: resultado.insertedId } }, { status: 201 });
  } catch (erro) {
    console.error("Erro ao criar chat:", erro);
    return Response.json({ erro: "Erro interno." }, { status: 500 });
  }
}