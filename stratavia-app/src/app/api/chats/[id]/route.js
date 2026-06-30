import conexao_promessa from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

// GET: Pega todas as mensagens de um chat que já existe
export async function GET(requisicao, { params }) {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;
    if (!email_usuario) return Response.json({ erro: "Não autenticado" }, { status: 401 });

    const { id } = await params; // Extrai o ID da URL

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

// POST: Adiciona uma nova mensagem num chat existente
export async function POST(requisicao, { params }) {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;
    if (!email_usuario) return Response.json({ erro: "Não autenticado" }, { status: 401 });

    const { id } = await params;
    const { texto } = await requisicao.json();

    const nova_mensagem_usuario = { id: Date.now().toString(), autor: "usuario", texto };
    const nova_mensagem_ia = { 
      id: (Date.now() + 1).toString(), 
      autor: "ia", 
      texto: "Parâmetros atualizados na análise. O modelo preditivo continuará a processar este contexto." 
    };

    const cliente_banco = await conexao_promessa;
    const banco_dados = cliente_banco.db("stratavia");

    // Adiciona as duas mensagens novas e atualiza a data do chat
    await banco_dados.collection("chats").updateOne(
      { _id: new ObjectId(id), email_usuario },
      {
        $push: { mensagens: { $each: [nova_mensagem_usuario, nova_mensagem_ia] } },
        $set: { atualizado_em: new Date() }
      }
    );

    // Puxa o documento atualizado para devolver pro Front
    const chat_atualizado = await banco_dados.collection("chats").findOne({ _id: new ObjectId(id) });

    return Response.json({ sucesso: true, chat: chat_atualizado }, { status: 200 });
  } catch (erro) {
    console.error("Erro ao responder chat:", erro);
    return Response.json({ erro: "Erro interno." }, { status: 500 });
  }
}