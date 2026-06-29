import conexao_promessa from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const banco_cookies = await cookies();
    const email_usuario = banco_cookies.get("sessao_stratavia")?.value;

    // Coloquei esse log pra gente ver no terminal exatamente o que tá chegando
    console.log("🛠️ Valor do cookie recebido:", email_usuario);

    if (!email_usuario) {
      return Response.json({ erro: "Não autenticado." }, { status: 401 });
    }

    // Trava de segurança: se o navegador mandar o cookie antigo, a gente já bloqueia aqui
    if (email_usuario === "autenticado") {
      console.log("🚨 ALERTA: O navegador mandou o cookie antigo! Precisa refazer o login.");
      return Response.json({ erro: "Sessão desatualizada. Por favor, faça login novamente." }, { status: 401 });
    }

    const cliente_banco = await conexao_promessa;
    const banco_dados = cliente_banco.db("stratavia");
    const colecao_usuarios = banco_dados.collection("usuarios");

    const usuario = await colecao_usuarios.findOne({ email: email_usuario });

    if (!usuario) {
      console.log("❌ Nenhum usuário encontrado com esse email no MongoDB:", email_usuario);
      return Response.json({ erro: "Usuário não encontrado." }, { status: 404 });
    }

    // Deu tudo certo!
    console.log("✅ Usuário encontrado:", usuario.nome_completo);
    return Response.json({
      sucesso: true,
      nome_completo: usuario.nome_completo,
      email: usuario.email
    }, { status: 200 });

  } catch (erro_servidor) {
    console.error("Erro ao buscar usuário logado:", erro_servidor);
    return Response.json({ erro: "Erro interno no servidor." }, { status: 500 });
  }
}