import dbConnect from '@/lib/mongodb';
import Usuario from '@/lib/models/Usuario';
import { validateEmail, validatePassword, validateName } from '@/lib/validacoes';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; 

export async function POST(req) {
  try {
    const { name, email, password, profileType, experienceLevel } = await req.json();

    // Validações
    const nameValid = validateName(name);
    if (!nameValid.valid) {
      return NextResponse.json({ error: nameValid.message }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const passValid = validatePassword(password);
    if (!passValid.valid) {
      return NextResponse.json({ error: passValid.message }, { status: 400 });
    }

    // Conexão com o banco de dados
    await dbConnect();

    // Verificar se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return NextResponse.json({ error: 'Este email já está cadastrado' }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const novoUsuario = await Usuario.create({
      nome: name,
      email: email,
      senha: hashedPassword,
      tipoPerfil: profileType,
      nivelExperiencia: experienceLevel
    });

    return NextResponse.json(
      { message: 'Conta criada com sucesso!', userId: novoUsuario._id },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}