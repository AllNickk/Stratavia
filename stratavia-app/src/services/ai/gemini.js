// src/services/ai/gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const ai_google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const instrucao_sistema = `Você é a inteligência do Stratavia Global Nomad Edition. 
Você é um consultor especialista em geoeconomia, otimização tributária internacional, cidadania global e vistos para nômades digitais.
Responda de forma profissional, direta, analítica e elegante. 
Use formatação Markdown (negrito, listas) para facilitar a leitura.
Se não souber algo, recomende consultar um advogado tributarista local.`;

export async function gerar_resposta_gemini(mensagem_usuario, historico_mensagens = []) {
  try {
    // Usando o Gemini 2.5 Flash: ID exato extraído da sua API (versão estável e ultra rápida)
    const modelo = ai_google.getGenerativeModel({
      model: "gemini-2.5-flash", 
      systemInstruction: instrucao_sistema,
    });

    const historico_formatado = historico_mensagens.map((msg) => ({
      role: msg.autor === "usuario" ? "user" : "model",
      parts: [{ text: msg.texto }],
    }));

    const chat = modelo.startChat({
      history: historico_formatado,
    });

    const resultado = await chat.sendMessage(mensagem_usuario);
    return resultado.response.text();
    
  } catch (erro) {
    console.error("Erro na comunicação com o Gemini:", erro);
    return "Ocorreu um erro no servidor ao processar sua análise. Verifique sua chave de API ou tente novamente em instantes.";
  }
}