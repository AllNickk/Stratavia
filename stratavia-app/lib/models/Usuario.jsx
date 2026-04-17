const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  nivelExperiencia: {
    type: String,
    required: true
  },
  tipoPerfil: {
    type: String,
    enum: ['contribuinte', 'contador', 'empresario', 'estudante'],
    default: 'contribuinte'
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);