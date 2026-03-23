import mongoose from 'mongoose';

const MensagemSchema = new mongoose.Schema({
  conversaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversa' },
  papel: { type: String, enum: ['usuario', 'assistente'] },
  conteudo: String,
  fontes: [String], // referências da busca do Google
  criadaEm: { type: Date, default: Date.now }
});

export default mongoose.models.Mensagem || mongoose.model('Mensagem', MensagemSchema);