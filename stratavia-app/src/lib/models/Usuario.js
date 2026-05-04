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
  paisResidencia: {type: String, required: false},
  paisNascimento: {type: String, required: false},
  paisRenda: {type: String, required: false},
  faturamentoMensal: {type: Double, required: false},
  nomeEmpresa: {type: String, required: false},
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);