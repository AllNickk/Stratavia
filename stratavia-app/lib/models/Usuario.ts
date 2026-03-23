import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: {type : String},
  perfil: { type: String, enum: ['contribuinte', 'contador', 'empresario', 'estudante'], default: 'contribuinte' },
  jurisdicoesPreferidas: [String], // ex: ['SP', 'RJ', 'Brasil']
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);