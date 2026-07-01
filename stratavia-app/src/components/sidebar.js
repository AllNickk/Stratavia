"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const IconeMais = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
const IconeDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>;
const IconeBussola = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="8 16 10 10 16 8 14 14 8 16" /><circle cx="12" cy="12" r="9" /></svg>;
const IconeConfig = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><circle cx="12" cy="12" r="3" /></svg>;
const IconeSair = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>;
const IconeGlobo = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9" /><line x1="3.6" y1="9" x2="20.4" y2="9" /><line x1="3.6" y1="15" x2="20.4" y2="15" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>;
const IconeMenuFechar = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v16" /><path d="M15 10l-2 2l2 2" /></svg>;
const IconeMenuAbrir = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v16" /><path d="M14 10l2 2l-2 2" /></svg>;
const IconePino = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4" /><line x1="9" y1="15" x2="4.5" y2="19.5" /><line x1="14.5" y1="4" x2="20" y2="9.5" /></svg>;
const IconeLixeira = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="4" y1="7" x2="20" y2="7" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>;
const IconeMaisOpcoes = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /><circle cx="12" cy="5" r="1" /></svg>;

export default function Sidebar({ 
  ao_clicar_nova_analise, 
  historico_chats = [], 
  chat_ativo_id, 
  ao_selecionar_chat,
  recarregar_historico,
  nome_usuario 
}) {
  const roteador = useRouter();
  const pathname = usePathname();

  const [sidebar_aberta, set_sidebar_aberta] = useState(true);
  const [menu_perfil_aberto, set_menu_perfil_aberto] = useState(false);
  const [id_menu_opcoes_aberto, set_id_menu_opcoes_aberto] = useState(null);
  
  const perfilRef = useRef(null);

  useEffect(() => {
    const lidar_clique_fora = (evento) => {
      if (perfilRef.current && !perfilRef.current.contains(evento.target)) {
        set_menu_perfil_aberto(false);
      }
      if (!evento.target.closest('.menu-chat-container')) {
        set_id_menu_opcoes_aberto(null);
      }
    };
    document.addEventListener("mousedown", lidar_clique_fora);
    return () => document.removeEventListener("mousedown", lidar_clique_fora);
  }, []);

  const fazer_logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      roteador.push("/login");
    } catch (erro) {}
  };

  const clicar_novo = () => {
    if (ao_clicar_nova_analise) ao_clicar_nova_analise();
    else roteador.push("/chat");
  };

  const apagar_chat = async (id, evento) => {
    evento.stopPropagation();
    try {
      await fetch(`/api/chats/${id}`, { method: "DELETE" });
      set_id_menu_opcoes_aberto(null);
      if (chat_ativo_id === id && ao_clicar_nova_analise) ao_clicar_nova_analise(); 
      if (recarregar_historico) recarregar_historico();
    } catch (erro) { console.error("Erro ao apagar", erro); }
  };

  const alternar_fixacao_chat = async (chat, evento) => {
    evento.stopPropagation();
    const qtd_fixados = historico_chats.filter(c => c.fixado).length;
    if (!chat.fixado && qtd_fixados >= 3) {
      alert("Você já atingiu o limite de 3 análises fixadas.");
      set_id_menu_opcoes_aberto(null);
      return;
    }
    try {
      await fetch(`/api/chats/${chat._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fixado: !chat.fixado })
      });
      set_id_menu_opcoes_aberto(null);
      if (recarregar_historico) recarregar_historico();
    } catch (erro) { console.error("Erro ao fixar", erro); }
  };

  const obter_classes_link = (caminho) => {
    const ativo = pathname === caminho;
    const base = "relative flex items-center transition-colors rounded-md font-medium text-sm group";
    const cores = ativo ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900";
    const espacamento = sidebar_aberta ? "px-4 py-2 gap-3" : "px-0 py-2 justify-center mx-2";
    return `${base} ${cores} ${espacamento}`;
  };

  return (
    <aside className={`relative hidden md:flex flex-col h-full border-r border-slate-200 bg-white flex-shrink-0 transition-all duration-300 ease-in-out z-30 ${sidebar_aberta ? 'w-[280px]' : 'w-[76px]'}`}>
      <div className="h-16 flex items-center justify-center mt-2 mb-4 px-4">
        {sidebar_aberta ? (
          <div className="flex justify-between items-center w-full animate-fade-in">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Stratavia</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Global Nomad</p>
            </div>
            <button onClick={() => set_sidebar_aberta(false)} className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
              <IconeMenuFechar />
            </button>
          </div>
        ) : (
          <button onClick={() => set_sidebar_aberta(true)} className="w-10 h-10 relative flex items-center justify-center rounded-lg group hover:bg-slate-100 transition-colors">
            <div className="block group-hover:hidden text-slate-900"><IconeGlobo /></div>
            <div className="hidden group-hover:block text-slate-700"><IconeMenuAbrir /></div>
            <div className="absolute left-14 hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">Expandir menu</div>
          </button>
        )}
      </div>
      
      <div className="px-4 mb-6 flex justify-center">
        {sidebar_aberta ? (
          <button onClick={clicar_novo} className="w-full flex items-center justify-center gap-2 bg-[#0f172a] text-white py-3 rounded-md font-semibold transition-all hover:bg-slate-800 active:scale-[0.98] text-sm shadow-sm">
            <IconeMais /> Nova Análise
          </button>
        ) : (
          <button onClick={clicar_novo} className="w-10 h-10 bg-[#0f172a] text-white rounded-md flex items-center justify-center hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm group relative">
            <IconeMais />
            <div className="absolute left-14 hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">Nova Análise</div>
          </button>
        )}
      </div>
      
      <nav className={`flex-1 px-2 space-y-1 ${sidebar_aberta ? 'overflow-y-auto' : 'overflow-visible'}`}>
        {sidebar_aberta && (
          <div className="px-4 py-2 mb-1 mt-2">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Módulos</h3>
          </div>
        )}
        
        <a href="/dashboard" className={obter_classes_link("/dashboard")}>
          <IconeDashboard /> 
          {sidebar_aberta && <span>Dashboard</span>}
          {!sidebar_aberta && <div className="absolute left-[60px] hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">Dashboard</div>}
        </a>
        <a href="/exploration" className={obter_classes_link("/exploration")}>
          <IconeBussola /> 
          {sidebar_aberta && <span>Exploration</span>}
          {!sidebar_aberta && <div className="absolute left-[60px] hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">Exploration</div>}
        </a>
        <a href="/settings" className={obter_classes_link("/settings")}>
          <IconeConfig /> 
          {sidebar_aberta && <span>Settings</span>}
          {!sidebar_aberta && <div className="absolute left-[60px] hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">Settings</div>}
        </a>

        {sidebar_aberta && (
          <>
            <div className="px-4 py-2 mt-6 mb-1">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Histórico Recente</h3>
            </div>
            <div className="space-y-1 pb-4">
              {historico_chats.map((chat) => (
                <div key={chat._id} className="relative menu-chat-container group">
                  <a 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (ao_selecionar_chat) ao_selecionar_chat(chat._id); 
                      else roteador.push('/chat'); 
                    }}
                    className={`flex items-center justify-between px-4 py-2 text-sm rounded-md transition-colors pr-10 ${
                      chat_ativo_id === chat._id 
                        ? "bg-slate-100 text-slate-900 font-semibold" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="truncate flex items-center gap-2">
                      {chat.fixado && <span className="text-emerald-600 flex-shrink-0"><IconePino /></span>}
                      <span className="truncate">{chat.titulo}</span>
                    </div>
                  </a>
                  
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      set_id_menu_opcoes_aberto(id_menu_opcoes_aberto === chat._id ? null : chat._id);
                    }}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded transition-all ${
                      id_menu_opcoes_aberto === chat._id ? "opacity-100 bg-slate-200 text-slate-700" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <IconeMaisOpcoes />
                  </button>

                  {id_menu_opcoes_aberto === chat._id && (
                    <div className="absolute right-2 top-8 w-36 bg-white border border-slate-200 shadow-lg rounded-md overflow-hidden z-50 py-1">
                      <button onClick={(e) => alternar_fixacao_chat(chat, e)} className="w-full text-left px-3 py-2 text-[13px] text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                        <IconePino /> {chat.fixado ? 'Desfixar' : 'Fixar no topo'}
                      </button>
                      <button onClick={(e) => apagar_chat(chat._id, e)} className="w-full text-left px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                        <IconeLixeira /> Excluir
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </nav>

      <div ref={perfilRef} className="mt-auto relative p-4 border-t border-slate-200">
        {menu_perfil_aberto && (
          <div className="absolute bottom-[110%] left-4 mb-2 w-48 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-50 animate-fade-in">
            {/* AQUI FOI O AJUSTE: O botão fecha o menu e manda pra tela de configurações */}
            <button onClick={() => { set_menu_perfil_aberto(false); roteador.push('/settings'); }} className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
              <IconeConfig /> Configurações
            </button>
            <div className="h-px bg-slate-200 w-full"></div>
            <button onClick={fazer_logout} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium">
              <IconeSair /> Desconectar
            </button>
          </div>
        )}

        <button onClick={() => set_menu_perfil_aberto(!menu_perfil_aberto)} className={`w-full flex items-center rounded-lg hover:bg-slate-50 transition-colors group relative ${sidebar_aberta ? 'p-2 gap-3' : 'justify-center p-1'}`}>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl5V7MKMp2WXyFFkfjq3UgQtOaal7ViTB2EJsUwkQjYbcRiCsc8bcsTEMMi4UX0TIte0FJCu_8Un5mYHi5mFxmbMUoxuHzLW9jikAzkmyuxz7ImF_MqshXKtVvW1ybD7nwNKUF4J03f5okXKTwYV_dahVMt3xt2RbvWgMiPs9k-nbNmNu8xhrw-5DES6-Wj4QpVI_cFKRXmPYl5qOxnUEUDE0e4sbIdnC9lQdpG02wdb-WdNaccP4Q2h2Gt7KMomlDMN_nDNQmmo8" alt="Perfil" className="w-9 h-9 rounded-full object-cover border border-slate-300 flex-shrink-0" />
          {sidebar_aberta && (
            <div className="text-left flex-1 truncate">
              <p className="font-bold text-sm text-slate-900 truncate">{nome_usuario}</p>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider">PRO MEMBER</p>
            </div>
          )}
          {!sidebar_aberta && (
             <div className="absolute left-14 hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">Perfil e Conta</div>
          )}
        </button>
      </div>
    </aside>
  );
}