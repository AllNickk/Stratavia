"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputFormulario from "@/components/input_formulario";
import BotaoCarregamento from "@/components/botao_carregamento";

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

  const [dados_formulario, set_dados_formulario] = useState({
    nome_completo: "",
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
  const bloqueio_tela = carregando || mensagem_sucesso !== "";

  return (
    <div className="w-full flex-grow flex items-center justify-center relative min-h-[calc(100vh-140px)] py-12 px-4">
      
      {/* Opacidade do mapa em 90 e da cobertura branca em 85 */}
      <div 
        className="absolute inset-0 z-0 opacity-90"
        style={{ backgroundImage: `url(${url_fundo_mapa})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>
      <div className="absolute inset-0 z-1 backdrop-blur-[2px] bg-white/85"></div>
      <div 
        className="absolute inset-0 z-2 opacity-[0.05] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      ></div>
      
      <div className="w-full z-10 max-w-[520px]">
        <div className="bg-white shadow-xl shadow-slate-900/10 rounded-xl p-8 md:p-10 w-full border border-slate-200 relative">
          
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
            
            <InputFormulario 
              id="nome_completo"
              rotulo="Full Name"
              placeholder="Charles Leclerc"
              valor={dados_formulario.nome_completo}
              ao_mudar={lidar_mudanca_input}
              desabilitado={bloqueio_tela}
            />

            <InputFormulario 
              id="email"
              tipo="email"
              rotulo="Corporate Email"
              placeholder="name@company.com"
              valor={dados_formulario.email}
              ao_mudar={lidar_mudanca_input}
              desabilitado={bloqueio_tela}
            />

            <InputFormulario 
              id="senha"
              tipo="password"
              rotulo="Password"
              placeholder="••••••••••••"
              valor={dados_formulario.senha}
              ao_mudar={lidar_mudanca_input}
              desabilitado={bloqueio_tela}
            />

            <div className="flex items-start gap-3">
              <input 
                id="termos" 
                type="checkbox" 
                className="mt-1 w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 disabled:opacity-50 transition-colors" 
                required 
                disabled={bloqueio_tela} 
              />
              <label htmlFor="termos" className="text-sm text-slate-600">
                I agree to the <a href="#" className="text-slate-900 font-bold hover:underline underline-offset-4">Terms of Service</a> and <a href="#" className="text-slate-900 font-bold hover:underline underline-offset-4">Privacy Policy</a>.
              </label>
            </div>

            <BotaoCarregamento 
              carregando={carregando}
              sucesso={mensagem_sucesso !== ""}
              texto_padrao="Register Account"
            />
            
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
            <button type="button" className="flex items-center justify-center gap-3 py-3 border border-slate-300 rounded hover:bg-slate-50 transition-colors text-sm font-medium text-slate-900 disabled:opacity-50" disabled={bloqueio_tela}>
              <IconeGoogle />
              Google
            </button>
            <button type="button" className="flex items-center justify-center gap-3 py-3 border border-slate-300 rounded hover:bg-slate-50 transition-colors text-sm font-medium text-slate-900 disabled:opacity-50" disabled={bloqueio_tela}>
              <IconeLinkedin />
              LinkedIn
            </button>
          </div>

          <p className="mt-8 text-center text-base text-slate-600">
            Already have an account? <a href="/login" className="text-slate-900 font-bold hover:underline underline-offset-4">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}