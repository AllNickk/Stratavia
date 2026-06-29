// src/app/api/modelos/route.js

export async function GET() {
  try {
    // Fazemos uma requisição direta na API do Google pedindo a lista de todos os modelos liberados pra sua chave
    const resposta = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const dados = await resposta.json();
    
    return Response.json(dados, { status: 200 });
  } catch (erro) {
    return Response.json({ erro: erro.message }, { status: 500 });
  }
}