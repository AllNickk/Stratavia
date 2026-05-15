import dbConnect from '@/lib/mongodb';
import Usuario from '@/lib/models/Usuario';
import { validateEmail } from '@/lib/validacoes';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.senha);
    if (!senhaCorreta) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Preparar dados do usuário para o frontend
    const userPayload = {
      id: usuario._id,
      nome: usuario.nome,
      email: usuario.email,
      tipoPerfil: usuario.tipoPerfil,
      nivelExperiencia: usuario.nivelExperiencia
    };

    const response = NextResponse.json(
      { 
        message: 'Login realizado com sucesso!',
        user: userPayload 
      },
      { status: 200 }
    );

    // Cookie de autenticação
    const token = "asdhuiy23892ye1u9e21u9021ue12jeopkwqujqweioeqwuhio"; // SUBSTITUIR POR UM JWT REAL

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}