"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import ReactMarkdown from 'react-markdown';

// --- ÍCONES DO CHAT (Mantidos aqui os que são exclusivos dos cards iniciais) ---
const IconeDashboard = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>;
const IconeBussola = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="8 16 10 10 16 8 14 14 8 16" /><circle cx="12" cy="12" r="9" /></svg>;
const IconeAnexo = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" /></svg>;
const IconeMic = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="9" y="2" width="6" height="11" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>;
const IconeSetaCima = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="18" y1="11" x2="12" y2="5" /><line x1="6" y1="11" x2="12" y2="5" /></svg>;
const IconeOlho = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="2" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg>;

export default function pagina_chat() {
  // --- ESTADOS DO COMPONENTE ---
  const [historico_chats, set_historico_chats] = useState([]);
  const [chat_ativo_id, set_chat_ativo_id] = useState(null);
  const [mensagens_atuais, set_mensagens_atuais] = useState([]);
  const [texto_digitado, set_texto_digitado] = useState("");
  const [ia_pensando, set_ia_pensando] = useState(false);
  
  // Referência para controlar a rolagem automática da tela
  const final_do_chat_ref = useRef(null);

  // Função para puxar a lista de chats salvos no MongoDB
  const carregar_historico = async () => {
    try {
      const resposta = await fetch("/api/chats");
      if (resposta.ok) {
        const dados = await resposta.json();
        set_historico_chats(dados.chats);
      }
    } catch (erro) {
      console.error("Erro ao carregar histórico:", erro);
    }
  };

  // Carrega o histórico da sidebar assim que a página abre
  useEffect(() => {
    carregar_historico();
  }, []);

  // Monitora as mensagens. Se entrar texto novo, rola a página pro final
  useEffect(() => {
    if (final_do_chat_ref.current) {
      final_do_chat_ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensagens_atuais, ia_pensando]);

  // Reseta a tela para o estado de "Nova Análise"
  const iniciar_novo_chat = () => {
    set_chat_ativo_id(null);
    set_mensagens_atuais([]);
    set_texto_digitado("");
  };

  // Busca as mensagens de um chat antigo clicado na barra lateral
  const carregar_chat_especifico = async (id_do_chat) => {
    set_chat_ativo_id(id_do_chat);
    set_ia_pensando(true);
    set_mensagens_atuais([]); // Limpa a tela antes de renderizar as antigas
    
    try {
      const resposta = await fetch(`/api/chats/${id_do_chat}`);
      if (resposta.ok) {
        const dados = await resposta.json();
        set_mensagens_atuais(dados.chat.mensagens);
      }
    } catch (erro) {
      console.error("Erro ao puxar mensagens do chat:", erro);
    } finally {
      set_ia_pensando(false);
    }
  };

  // Gerencia o envio de mensagens (tanto novas quanto respostas)
  const enviar_mensagem = async (evento) => {
    evento.preventDefault(); 
    if (!texto_digitado.trim() || ia_pensando) return;

    const texto_enviado = texto_digitado;
    set_texto_digitado("");
    set_ia_pensando(true);

    // Adiciona a mensagem na tela na hora (interface otimista)
    const mensagem_provisoria = { id: Date.now().toString(), autor: "usuario", texto: texto_enviado };
    set_mensagens_atuais((anteriores) => [...anteriores, message_provisoria]);

    try {
      if (!chat_ativo_id) {
        // Fluxo A: É o primeiro input, precisa criar o chat no Mongo
        const resposta = await fetch("/api/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto: texto_enviado }),
        });
        const dados = await resposta.json();
        if (dados.sucesso) {
          set_chat_ativo_id(dados.chat._id);
          set_mensagens_atuais(dados.chat.mensagens);
          carregar_historico(); // Atualiza a barra lateral com o novo item
        }
      } else {
        // Fluxo B: O chat já existe, só empurra mais uma linha pro array
        const resposta = await fetch(`/api/chats/${chat_ativo_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ texto: texto_enviado }),
        });
        const dados = await resposta.json();
        if (dados.sucesso) {
          set_mensagens_atuais(dados.chat.mensagens);
          carregar_historico(); // Joga o chat atual pro topo da lista
        }
      }
    } catch (erro) {
      console.error("Erro ao enviar mensagem pro banco:", erro);
    } finally {
      set_ia_pensando(false);
    }
  };

  // Faz a caixa de texto crescer para baixo conforme o usuário digita textos longos
  const ajustar_altura_textarea = (evento) => {
    const elemento = evento.target;
    elemento.style.height = 'auto';
    elemento.style.height = `${elemento.scrollHeight}px`;
    set_texto_digitado(elemento.value);
  };

  // Atalho: se apertar Enter sozinho envia, se for Shift+Enter quebra a linha
  const apertou_enter = (evento) => {
    if (evento.key === 'Enter' && !evento.shiftKey) {
      evento.preventDefault();
      enviar_mensagem(evento);
    }
  };

  const tela_inicial = mensagens_atuais.length === 0 && !chat_ativo_id;

  return (
    <div className="fixed inset-0 z-[100] flex bg-white font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar modular que criamos */}
      <Sidebar 
        ao_clicar_nova_analise={iniciar_novo_chat} 
        historico_chats={historico_chats}
        chat_ativo_id={chat_ativo_id}
        ao_selecionar_chat={carregar_chat_especifico}
        recarregar_historico={carregar_historico}
      />

      {/* --- ÁREA DO CHAT --- */}
      <main className="flex-1 flex flex-col h-full relative w-full bg-[#fcfcfc]">
        
        <header className="h-16 flex justify-between items-center px-8 z-10 flex-shrink-0 w-full border-b border-transparent">
          <h2 className="font-semibold text-slate-900 text-[15px]">Intelligence Hub</h2>
          <button className="hidden sm:block bg-[#059669] text-white px-4 py-2 rounded-md font-semibold text-xs hover:bg-[#047857] transition-colors">
            Exportar Relatório
          </button>
        </header>

        <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        {/* Listagem flexível das mensagens */}
        <div className={`flex-1 overflow-y-auto z-10 px-4 md:px-8 ${tela_inicial ? 'flex items-center justify-center' : 'pt-8'}`}>
          <div className="w-full max-w-3xl mx-auto flex flex-col relative h-full">
            
            {/* ESTADO VAZIO: Cards iniciais */}
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
                    <div className="w-8 h-8 bg-[#dcfce7] text-[#059669] rounded-md flex items-center justify-center mb-4"><IconeDashboard /></div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">Comparar Regras</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">Avalie tratados fiscais e requisitos de residência entre múltiplos...</p>
                  </div>

                  <div onClick={() => set_texto_digitado("Qual o melhor caminho para cidadania na UE?")} className="bg-white border border-slate-200 p-6 rounded-xl cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group">
                    <div className="w-8 h-8 bg-[#0f172a] text-white rounded-md flex items-center justify-center mb-4"><IconeBussola /></div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">Residência Global</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">Descubra caminhos ideais para programas de mobilidade...</p>
                  </div>

                  <div onClick={() => set_texto_digitado("Faça um mapeamento de fluxo de capital.")} className="bg-white border border-slate-200 p-6 rounded-xl cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all group">
                    <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-md flex items-center justify-center mb-4"><IconeOlho /></div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">Inteligência de Ativos</h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">Mapeamento em tempo real de fluxo de capital em hubs...</p>
                  </div>
                </div>
              </div>
            )}

            {/* CHAT ATIVO: Balões de conversa */}
            {!tela_inicial && (
              <div className="flex flex-col gap-6 w-full">
                {mensagens_atuais.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.autor === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                    {msg.autor === 'ia' && (
                      <div className="w-8 h-8 rounded bg-[#0f172a] text-emerald-400 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                        <IconeOlho />
                      </div>
                    )}
                    <div className={`max-w-[85%] md:max-w-[75%] p-4 ${msg.autor === 'usuario' ? 'bg-slate-100 text-slate-900 rounded-2xl rounded-tr-sm' : 'bg-transparent text-slate-800'}`}>
                      {msg.autor === 'usuario' ? (
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.texto}</p>
                      ) : (
                        <div className="text-[15px] leading-relaxed prose max-w-none prose-p:leading-relaxed prose-pre:bg-slate-100 prose-pre:text-slate-900 marker:text-slate-400">
                          {/* ReactMarkdown trata as quebras, listas e negritos do Gemini */}
                          <ReactMarkdown>{msg.texto}</ReactMarkdown>
                        </div>
                      )}
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
                
                {/* SOLUÇÃO DO BUG: Bloco invisível com a mesma altura da caixa flutuante do input.
                    Isso força o conteúdo real a rolar totalmente para cima, sem sumir debaixo do input. */}
                <div className="h-40 md:h-48 w-full flex-shrink-0"></div>

                <div ref={final_do_chat_ref} />
              </div>
            )}
          </div>
        </div>

        {/* --- CAIXA DE TEXTO (FOOTER DO CHAT) --- */}
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
                <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><IconeAnexo /></button>
                <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors mr-1"><IconeMic /></button>
                <button type="submit" disabled={!texto_digitado.trim() || ia_pensando} className="bg-[#0f172a] text-white w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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