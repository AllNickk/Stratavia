import { GoogleGenerativeAI } from "@google/generative-ai";

const ai_google = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Essa instrução define a "personalidade" da Stratavia pra IA não responder como um bot genérico
const instrucao_sistema = `Você é a inteligência do Stratavia Global Nomad Edition. 
Você é um consultor especialista em geoeconomia, otimização tributária internacional, cidadania global e vistos para nômades digitais.
Responda de forma profissional, direta, analítica e elegante. 
Use formatação Markdown (negrito, listas) para facilitar a leitura.
Se não souber algo, recomende consultar um advogado tributarista local.`;

export async function gerar_resposta_gemini(mensagem_usuario, historico_mensagens = []) {
  try {
    // Escolhendo o modelo flash que é bem rápido pra chat
    const modelo = ai_google.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: instrucao_sistema,
    });

    // O Gemini precisa que o histórico tenha o formato { role: 'user' | 'model', parts: [{ text: '...' }] }
    const historico_formatado = historico_mensagens.map((msg) => ({
      role: msg.autor === "usuario" ? "user" : "model",
      parts: [{ text: msg.texto }],
    }));

    // Inicia o chat passando o que já foi conversado antes
    const chat = modelo.startChat({
      history: historico_formatado,
    });

    // Manda a nova mensagem e espera a mágica acontecer
    const resultado = await chat.sendMessage(mensagem_usuario);
    return resultado.response.text();
    
  } catch (erro) {
    console.error("Erro na comunicação com o Gemini:", erro);
    return "Ocorreu um erro no servidor ao processar sua análise. Por favor, tente novamente em instantes.";
  }
}