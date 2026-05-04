import { GoogleGenAI } from "@google/genai";
import dbConnect from "@/lib/mongodb";
import Conversa from "@/lib/models/Conversa";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    await dbConnect(); 
    const { message, conversationId, userId} = await req.json();

    
    // Buscar histórico no MongoDB se a conversa já existir
    let chatHistory = [];
    if (conversationId) {
      const conversaExistente = await Conversa.findById(conversationId); //
      if (conversaExistente) {
        chatHistory = conversaExistente.mensagens.map(m => ({
          role: m.papel,
          parts: [{ text: m.conteudo }]
        }));
      }
    }

    const chat = ai.chats.create({ 
      model: "gemini-3-flash-preview",
      systemInstruction: "Você é um assistente especializado em leis fiscais e impostos brasileiros.",
      history: chatHistory
      // TODO: Pegar tipo de perfil e nivel de experiencia do usuário e alimentar para o systemInstruction
    });

    const result = await chat.sendMessage({message: message});
    const aiResponse = result.text;

    // Salvar ou atualizar a conversa no banco de dados
    let conversa;
    const novasMensagens = [
      { papel: 'user', conteudo: message },
      { papel: 'model', conteudo: aiResponse }
    ];

    if (conversationId) {
      conversa = await Conversa.findByIdAndUpdate(
        conversationId,
        { 
          $push: { mensagens: { $each: novasMensagens } },
          atualizadoEm: Date.now()
        },
        { new: true }
      );
    } else {
      conversa = await Conversa.create({
        usuarioId: userId, //
        titulo: message.substring(0, 30) + "...",
        mensagens: novasMensagens
      });
    }

    return NextResponse.json({ 
      response: aiResponse, 
      conversationId: conversa._id 
    });

  } catch (error) {
    console.error("Erro no Chat:", error);
    return NextResponse.json({ error: "Falha ao processar sua pergunta" }, { status: 500 });
  }
}