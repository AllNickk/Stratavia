import conexao_promessa from "@/lib/mongodb";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { gerar_resposta_gemini } from "@/services/ai/gemini";

// GET e POST continuam iguais...
export async function GET(requisicao, { params }) {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;
    if (!email_usuario) return Response.json({ erro: "Não autenticado" }, { status: 401 });

    const { id } = await params;
    const cliente_banco = await conexao_promessa;
    const chat = await cliente_banco.db("stratavia").collection("chats").findOne({ _id: new ObjectId(id), email_usuario });

    if (!chat) return Response.json({ erro: "Chat não encontrado" }, { status: 404 });
    return Response.json({ sucesso: true, chat }, { status: 200 });
  } catch (erro) {
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

    const chat_atual = await banco_dados.collection("chats").findOne({ _id: new ObjectId(id), email_usuario });
    if (!chat_atual) return Response.json({ erro: "Chat não encontrado" }, { status: 404 });

    const nova_mensagem_usuario = { id: Date.now().toString(), autor: "usuario", texto };
    const texto_resposta_ia = await gerar_resposta_gemini(texto, chat_atual.mensagens);
    const nova_mensagem_ia = { id: (Date.now() + 1).toString(), autor: "ia", texto: texto_resposta_ia };

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
    return Response.json({ erro: "Erro interno." }, { status: 500 });
  }
}

// AQUI ESTÁ A NOVIDADE: Método para Deletar o chat
export async function DELETE(requisicao, { params }) {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;
    if (!email_usuario) return Response.json({ erro: "Não autenticado" }, { status: 401 });

    const { id } = await params;
    const cliente_banco = await conexao_promessa;
    
    await cliente_banco.db("stratavia").collection("chats").deleteOne({ 
      _id: new ObjectId(id), 
      email_usuario 
    });

    return Response.json({ sucesso: true }, { status: 200 });
  } catch (erro) {
    return Response.json({ erro: "Erro interno." }, { status: 500 });
  }
}

// AQUI ESTÁ A NOVIDADE: Método para Fixar/Desfixar o chat
export async function PATCH(requisicao, { params }) {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;
    if (!email_usuario) return Response.json({ erro: "Não autenticado" }, { status: 401 });

    const { id } = await params;
    const { fixado } = await requisicao.json(); // Recebe true ou false do frontend
    
    const cliente_banco = await conexao_promessa;
    await cliente_banco.db("stratavia").collection("chats").updateOne(
      { _id: new ObjectId(id), email_usuario },
      { $set: { fixado: fixado } }
    );

    return Response.json({ sucesso: true }, { status: 200 });
  } catch (erro) {
    return Response.json({ erro: "Erro interno." }, { status: 500 });
  }
}