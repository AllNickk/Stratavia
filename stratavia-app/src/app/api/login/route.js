import bcrypt from "bcryptjs";
import conexao_promessa from "@/lib/mongodb";

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

    // Procura o cara no banco
    const usuario = await colecao_usuarios.findOne({ email });

    // Se o email não existir, damos erro genérico por segurança (pra não dar dica pra hacker)
    if (!usuario) {
      return Response.json(
        { erro: "Credenciais inválidas." }, 
        { status: 401 }
      );
    }

    // A mágica acontece aqui: o bcrypt testa se a senha crua bate com a hash gigante do banco
    const senha_correta = await bcrypt.compare(senha, usuario.senha);

    if (!senha_correta) {
      return Response.json(
        { erro: "Credenciais inválidas." }, 
        { status: 401 }
      );
    }

    // Por enquanto, só devolvemos sucesso. No futuro a gente pode injetar um Token (JWT) aqui
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