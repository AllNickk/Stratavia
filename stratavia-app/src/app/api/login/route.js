import bcrypt from "bcryptjs";
import conexao_promessa from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function POST(requisicao) {
  try {
    const corpo_requisicao = await requisicao.json();
    const { email, senha } = corpo_requisicao;

    if (!email || !senha) {
      return Response.json(
        { erro: "Email e senha são obrigatórios." }, 
        { status: 400 }
      );
    }

    const cliente_banco = await conexao_promessa;
    const banco_dados = cliente_banco.db("stratavia");
    const colecao_usuarios = banco_dados.collection("usuarios");

    const usuario = await colecao_usuarios.findOne({ email });

    if (!usuario) {
      return Response.json(
        { erro: "Credenciais inválidas." }, 
        { status: 401 }
      );
    }

    const senha_correta = await bcrypt.compare(senha, usuario.senha);

    if (!senha_correta) {
      return Response.json(
        { erro: "Credenciais inválidas." }, 
        { status: 401 }
      );
    }

    // AQUI ESTÁ A CORREÇÃO: Criando o cookie que o nosso proxy usa para validar a entrada!
    const banco_cookies = await cookies();
    banco_cookies.set("sessao_stratavia", "autenticado", {
      httpOnly: true, // Protege contra scripts maliciosos (XSS)
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // Validade de 30 dias
      path: "/", // Válido em toda a plataforma
    });

    return Response.json(
      {
        sucesso: true,
        mensagem: "Login realizado com sucesso!",
        usuario: { nome: usuario.nome_completo, email: usuario.email }
      },
      { status: 200 }
    );

  } catch (erro_servidor) {
    console.error("Erro no login:", erro_servidor);
    return Response.json(
      { erro: "Erro interno no servidor." }, 
      { status: 500 }
    );
  }
}