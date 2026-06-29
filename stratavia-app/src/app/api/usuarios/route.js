import bcrypt from "bcryptjs";
import conexao_promessa from "@/lib/mongodb";

export async function POST(requisicao) {
  try {
    // Lendo os dados que vão vir da nossa tela de cadastro lá no frontend
    const corpo_requisicao = await requisicao.json();
    const { nome_completo, email, senha } = corpo_requisicao;

    // Uma validação básica pra garantir que o usuário não mandou campo vazio
    if (!nome_completo || !email || !senha) {
      return Response.json(
        { erro: "Todos os campos são obrigatórios." }, 
        { status: 400 }
      );
    }

    // Puxando a conexão do banco que já deixamos pronta
    const cliente_banco = await conexao_promessa;
    const banco_dados = cliente_banco.db("stratavia");
    const colecao_usuarios = banco_dados.collection("usuarios");

    // Aqui eu usei o findOne pra checar se já existe alguém com esse email.
    // Talvez fosse legal criar um "índice único" direto no MongoDB depois pra garantir,
    // mas fazer essa validação aqui no código já resolve bem o problema por agora.
    const usuario_existente = await colecao_usuarios.findOne({ email });

    if (usuario_existente) {
      return Response.json(
        { erro: "Esse email já está cadastrado." }, 
        { status: 409 }
      );
    }

    // Embaralhando a senha (o número 10 é o 'salt', um padrão da biblioteca que gera uma complexidade boa)
    const senha_criptografada = await bcrypt.hash(senha, 10);

    // Montando o objeto bonitinho que vai ser salvo no banco
    const novo_usuario = {
      nome_completo,
      email,
      senha: senha_criptografada,
      data_criacao: new Date()
    };

    // Inserindo na coleção. O Mongo já cria a coleção automaticamente na primeira inserção.
    const resultado_insercao = await colecao_usuarios.insertOne(novo_usuario);

    return Response.json(
      {
        sucesso: true,
        mensagem: "Usuário criado com sucesso!",
        id_usuario: resultado_insercao.insertedId
      },
      { status: 201 }
    );

  } catch (erro_servidor) {
    // Se der algum erro maluco, printa no terminal pra gente saber onde investigar
    console.error("Erro na rota de cadastro:", erro_servidor);
    return Response.json(
      { erro: "Erro interno no servidor." }, 
      { status: 500 }
    );
  }
}