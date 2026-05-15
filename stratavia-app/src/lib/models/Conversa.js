const mongoose = require('mongoose');

const MensagemSchema = new mongoose.Schema({
  papel: {
    type: String,
    enum: ['user', 'model'],
    required: true
  },
  conteudo: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ConversaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  titulo: {
    type: String,
    default: 'Nova conversa'
  },
  mensagens: [MensagemSchema],
  criadoEm: {
    type: Date,
    default: Date.now
  },
  atualizadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Conversa || mongoose.model('Conversa', ConversaSchema);