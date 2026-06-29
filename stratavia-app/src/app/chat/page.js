"use client";

import { useState, useRef, useEffect } from "react";

// --- ÍCONES SVG ---
const IconeMais = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
const IconeDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>;
const IconeBussola = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="8 16 10 10 16 8 14 14 8 16" /><circle cx="12" cy="12" r="9" /></svg>;
const IconeConfig = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><circle cx="12" cy="12" r="3" /></svg>;
const IconeSair = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>;
const IconeGlobo = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9" /><line x1="3.6" y1="9" x2="20.4" y2="9" /><line x1="3.6" y1="15" x2="20.4" y2="15" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>;
const IconeMenuFechar = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v16" /><path d="M15 10l-2 2l2 2" /></svg>;
const IconeMenuAbrir = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 4v16" /><path d="M14 10l2 2l-2 2" /></svg>;
const IconeAnexo = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" /></svg>;
const IconeMic = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="9" y="2" width="6" height="11" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>;
const IconeSetaCima = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="18" y1="11" x2="12" y2="5" /><line x1="6" y1="11" x2="12" y2="5" /></svg>;
const IconeOlho = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="2" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg>;

export default function pagina_chat() {
  // Lógica visual da sidebar
  const [sidebar_aberta, set_sidebar_aberta] = useState(true);
  const [menu_perfil_aberto, set_menu_perfil_aberto] = useState(false);

  // Lógica do chat
  const [historico_chats, set_historico_chats] = useState([
    { id: 1, titulo: "UAE Golden Visa vs Portugal" },
    { id: 2, titulo: "Singapore Tax Structure 2024" },
    { id: 3, titulo: "Remote Work Hubs in EU" }
  ]);
  const [mensagens_atuais, set_mensagens_atuais] = useState([]);
  const [texto_digitado, set_texto_digitado] = useState("");
  const [ia_pensando, set_ia_pensando] = useState(false);
  const final_do_chat_ref = useRef(null);

  useEffect(() => {
    if (final_do_chat_ref.current) {
      final_do_chat_ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensagens_atuais, ia_pensando]);

  // Função para fechar o menu de perfil se clicar fora (simplificada)
  const fechar_menus_flutuantes = () => {
    if (menu_perfil_aberto) set_menu_perfil_aberto(false);
  };

  const iniciar_novo_chat = () => {
    if (mensagens_atuais.length > 0) {
      const primeiro_texto = mensagens_atuais[0].texto.substring(0, 25) + "...";
      set_historico_chats([{ id: Date.now(), titulo: primeiro_texto }, ...historico_chats]);
    }
    set_mensagens_atuais([]);
    set_texto_digitado("");
  };

  const enviar_mensagem = (evento) => {
    evento.preventDefault(); 
    if (!texto_digitado.trim()) return;

    const nova_mensagem = { id: Date.now(), autor: "usuario", texto: texto_digitado };
    set_mensagens_atuais((anteriores) => [...anteriores, nova_mensagem]);
    set_texto_digitado("");
    set_ia_pensando(true);

    setTimeout(() => {
      const resposta_ia = {
        id: Date.now() + 1,
        autor: "ia",
        texto: "Esta é uma análise simulada. Em breve o processamento via Gemini será conectado aqui."
      };
      set_mensagens_atuais((anteriores) => [...anteriores, resposta_ia]);
      set_ia_pensando(false);
    }, 1500);
  };

  const ajustar_altura_textarea = (evento) => {
    const elemento = evento.target;
    elemento.style.height = 'auto';
    elemento.style.height = `${elemento.scrollHeight}px`;
    set_texto_digitado(elemento.value);
  };

  const apertou_enter = (evento) => {
    if (evento.key === 'Enter' && !evento.shiftKey) {
      evento.preventDefault();
      enviar_mensagem(evento);
    }
  };

  const tela_inicial = mensagens_atuais.length === 0;

  return (
    <div className="fixed inset-0 z-[100] flex bg-white font-sans text-slate-900 overflow-hidden" onClick={fechar_menus_flutuantes}>
      
      {/* --- BARRA LATERAL (SIDEBAR COLAPSÁVEL) --- */}
      {/* A transição altera apenas a largura de 280px (aberto) para 76px (fechado) */}
      <aside className={`relative hidden md:flex flex-col h-full border-r border-slate-200 bg-white flex-shrink-0 transition-all duration-300 ease-in-out z-30 ${sidebar_aberta ? 'w-[280px]' : 'w-[76px]'}`}>
        
        {/* Cabeçalho da Sidebar (Logo e Botão Toggle) */}
        <div className="h-16 flex items-center justify-center mt-2 mb-4 px-4">
          {sidebar_aberta ? (
            <div className="flex justify-between items-center w-full animate-fade-in">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Stratavia</h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Global Nomad</p>
              </div>
              <button onClick={() => set_sidebar_aberta(false)} className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors" title="Recolher menu">
                <IconeMenuFechar />
              </button>
            </div>
          ) : (
            <button
              onClick={() => set_sidebar_aberta(true)}
              className="w-10 h-10 relative flex items-center justify-center rounded-lg group hover:bg-slate-100 transition-colors"
            >
              <div className="block group-hover:hidden text-slate-900">
                <IconeGlobo />
              </div>
              <div className="hidden group-hover:block text-slate-700">
                <IconeMenuAbrir />
              </div>
              {/* Tooltip super charmoso no hover */}
              <div className="absolute left-14 hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">
                Expandir menu
              </div>
            </button>
          )}
        </div>
        
        {/* Botão Nova Análise */}
        <div className="px-4 mb-6 flex justify-center">
          {sidebar_aberta ? (
            <button onClick={iniciar_novo_chat} className="w-full flex items-center justify-center gap-2 bg-[#0f172a] text-white py-3 rounded-md font-semibold transition-all hover:bg-slate-800 active:scale-[0.98] text-sm shadow-sm">
              <IconeMais /> Nova Análise
            </button>
          ) : (
            <button onClick={iniciar_novo_chat} className="w-10 h-10 bg-[#0f172a] text-white rounded-md flex items-center justify-center hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm group relative">
              <IconeMais />
              <div className="absolute left-14 hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">
                Nova Análise
              </div>
            </button>
          )}
        </div>
        
        {/* Navegação de Módulos */}
        <nav className="flex-1 overflow-y-auto overflow-x-visible px-2 space-y-1">
          {sidebar_aberta && (
            <div className="px-4 py-2 mb-1 mt-2">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Módulos</h3>
            </div>
          )}
          
          <a href="#" className={`relative flex items-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors rounded-md font-medium text-sm group ${sidebar_aberta ? 'px-4 py-2 gap-3' : 'px-0 py-2 justify-center mx-2'}`}>
            <IconeDashboard /> 
            {sidebar_aberta && <span>Dashboard</span>}
            {!sidebar_aberta && (
              <div className="absolute left-[60px] hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">
                Dashboard
              </div>
            )}
          </a>
          
          <a href="#" className={`relative flex items-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors rounded-md font-medium text-sm group ${sidebar_aberta ? 'px-4 py-2 gap-3' : 'px-0 py-2 justify-center mx-2'}`}>
            <IconeBussola /> 
            {sidebar_aberta && <span>Exploration</span>}
            {!sidebar_aberta && (
              <div className="absolute left-[60px] hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">
                Exploration
              </div>
            )}
          </a>
          
          <a href="#" className={`relative flex items-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors rounded-md font-medium text-sm group ${sidebar_aberta ? 'px-4 py-2 gap-3' : 'px-0 py-2 justify-center mx-2'}`}>
            <IconeConfig /> 
            {sidebar_aberta && <span>Settings</span>}
            {!sidebar_aberta && (
              <div className="absolute left-[60px] hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">
                Settings
              </div>
            )}
          </a>

          {/* Histórico Recente (só aparece se aberto) */}
          {sidebar_aberta && (
            <>
              <div className="px-4 py-2 mt-6 mb-1">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Histórico Recente</h3>
              </div>
              <div className="space-y-1">
                {historico_chats.map((chat) => (
                  <a key={chat.id} href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-md truncate transition-colors">
                    {chat.titulo}
                  </a>
                ))}
              </div>
            </>
          )}
        </nav>

        {/* Rodapé da Sidebar (Avatar do Usuário) */}
        <div className="mt-auto relative p-4 border-t border-slate-200">
          
          {/* Menu Flutuante (Popover) de Configurações da Conta */}
          {menu_perfil_aberto && (
            <div className="absolute bottom-[110%] left-4 mb-2 w-48 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-50 animate-fade-in">
              <button className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors">
                <IconeConfig /> Configurações
              </button>
              <div className="h-px bg-slate-200 w-full"></div>
              <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors font-medium">
                <IconeSair /> Desconectar
              </button>
            </div>
          )}

          <button 
            onClick={(e) => { e.stopPropagation(); set_menu_perfil_aberto(!menu_perfil_aberto); }} 
            className={`w-full flex items-center rounded-lg hover:bg-slate-50 transition-colors group relative ${sidebar_aberta ? 'p-2 gap-3' : 'justify-center p-1'}`}
          >
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl5V7MKMp2WXyFFkfjq3UgQtOaal7ViTB2EJsUwkQjYbcRiCsc8bcsTEMMi4UX0TIte0FJCu_8Un5mYHi5mFxmbMUoxuHzLW9jikAzkmyuxz7ImF_MqshXKtVvW1ybD7nwNKUF4J03f5okXKTwYV_dahVMt3xt2RbvWgMiPs9k-nbNmNu8xhrw-5DES6-Wj4QpVI_cFKRXmPYl5qOxnUEUDE0e4sbIdnC9lQdpG02wdb-WdNaccP4Q2h2Gt7KMomlDMN_nDNQmmo8" alt="Perfil" className="w-9 h-9 rounded-full object-cover border border-slate-300 flex-shrink-0" />
            
            {sidebar_aberta && (
              <div className="text-left flex-1 truncate">
                <p className="font-bold text-sm text-slate-900 truncate">Alexander Souza</p>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider">PRO MEMBER</p>
              </div>
            )}

            {!sidebar_aberta && (
               <div className="absolute left-14 hidden group-hover:block bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded whitespace-nowrap shadow-md z-50">
                 Perfil e Conta
               </div>
            )}
          </button>
        </div>
      </aside>

      {/* --- ÁREA PRINCIPAL (CHAT) --- */}
      <main className="flex-1 flex flex-col h-full relative w-full bg-[#fcfcfc]">
        
        {/* Cabeçalho Topo do Chat */}
        <header className="h-16 flex justify-between items-center px-8 z-10 flex-shrink-0 w-full border-b border-transparent">
          <h2 className="font-semibold text-slate-900 text-[15px]">Intelligence Hub</h2>
          <button className="hidden sm:block bg-[#059669] text-white px-4 py-2 rounded-md font-semibold text-xs hover:bg-[#047857] transition-colors">
            Exportar Relatório
          </button>
        </header>

        {/* Textura pontilhada suave */}
        <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        {/* Área de Mensagens */}
        <div className={`flex-1 overflow-y-auto z-10 px-4 md:px-8 ${tela_inicial ? 'flex items-center justify-center' : 'pt-8 pb-32'}`}>
          <div className="w-full max-w-3xl mx-auto flex flex-col relative h-full">
            
            {/* ESTADO VAZIO */}
            {tela_inicial && (
              <div className="flex flex-col items-center justify-center w-full pb-32 mt-auto mb-auto animate-fade-in">
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] mb-4 tracking-tight">Intelligence on Demand</h1>
                  <p className="text-[15px] text-slate-500 max-w-xl mx-auto">
                    Acesse insights geoeconômicos em tempo real, comparações jurisdicionais e inteligência regulatória.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
                  <div onClick={() => set_texto_digitado("Como funciona a otimização tributária para nômades?")} className="bg-white border border-slate-200 p-6 rounded-xl cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group">
                    <div className="w-8 h-8 bg-[#dcfce7] text-[#059669] rounded-md flex items-center justify-center mb-4">
                      <IconeDashboard />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">Comparar Regras</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">Avalie tratados fiscais e requisitos de residência entre múltiplos...</p>
                  </div>

                  <div onClick={() => set_texto_digitado("Qual o melhor caminho para cidadania na UE?")} className="bg-white border border-slate-200 p-6 rounded-xl cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group">
                    <div className="w-8 h-8 bg-[#0f172a] text-white rounded-md flex items-center justify-center mb-4">
                      <IconeBussola />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">Residência Global</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">Descubra caminhos ideais para programas de mobilidade...</p>
                  </div>

                  <div onClick={() => set_texto_digitado("Faça um mapeamento de fluxo de capital.")} className="bg-white border border-slate-200 p-6 rounded-xl cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group">
                    <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-md flex items-center justify-center mb-4">
                      <IconeOlho />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">Inteligência de Ativos</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">Mapeamento em tempo real de fluxo de capital em hubs...</p>
                  </div>
                </div>
              </div>
            )}

            {/* CHAT ATIVO */}
            {!tela_inicial && (
              <div className="flex flex-col gap-6 w-full pb-8">
                {mensagens_atuais.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.autor === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                    {msg.autor === 'ia' && (
                      <div className="w-8 h-8 rounded bg-[#0f172a] text-emerald-400 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                        <IconeOlho />
                      </div>
                    )}
                    <div className={`max-w-[85%] md:max-w-[75%] p-4 ${msg.autor === 'usuario' ? 'bg-slate-100 text-slate-900 rounded-2xl rounded-tr-sm' : 'bg-transparent text-slate-800'}`}>
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.texto}</p>
                    </div>
                  </div>
                ))}

                {ia_pensando && (
                  <div className="flex justify-start items-center gap-3 text-slate-400 animate-pulse">
                    <div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span className="text-sm">Processando análise...</span>
                  </div>
                )}
                
                <div ref={final_do_chat_ref} />
              </div>
            )}
          </div>
        </div>

        {/* --- CAIXA DE INPUT --- */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-white via-white to-transparent flex justify-center">
          <div className="w-full max-w-3xl flex flex-col relative">
            <form onSubmit={enviar_mensagem} className="bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50 relative flex items-end p-2 transition-all">
              <div className="flex-1">
                <textarea 
                  value={texto_digitado}
                  onChange={ajustar_altura_textarea}
                  onKeyDown={apertou_enter}
                  placeholder="Como funciona a otimização tributária para nômades?" 
                  className="w-full bg-transparent border-none focus:ring-0 text-[15px] placeholder:text-slate-400 py-3 px-4 resize-none min-h-[48px] max-h-48 outline-none"
                  rows="1"
                />
              </div>
              <div className="flex items-center gap-1 pb-1 pr-1 flex-shrink-0">
                <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <IconeAnexo />
                </button>
                <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors mr-1">
                  <IconeMic />
                </button>
                <button 
                  type="submit"
                  disabled={!texto_digitado.trim() || ia_pensando} 
                  className="bg-[#0f172a] text-white w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IconeSetaCima />
                </button>
              </div>
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}