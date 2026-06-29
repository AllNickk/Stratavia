// src/components/input_formulario.js

export default function InputFormulario({ 
  id, 
  tipo = "text", 
  rotulo, 
  valor, 
  ao_mudar, 
  placeholder, 
  desabilitado 
}) {
  // Lógica simples: se tem algo digitado, a variável fica true
  const campo_preenchido = valor && valor.length > 0;

  return (
    <div className="space-y-2 group">
      <label 
        className={`text-xs font-bold uppercase tracking-wide transition-colors ${
          campo_preenchido ? "text-slate-900" : "text-slate-600"
        }`} 
        htmlFor={id}
      >
        {rotulo}
      </label>
      <input 
        id={id} 
        type={tipo} 
        value={valor}
        onChange={ao_mudar}
        placeholder={placeholder} 
        // Quando foca no campo, a borda também fica da cor do botão (slate-900)
        className={`w-full px-4 py-3 bg-white border rounded focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all outline-none text-base disabled:bg-slate-100 disabled:text-slate-500 placeholder:text-slate-400 ${
          campo_preenchido 
            ? "text-slate-900 border-slate-400 font-medium" 
            : "text-slate-700 border-slate-300"
        }`}
        required
        disabled={desabilitado}
      />
    </div>
  );
}