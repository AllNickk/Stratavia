import mongoose from 'mongoose';

const ConversaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  titulo: String,
  criadaEm: { type: Date, default: Date.now },
  atualizadaEm: { type: Date, default: Date.now }
});

export default mongoose.models.Conversa || mongoose.model('Conversa', ConversaSchema)