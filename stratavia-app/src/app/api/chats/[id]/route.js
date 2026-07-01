import conexao_promessa from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { gerar_resposta_gemini } from "@/services/ai/gemini";

export async function GET(requisicao, { params }) {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;
    if (!email_usuario) return Response.json({ erro: "Não autenticado" }, { status: 401 });

    const { id } = await params;

    const cliente_banco = await conexao_promessa;
    const banco_dados = cliente_banco.db("stratavia");
    
    const chat = await banco_dados.collection("chats").findOne({ 
      _id: new ObjectId(id), 
      email_usuario 
    });

    if (!chat) return Response.json({ erro: "Chat não encontrado" }, { status: 404 });

    return Response.json({ sucesso: true, chat }, { status: 200 });
  } catch (erro) {
    console.error("Erro ao buscar mensagens do chat:", erro);
    return Response.json({ erro: "Erro interno." }, { status: 500 });
  }
}

export async function POST(requisicao, { params }) {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;
    if (!email_usuario) return Response.json({ erro: "Não autenticado" }, { status: 401 });

    const { id } = await params;
    const { texto } = await requisicao.json();

    const cliente_banco = await conexao_promessa;
    const banco_dados = cliente_banco.db("stratavia");

    // 1. Pega o chat atual no banco pra gente ler o histórico
    const chat_atual = await banco_dados.collection("chats").findOne({ 
      _id: new ObjectId(id), 
      email_usuario 
    });

    if (!chat_atual) return Response.json({ erro: "Chat não encontrado" }, { status: 404 });

    const nova_mensagem_usuario = { id: Date.now().toString(), autor: "usuario", texto };

    // 2. Chama a IA passando o texto novo e a lista de mensagens antigas
    const texto_resposta_ia = await gerar_resposta_gemini(texto, chat_atual.mensagens);

    const nova_mensagem_ia = { 
      id: (Date.now() + 1).toString(), 
      autor: "ia", 
      texto: texto_resposta_ia 
    };

    // 3. Atualiza o banco com a pergunta do usuário e a resposta da IA
    await banco_dados.collection("chats").updateOne(
      { _id: new ObjectId(id), email_usuario },
      {
        $push: { mensagens: { $each: [nova_mensagem_usuario, nova_mensagem_ia] } },
        $set: { atualizado_em: new Date() }
      }
    );

    const chat_atualizado = await banco_dados.collection("chats").findOne({ _id: new ObjectId(id) });

    return Response.json({ sucesso: true, chat: chat_atualizado }, { status: 200 });
  } catch (erro) {
    console.error("Erro ao responder chat:", erro);
    return Response.json({ erro: "Erro interno." }, { status: 500 });
  }
}