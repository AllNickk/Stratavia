"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// --- ÍCONES SVG MINIMALISTAS ---

const IconeIdioma = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900 cursor-pointer hover:opacity-70 transition-opacity">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="9" />
    <line x1="3.6" y1="9" x2="20.4" y2="9" />
    <line x1="3.6" y1="15" x2="20.4" y2="15" />
    <path d="M11.5 3a17 17 0 0 0 0 18" />
    <path d="M12.5 3a17 17 0 0 1 0 18" />
  </svg>
);

const IconeAjuda = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900 cursor-pointer hover:opacity-70 transition-opacity">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="17" x2="12" y2="17.01" />
    <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
  </svg>
);

const IconeGoogle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
  </svg>
);

const IconeLinkedin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <line x1="8" y1="11" x2="8" y2="16" />
    <line x1="8" y1="8" x2="8" y2="8.01" />
    <line x1="12" y1="16" x2="12" y2="11" />
    <path d="M16 16v-3a2 2 0 0 0 -4 0" />
  </svg>
);

export default function pagina_cadastro() {
  const roteador = useRouter();

  // Guarda os dados preenchidos
  const [dados_formulario, set_dados_formulario] = useState({
    nome_completo: "",
    email: "",
    senha: "",
  });

  // Estados de feedback visual da tela
  const [carregando, set_carregando] = useState(false);
  const [mensagem_erro, set_mensagem_erro] = useState("");
  const [mensagem_sucesso, set_mensagem_sucesso] = useState("");

  // Atualiza o estado do formulário dinamicamente
  const lidar_mudanca_input = (evento) => {
    const { id, value } = evento.target;
    set_dados_formulario((estado_anterior) => ({
      ...estado_anterior,
      [id]: value,
    }));
  };

  // Envia os dados pra rota de API que criamos
  const submeter_formulario = async (evento) => {
    evento.preventDefault();
    
    set_carregando(true);
    set_mensagem_erro("");
    set_mensagem_sucesso("");

    try {
      const resposta = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados_formulario),
      });

      const dados_resposta = await resposta.json();

      if (!resposta.ok) {
        set_mensagem_erro(dados_resposta.erro || "Ocorreu um erro ao criar a conta.");
        set_carregando(false);
        return;
      }

      set_mensagem_sucesso("Conta criada com sucesso! Redirecionando...");
      set_dados_formulario({ nome_completo: "", email: "", senha: "" });

      setTimeout(() => {
        roteador.push("/login");
      }, 2000);

    } catch (erro_requisicao) {
      set_mensagem_erro("Erro de conexão. Verifique sua internet ou tente novamente mais tarde.");
      set_carregando(false);
    }
  };

  const url_fundo_mapa = "https://lh3.googleusercontent.com/aida-public/AB6AXuAtUsvk33WBGynup2wQ-_whGaLvACmcpMoeW4TnYLGuqtvOr3j5jlM7GTMiLymJkj2sNSt3hJ70x76DRzZV1OOg6thbnSX6MXo57Ybce5_p40f_dPsXHfhaJ8vl6K2LS597DGBvfpQe61fKzrdQTowvq2rc0gAHgwnuU1FWQQf-3B9KydwFVdZCJgLroVM9rq4Sa976iVuOwYdgdesz5bMhB6Ni25wsYzBIVdEIfwq5OsmdB_Be7yajr0aR4PKLQeG3smRBPw9WLNc";

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col">
      <header className="bg-white w-full top-0 border-b border-slate-200 z-50">
        <div className="flex justify-between items-center h-16 px-4 md:px-10 w-full max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            Stratavia
          </div>
          <div className="flex items-center gap-6">
            <IconeIdioma />
            <IconeAjuda />
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center relative overflow-hidden py-12 px-4">
        
        <div 
          className="fixed inset-0 z-0 opacity-20"
          style={{ backgroundImage: `url(${url_fundo_mapa})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
        <div className="fixed inset-0 z-1 backdrop-blur-[1px] bg-white/40"></div>
        
        <div className="w-full z-10 max-w-[520px]">
          <div className="bg-white shadow-xl shadow-slate-200 rounded-xl p-8 md:p-10 w-full border border-slate-200">
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
              <p className="text-base text-slate-600">Join Stratavia for professional geoeconomic analysis.</p>
            </div>

            {mensagem_erro && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
                {mensagem_erro}
              </div>
            )}
            {mensagem_sucesso && (
              <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm rounded">
                {mensagem_sucesso}
              </div>
            )}

            <form onSubmit={submeter_formulario} className="space-y-6">
              
              <div className="space-y-2 group">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide group-focus-within:text-emerald-500 transition-colors" htmlFor="nome_completo">
                  Full Name
                </label>
                <input 
                  id="nome_completo" 
                  type="text" 
                  value={dados_formulario.nome_completo}
                  onChange={lidar_mudanca_input}
                  placeholder="Alexander Hamilton" 
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-base disabled:bg-slate-100 disabled:text-slate-500"
                  required
                  disabled={carregando || mensagem_sucesso !== ""}
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide group-focus-within:text-emerald-500 transition-colors" htmlFor="email">
                  Corporate Email
                </label>
                <input 
                  id="email" 
                  type="email" 
                  value={dados_formulario.email}
                  onChange={lidar_mudanca_input}
                  placeholder="Hamilton@treasury.gov" 
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-base disabled:bg-slate-100 disabled:text-slate-500"
                  required
                  disabled={carregando || mensagem_sucesso !== ""}
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide group-focus-within:text-emerald-500 transition-colors" htmlFor="senha">
                  Password
                </label>
                <div className="relative">
                  <input 
                    id="senha" 
                    type="password" 
                    value={dados_formulario.senha}
                    onChange={lidar_mudanca_input}
                    placeholder="••••••••••••" 
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-base disabled:bg-slate-100 disabled:text-slate-500"
                    required
                    disabled={carregando || mensagem_sucesso !== ""}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input id="termos" type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 disabled:opacity-50" required disabled={carregando || mensagem_sucesso !== ""} />
                <label htmlFor="termos" className="text-sm text-slate-600">
                  I agree to the <a href="#" className="text-emerald-500 font-medium hover:underline underline-offset-4">Terms of Service</a> and <a href="#" className="text-emerald-500 font-medium hover:underline underline-offset-4">Privacy Policy</a>.
                </label>
              </div>

              <button 
                type="submit" 
                disabled={carregando || mensagem_sucesso !== ""}
                className="w-full py-4 bg-slate-900 text-white text-lg font-semibold rounded hover:bg-slate-800 active:scale-[0.99] transition-all disabled:bg-slate-700 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {carregando ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : mensagem_sucesso ? (
                  "Redirecting..."
                ) : (
                  "Register Account"
                )}
              </button>
            </form>

            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative px-4 bg-white text-xs font-medium text-slate-500">
                OR CONTINUE WITH
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-3 py-3 border border-slate-300 rounded hover:bg-slate-50 transition-colors text-sm font-medium text-slate-900 disabled:opacity-50" disabled={carregando}>
                <IconeGoogle />
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-3 py-3 border border-slate-300 rounded hover:bg-slate-50 transition-colors text-sm font-medium text-slate-900 disabled:opacity-50" disabled={carregando}>
                <IconeLinkedin />
                LinkedIn
              </button>
            </div>

            <p className="mt-8 text-center text-base text-slate-600">
              Already have an account? <a href="#" className="text-emerald-500 font-semibold hover:underline underline-offset-4">Login</a>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-slate-50 w-full border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4 md:px-10 py-8 w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-xl font-bold text-slate-900">Stratavia</div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              © 2026 Stratavia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}