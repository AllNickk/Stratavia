"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputFormulario from "@/components/input_formulario";
import BotaoCarregamento from "@/components/botao_carregamento";

const IconeGlobo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="9" />
    <line x1="3.6" y1="9" x2="20.4" y2="9" />
    <line x1="3.6" y1="15" x2="20.4" y2="15" />
    <path d="M11.5 3a17 17 0 0 0 0 18" />
    <path d="M12.5 3a17 17 0 0 1 0 18" />
  </svg>
);

const IconeEmail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
);

const IconeCadeado = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
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

export default function pagina_login() {
  const roteador = useRouter();

  const [dados_formulario, set_dados_formulario] = useState({
    email: "",
    senha: "",
  });

  const [carregando, set_carregando] = useState(false);
  const [mensagem_erro, set_mensagem_erro] = useState("");
  const [mensagem_sucesso, set_mensagem_sucesso] = useState("");

  const lidar_mudanca_input = (evento) => {
    const { id, value } = evento.target;
    set_dados_formulario((estado_anterior) => ({
      ...estado_anterior,
      [id]: value,
    }));
  };

  const submeter_formulario = async (evento) => {
    evento.preventDefault();
    
    set_carregando(true);
    set_mensagem_erro("");
    set_mensagem_sucesso("");

    try {
      const resposta = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados_formulario),
      });

      const dados_resposta = await resposta.json();

      if (!resposta.ok) {
        set_mensagem_erro(dados_resposta.erro || "Falha ao realizar login.");
        set_carregando(false);
        return;
      }

      set_mensagem_sucesso("Acesso autorizado!");
      
      setTimeout(() => {
        roteador.push("/"); 
      }, 2000);

    } catch (erro_requisicao) {
      set_mensagem_erro("Erro de conexão com o servidor.");
      set_carregando(false);
    }
  };

  const url_fundo_mapa = "https://lh3.googleusercontent.com/aida-public/AB6AXuAtUsvk33WBGynup2wQ-_whGaLvACmcpMoeW4TnYLGuqtvOr3j5jlM7GTMiLymJkj2sNSt3hJ70x76DRzZV1OOg6thbnSX6MXo57Ybce5_p40f_dPsXHfhaJ8vl6K2LS597DGBvfpQe61fKzrdQTowvq2rc0gAHgwnuU1FWQQf-3B9KydwFVdZCJgLroVM9rq4Sa976iVuOwYdgdesz5bMhB6Ni25wsYzBIVdEIfwq5OsmdB_Be7yajr0aR4PKLQeG3smRBPw9WLNc";
  const bloqueio_tela = carregando || mensagem_sucesso !== "";

  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center relative min-h-[calc(100vh-140px)] py-12 px-4">
      
      <div 
        className="absolute inset-0 z-0 opacity-90"
        style={{ backgroundImage: `url(${url_fundo_mapa})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      <div className="absolute inset-0 z-1 backdrop-blur-[2px] bg-white/85"></div>
      <div 
        className="absolute inset-0 z-2 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      ></div>
      
      <main className="relative z-10 w-full max-w-[520px] flex flex-col items-center">
        
        <div className="flex flex-col items-center mb-10 gap-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded shadow-lg flex items-center justify-center text-white">
              <IconeGlobo />
            </div>
            <h1 className="text-[42px] leading-none text-slate-900 tracking-tight font-bold">Stratavia</h1>
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500 font-bold mt-1">Global Intelligence Framework</p>
        </div>

        <div className="bg-white shadow-xl shadow-slate-900/10 rounded-xl p-8 md:p-10 w-full border border-slate-200">
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h2>
            <p className="text-base text-slate-600">Access your secure tax intelligence support.</p>
          </div>

          {mensagem_erro && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {mensagem_erro}
            </div>
          )}
          {/* Mantive o alerta de sucesso verde porque é o padrão universal de UI para "ok" */}
          {mensagem_sucesso && (
            <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm rounded">
              {mensagem_sucesso}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 rounded hover:bg-slate-50 transition-all font-semibold text-slate-900 text-sm disabled:opacity-50" disabled={bloqueio_tela}>
              <IconeGoogle />
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-300 rounded hover:bg-slate-50 transition-all font-semibold text-slate-900 text-sm disabled:opacity-50" disabled={bloqueio_tela}>
              <IconeLinkedin />
              LinkedIn
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-full border-t border-slate-200"></div>
            <span className="absolute bg-white px-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Or continue with email</span>
          </div>

          <form onSubmit={submeter_formulario} className="space-y-6">
            
            <InputFormulario 
              id="email"
              tipo="email"
              rotulo="Corporate Email"
              placeholder="name@company.com"
              valor={dados_formulario.email}
              ao_mudar={lidar_mudanca_input}
              desabilitado={bloqueio_tela}
              icone_svg={<IconeEmail />}
            />

            <InputFormulario 
              id="senha"
              tipo="password"
              rotulo="Password"
              placeholder="••••••••••••"
              valor={dados_formulario.senha}
              ao_mudar={lidar_mudanca_input}
              desabilitado={bloqueio_tela}
              icone_svg={<IconeCadeado />}
              link_lateral={
                <a href="#" className="text-xs text-slate-900 hover:text-slate-700 font-bold transition-colors">
                  Forgot password?
                </a>
              }
            />

            <div className="flex items-center">
              <input 
                id="lembrar" 
                type="checkbox" 
                className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900 cursor-pointer disabled:opacity-50" 
                disabled={bloqueio_tela}
              />
              <label htmlFor="lembrar" className="ml-3 text-sm text-slate-600 cursor-pointer select-none">
                Remember this device for 30 days
              </label>
            </div>

            <BotaoCarregamento 
              carregando={carregando}
              sucesso={mensagem_sucesso !== ""}
              texto_padrao="Sign In"
              texto_sucesso="Autenticado!"
            />
            
          </form>

          <p className="mt-8 text-center text-base text-slate-600">
            Don't have an account? <a href="/register" className="text-slate-900 font-bold hover:underline underline-offset-4">Create an account</a>
          </p>
        </div>
      </main>
    </div>
  );
}