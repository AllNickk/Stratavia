import dbConnect from '@/lib/mongodb';
import Usuario from '@/lib/models/Usuario';
import { NextResponse } from 'next/server';

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return Boolean(value);
  const normalized = value.trim().toLowerCase();
  return ['true', 'sim', 'yes', '1'].includes(normalized);
};

const parseNumber = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string' || value.trim() === '') return undefined;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
};

const parseArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  return value.split(',').map((item) => item.trim()).filter(Boolean);
};

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
        nacionalidades: parseArray(formData.nacionalidades),

        // Residência fiscal
        residenciaFiscal: {
          declaradoEmOutroPais: parseBoolean(formData.residenciaFiscal?.declaradoEmOutroPais),
          vistoOuCidadaniaExterior: parseBoolean(formData.residenciaFiscal?.vistoOuCidadaniaExterior),
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
          brasilPercent: parseNumber(formData.origemRenda?.brasilPercent),
          estadosUnidosPercent: parseNumber(formData.origemRenda?.estadosUnidosPercent),
          europaPercent: parseNumber(formData.origemRenda?.europaPercent),
          outrosPercent: parseNumber(formData.origemRenda?.outrosPercent),
          localGeracao: formData.origemRenda?.localGeracao,
          formasRecebimento: parseArray(formData.origemRenda?.formasRecebimento)
        },

        // Perfil financeiro
        perfilFinanceiro: {
          rendaMensalBRL: parseNumber(formData.perfilFinanceiro?.rendaMensalBRL),
          rendaAnualEstimado: parseNumber(formData.perfilFinanceiro?.rendaAnualEstimado),
          reinveste: parseBoolean(formData.perfilFinanceiro?.reinveste)
        },

        // Mobilidade internacional
        mobilidadeInternacional: {
          dispostoMudarPais: formData.mobilidadeInternacional?.dispostoMudarPais,
          paisesInteresse: parseArray(formData.mobilidadeInternacional?.paisesInteresse),
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
