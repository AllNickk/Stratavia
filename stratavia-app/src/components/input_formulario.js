export default function InputFormulario({ 
  id, 
  tipo = "text", 
  rotulo, 
  valor, 
  ao_mudar, 
  placeholder, 
  desabilitado,
  icone_svg,       // Novo: pra receber o desenho do ícone (email/cadeado)
  link_lateral     // Novo: pra receber o "Esqueci a senha"
}) {
  const campo_preenchido = valor && valor.length > 0;

  return (
    <div className="space-y-2 group">
      
      {/* Cabeçalho do input com o rótulo e o possível link */}
      <div className="flex justify-between items-center">
        <label 
          className={`text-xs font-bold uppercase tracking-wide transition-colors ${
            campo_preenchido ? "text-slate-900" : "text-slate-600"
          }`} 
          htmlFor={id}
        >
          {rotulo}
        </label>
        {link_lateral && link_lateral}
      </div>

      <div className="relative rounded">
        {/* Se a gente mandar um ícone, ele aparece absolutado à esquerda */}
        {icone_svg && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icone_svg}
          </div>
        )}
        
        <input 
          id={id} 
          type={tipo} 
          value={valor}
          onChange={ao_mudar}
          placeholder={placeholder} 
          // O pl-12 dá o espaço pro ícone não encavalar no texto
          className={`w-full ${icone_svg ? 'pl-11' : 'px-4'} pr-4 py-3 bg-white border rounded focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-base disabled:bg-slate-100 disabled:text-slate-500 placeholder:text-slate-400 ${
            campo_preenchido 
              ? "text-slate-900 border-slate-400 font-medium" 
              : "text-slate-700 border-slate-300"
          }`}
          required
          disabled={desabilitado}
        />
      </div>
    </div>
  );
}