"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";

const IconeFoguete = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" /><path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" /><circle cx="15" cy="9" r="1" /></svg>;

export default function tela_mvp({ titulo_modulo }) {
  const roteador = useRouter();
  
  // Estados para gerenciar o usuário e o histórico de chats
  const [nome_usuario, set_nome_usuario] = useState("Carregando...");
  const [historico_chats, set_historico_chats] = useState([]);

  useEffect(() => {
    const buscar_usuario_logado = async () => {
      try {
        const resposta = await fetch("/api/usuarios/me");
        if (resposta.ok) {
          const dados = await resposta.json();
          set_nome_usuario(dados.nome_completo);
        } else {
          set_nome_usuario("Usuário");
        }
      } catch (erro) {
        set_nome_usuario("Usuário Offline");
      }
    };
    buscar_usuario_logado();
  }, []);

  // Lógica importada do chat para puxar as conversas no banco
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

  useEffect(() => {
    carregar_historico();
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex bg-[#fcfcfc] font-sans text-slate-900 overflow-hidden">
      
      {/* Agora passamos a lista de chats e a função de atualizar para a Sidebar */}
      <Sidebar 
        nome_usuario={nome_usuario} 
        historico_chats={historico_chats}
        recarregar_historico={carregar_historico}
        // Se clicar em um chat antigo enquanto estiver nessa tela, jogamos de volta pro Hub
        ao_selecionar_chat={(id) => roteador.push('/chat')}
      />

      <main className="flex-1 flex flex-col h-full relative w-full items-center justify-center p-8">
        <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className="z-10 flex flex-col items-center max-w-lg text-center bg-white border border-slate-200 p-10 rounded-3xl shadow-sm animate-fade-in">
          <div className="w-20 h-20 bg-slate-100 text-slate-800 rounded-2xl flex items-center justify-center mb-6">
            <IconeFoguete />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
            {titulo_modulo}
          </h1>
          
          <p className="text-[15px] text-slate-500 leading-relaxed mb-8">
            O Stratavia está atualmente na fase <strong>MVP (Minimum Viable Product)</strong>. 
            O módulo de {titulo_modulo} faz parte do nosso roadmap de engenharia e será liberado nas próximas atualizações da plataforma.
          </p>
          
          <button 
            onClick={() => roteador.push('/chat')}
            className="bg-[#0f172a] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            Voltar para o Intelligence Hub
          </button>
        </div>
      </main>
    </div>
  );
}