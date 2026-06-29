export default function BotaoCarregamento({ 
  carregando, 
  sucesso, 
  texto_padrao, 
  texto_sucesso = "Redirecting..." 
}) {
  // A lógica aqui é simples: se estiver carregando ou se já deu sucesso, a gente trava o botão
  const desabilitado = carregando || sucesso;

  return (
    <button 
      type="submit" 
      disabled={desabilitado}
      className="w-full py-4 bg-slate-900 text-white text-lg font-semibold rounded hover:bg-slate-800 active:scale-[0.99] transition-all disabled:bg-slate-700 disabled:cursor-not-allowed flex justify-center items-center gap-2"
    >
      {carregando ? (
        <>
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          Processing...
        </>
      ) : sucesso ? (
        texto_sucesso
      ) : (
        texto_padrao
      )}
    </button>
  );
}