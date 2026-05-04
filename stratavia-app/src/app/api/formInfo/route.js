import dbConnect from '@/lib/mongodb';
import Usuario from '@/lib/models/Usuario';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    const { userId, ...formData } = data;

    // Validação básica
    if (!userId) {
      return NextResponse.json({ error: 'ID do usuário é obrigatório' }, { status: 400 });
    }

    // Conectar ao banco
    await dbConnect();

    // Atualizar o usuário com os dados do formulário
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      userId,
      {
        // Identificação básica
        paisNascimento: formData.paisNascimento,
        paisResidenciaAtual: formData.paisResidenciaAtual,
        cidadeAtual: formData.cidadeAtual,
        nacionalidades: formData.nacionalidades,

        // Residência fiscal
        residenciaFiscal: {
          declaradoEmOutroPais: formData.residenciaFiscal?.declaradoEmOutroPais,
          vistoOuCidadaniaExterior: formData.residenciaFiscal?.vistoOuCidadaniaExterior,
          pretendeMudarProx12Meses: formData.residenciaFiscal?.pretendeMudarProx12Meses
        },

        // Atividade profissional
        atividadeProfissional: {
          principal: formData.atividadeProfissional?.principal,
          tipoTrabalho: formData.atividadeProfissional?.tipoTrabalho,
          prestaServicoPara: formData.atividadeProfissional?.prestaServicoPara,
          regimeTrabalho: formData.atividadeProfissional?.regimeTrabalho
        },

        // Origem da renda
        origemRenda: {
          brasilPercent: formData.origemRenda?.brasilPercent,
          estadosUnidosPercent: formData.origemRenda?.estadosUnidosPercent,
          europaPercent: formData.origemRenda?.europaPercent,
          outrosPercent: formData.origemRenda?.outrosPercent,
          localGeracao: formData.origemRenda?.localGeracao,
          formasRecebimento: formData.origemRenda?.formasRecebimento
        },

        // Perfil financeiro
        perfilFinanceiro: {
          rendaMensalBRL: formData.perfilFinanceiro?.rendaMensalBRL,
          rendaAnualEstimado: formData.perfilFinanceiro?.rendaAnualEstimado,
          reinveste: formData.perfilFinanceiro?.reinveste
        },

        // Mobilidade internacional
        mobilidadeInternacional: {
          dispostoMudarPais: formData.mobilidadeInternacional?.dispostoMudarPais,
          paisesInteresse: formData.mobilidadeInternacional?.paisesInteresse,
          tempoForaBrasil: formData.mobilidadeInternacional?.tempoForaBrasil
        }
      },
      { new: true, runValidators: true }
    );

    if (!usuarioAtualizado) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Informações salvas com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar informações do formulário:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
