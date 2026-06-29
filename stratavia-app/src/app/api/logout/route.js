import { cookies } from "next/headers";

export async function POST() {
  try {
    const banco_cookies = await cookies();
    
    // O Next.js tem uma função pronta maravilhosa pra deletar o cookie na hora
    banco_cookies.delete("sessao_stratavia");

    return Response.json(
      { sucesso: true, mensagem: "Desconectado com sucesso." }, 
      { status: 200 }
    );
  } catch (erro_servidor) {
    console.error("Erro ao desconectar:", erro_servidor);
    return Response.json(
      { erro: "Erro interno ao tentar desconectar." }, 
      { status: 500 }
    );
  }
}