export default function BotaoCarregamento({ 
  carregando, 
  sucesso, 
  texto_padrao, 
  texto_sucesso = "Redirecting...",
  icone_direito // Novo
}) {
  const desabilitado = carregando || sucesso;

  return (
    <button 
      type="submit" 
      disabled={desabilitado}
      className="w-full py-4 bg-slate-900 text-white text-lg font-semibold rounded hover:bg-slate-800 active:scale-[0.99] transition-all disabled:bg-slate-700 disabled:cursor-not-allowed flex justify-center items-center gap-3 shadow-md hover:shadow-lg"
    >
      {carregando ? (
        <>
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          Processing...
        </>
      ) : sucesso ? (
        texto_sucesso
      ) : (
        <>
          {texto_padrao}
          {/* Mostra a setinha verde só se ela for enviada pela tela e o botão não estiver carregando */}
          {icone_direito && <span className="text-emerald-500">{icone_direito}</span>}
        </>
      )}
    </button>
  );
}