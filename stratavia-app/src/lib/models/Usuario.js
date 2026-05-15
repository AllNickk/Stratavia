import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  nivelExperiencia: { type: String, required: true },
  tipoPerfil: {
    type: String,
    enum: ['contribuinte', 'contador', 'empresario', 'estudante'],
    default: 'contribuinte'
  },
  paisNascimento: { type: String },
  paisResidenciaAtual: { type: String },
  cidadeAtual: { type: String },
  nacionalidades: { type: [String], default: [] },
  residenciaFiscal: {
    declaradoEmOutroPais: { type: Boolean, default: false },
    vistoOuCidadaniaExterior: { type: Boolean, default: false },
    pretendeMudarProx12Meses: {
      type: String,
      enum: ['sim', 'nao', 'talvez'],
      default: 'nao'
    }
  },
  atividadeProfissional: {
    principal: {
      type: String,
      enum: ['desenvolvedor', 'designer', 'consultor', 'empresa_servicos', 'outro'],
      default: 'outro'
    },
    tipoTrabalho: {
      type: String,
      enum: ['pessoa_fisica', 'mei', 'empresa', 'sem_formalizacao'],
      default: 'pessoa_fisica'
    },
    prestaServicoPara: {
      type: String,
      enum: ['empresas_brasileiras', 'empresas_estrangeiras', 'ambos'],
      default: 'ambos'
    },
    regimeTrabalho: {
      type: String,
      enum: ['remoto', 'hibrido', 'presencial'],
      default: 'remoto'
    }
  },
  origemRenda: {
    brasilPercent: { type: Number, min: 0, max: 100, default: 0 },
    estadosUnidosPercent: { type: Number, min: 0, max: 100, default: 0 },
    europaPercent: { type: Number, min: 0, max: 100, default: 0 },
    outrosPercent: { type: Number, min: 0, max: 100, default: 0 },
    localGeracao: {
      type: String,
      enum: ['dentro_brasil', 'fora_brasil', 'ambos'],
      default: 'ambos'
    },
    formasRecebimento: {
      type: [{ type: String, enum: ['pix', 'transferencia_internacional', 'cripto', 'outros'] }],
      default: []
    }
  },
  perfilFinanceiro: {
    rendaMensalBRL: { type: Number, min: 0, default: 0 },
    rendaAnualEstimado: { type: Number, min: 0, default: 0 },
    reinveste: { type: Boolean, default: false }
  },
  mobilidadeInternacional: {
    dispostoMudarPais: {
      type: String,
      enum: ['sim', 'nao', 'talvez'],
      default: 'nao'
    },
    paisesInteresse: { type: [String], default: [] },
    tempoForaBrasil: {
      type: String,
      enum: ['0 meses', '3 meses', '6 meses', '12 meses ou mais'],
      default: '0 meses'
    }
  },
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);