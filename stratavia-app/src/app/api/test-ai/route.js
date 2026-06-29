import { gerar_resposta_gemini } from "@/services/ai/gemini";

export async function GET() {
  try {
    const response = await gerar_resposta_gemini("Diga apenas: Gemini conectado com sucesso!");

    return Response.json({ status: "ok", message: response });
  } catch (error) {
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }
}