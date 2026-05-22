"use client";

import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "AI Advisor", icon: "smart_toy", active: true },
  { label: "Comparator", icon: "compare_arrows" },
  { label: "Exploration", icon: "travel_explore" },
  { label: "Documents", icon: "description" },
];

const suggestedPrompts = [
  "Como otimizar taxas no Paraguai?",
  "Comparar Estônia vs Portugal",
  "Ver obrigações NHR",
];

const initialMessages = [
  {
    id: 1,
    role: "bot",
    text: "Olá, Alex! Analisei seu perfil NHR em Portugal. Notei que você tem uma declaração trimestral vencendo em 4 dias. Além disso, com base nos seus rendimentos de consultoria, você poderia economizar até 15% extras se estruturasse parte da operação via Paraguai.",
    cards: [
      {
        tone: "success",
        title: "Dica de Otimização",
        body: "Migrar residência fiscal para o Paraguai (Imposto Territorial de 10%).",
      },
      {
        tone: "danger",
        title: "Alerta de Prazo",
        body: "IVA Portugal - Limite de entrega: 15 de Outubro.",
      },
    ],
  },
  {
    id: 2,
    role: "user",
    text: "Quais são as minhas obrigações NHR este mês e como o Paraguai se compara?",
  },
  {
    id: 3,
    role: "bot",
    text: "Para o seu status NHR em Portugal este mês, você precisa registrar suas faturas de consultoria externa no portal das Finanças até o dia 15. Abaixo, preparei uma comparação rápida entre sua situação atual e a alternativa no Paraguai:",
    comparison: true,
    followUp: "Deseja que eu simule o custo de transição para o Paraguai?",
  },
];

const comparisonRows = [
  ["Imposto Renda Ext.", "0% (Isento)", "0% (Territorial)"],
  ["Imposto Local", "20% (Flat Rate)", "10% (Flat Rate)"],
  ["Seguridade Social", "Obrigatória", "Opcional"],
];

export default function ChatContainer() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  const sendMessage = (text = draft) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", text: cleanText },
      {
        id: crypto.randomUUID(),
        role: "bot",
        text: "Recebi sua pergunta. Vou cruzar suas jurisdições, obrigações abertas e oportunidades fiscais antes de recomendar o próximo passo.",
      },
    ]);
    setDraft("");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#fcf8fa] font-[Inter,Arial,sans-serif] text-[#1b1b1d]">
      <SideNav />

      <main className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        <section className="flex min-h-0 flex-1 flex-col items-center overflow-hidden">
          <div className="chat-container w-full flex-1 overflow-y-auto px-4 py-8 md:px-10">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
              <Greeting />

              <div className="flex flex-col gap-8">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>
            </div>
          </div>

          <Composer draft={draft} setDraft={setDraft} onSend={sendMessage} />
        </section>
      </main>
    </div>
  );
}

function SideNav() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-[#c6c6cd] bg-[#f0edef] py-2 md:flex">
      <div className="mb-10 px-6 pt-2">
        <h1 className="text-xl font-bold leading-7 text-black">NomadTax</h1>
        <p className="font-mono text-[10px] font-medium uppercase leading-4 tracking-[0.05em] text-[#45464d]">
          Global Intelligence
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`flex w-full items-center border-r-4 px-6 py-3 text-left transition duration-200 ${
              item.active
                ? "border-[#006c49] bg-[#6cf8bb]/20 text-[#006c49]"
                : "border-transparent text-[#45464d] hover:bg-[#eae7e9] hover:text-[#1b1b1d]"
            }`}
          >
            <Icon name={item.icon} className="mr-3 h-5 w-5" />
            <span className="font-mono text-xs font-medium leading-4 tracking-[0.05em]">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-auto px-6">
        <div className="mb-6 rounded-lg bg-[#131b2e] p-4 text-center shadow-[0_4px_6px_-1px_rgba(15,23,42,0.05),0_2px_4px_-2px_rgba(15,23,42,0.05)]">
          <p className="mb-2 font-mono text-[10px] font-medium uppercase leading-[14px] tracking-[0.05em] text-[#7c839b]">
            Pro Plan
          </p>
          <button
            type="button"
            className="w-full rounded bg-[#006c49] py-2 font-mono text-xs font-semibold leading-4 tracking-[0.05em] text-white transition hover:bg-[#005236]"
          >
            Upgrade to Pro
          </button>
        </div>

        <div className="flex items-center gap-3 pb-4">
          <UserAvatar />
          <div>
            <p className="font-mono text-xs font-bold leading-4 tracking-[0.05em] text-[#1b1b1d]">
              Alex River
            </p>
            <p className="font-mono text-[10px] font-medium leading-[14px] tracking-[0.05em] text-[#45464d]">
              Global Citizen
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="z-10 flex h-20 shrink-0 items-center justify-between border-b border-[#c6c6cd] bg-[#fcf8fa]/85 px-4 backdrop-blur-md md:px-10">
      <div className="flex min-w-0 items-center gap-4 md:gap-8">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-medium uppercase leading-[14px] tracking-[0.05em] text-[#45464d]">
            Global Tax Score
          </span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 overflow-hidden rounded-full bg-[#e4e2e4]">
              <div className="h-full w-[65%] bg-[#006c49]" />
            </div>
            <span className="font-mono text-xs font-bold leading-4 tracking-[0.05em] text-[#006c49]">
              65%
            </span>
          </div>
        </div>

        <div className="hidden h-8 w-px bg-[#c6c6cd] sm:block" />

        <div className="hidden flex-col sm:flex">
          <span className="font-mono text-[10px] font-medium uppercase leading-[14px] tracking-[0.05em] text-[#45464d]">
            Potential Savings
          </span>
          <span className="font-mono text-xs font-bold leading-4 tracking-[0.05em] text-[#006c49]">
            $12,500
            <span className="text-[10px] font-normal text-[#45464d]">/yr</span>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4 md:gap-6">
        <div className="hidden items-center gap-2 lg:flex">
          <span className="font-mono text-xs font-medium leading-4 tracking-[0.05em] text-[#45464d]">
            Central:
          </span>
          <span className="font-mono text-xs font-bold leading-4 tracking-[0.05em] text-black">
            Lisboa, PT
          </span>
        </div>
        <IconButton label="Notificações" icon="notifications" />
        <IconButton label="Configurações" icon="settings" />
      </div>
    </header>
  );
}

function Greeting() {
  return (
    <div className="mb-2 flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#006c49] text-white shadow-[0_4px_6px_-1px_rgba(15,23,42,0.05),0_2px_4px_-2px_rgba(15,23,42,0.05)]">
        <Icon name="smart_toy" className="h-8 w-8" />
      </div>
      <h2 className="text-[28px] font-semibold leading-9 text-black md:text-[32px] md:leading-10">
        Como posso ajudar com seus impostos hoje?
      </h2>
      <p className="mt-2 max-w-lg text-base leading-6 text-[#45464d]">
        Sou seu especialista em inteligência fiscal global. Analiso jurisdições,
        simulo economias e acompanho obrigações em tempo real.
      </p>
    </div>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="ml-auto flex max-w-3xl flex-row-reverse gap-4">
        <UserAvatar compact />
        <div className="rounded-2xl rounded-tr-sm bg-[#eae7e9] px-5 py-3">
          <p className="text-base leading-6 text-[#1b1b1d]">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-w-3xl gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#006c49] text-white">
        <Icon name="smart_toy" className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1 space-y-4">
        <p className="text-base leading-7 text-[#1b1b1d]">{message.text}</p>

        {message.cards && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {message.cards.map((card) => (
              <InsightCard key={card.title} card={card} />
            ))}
          </div>
        )}

        {message.comparison && <ComparisonTable />}

        {message.followUp && (
          <p className="text-base leading-7 text-[#1b1b1d]">
            {message.followUp}
          </p>
        )}
      </div>
    </div>
  );
}

function InsightCard({ card }) {
  const isDanger = card.tone === "danger";

  return (
    <div className="rounded-lg border border-[#c6c6cd] bg-white p-4 shadow-[0_4px_6px_-1px_rgba(15,23,42,0.05),0_2px_4px_-2px_rgba(15,23,42,0.05)]">
      <p
        className={`mb-1 font-mono text-[10px] font-bold uppercase leading-[14px] tracking-[0.05em] ${
          isDanger ? "text-[#ba1a1a]" : "text-[#006c49]"
        }`}
      >
        {card.title}
      </p>
      <p className="text-sm leading-5 text-[#1b1b1d]">{card.body}</p>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#c6c6cd] bg-white shadow-[0_4px_6px_-1px_rgba(15,23,42,0.05),0_2px_4px_-2px_rgba(15,23,42,0.05)]">
      <table className="w-full min-w-[560px] text-left text-sm leading-5">
        <thead className="border-b border-[#c6c6cd] bg-[#f6f3f5]">
          <tr>
            <th className="px-4 py-2 font-semibold">Critério</th>
            <th className="px-4 py-2 font-semibold">Portugal (NHR)</th>
            <th className="px-4 py-2 font-semibold text-[#006c49]">Paraguai</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#c6c6cd]">
          {comparisonRows.map(([label, portugal, paraguay], index) => (
            <tr
              key={label}
              className={index % 2 === 0 ? "bg-white" : "bg-[#fcf8fa]"}
            >
              <td className="px-4 py-3">{label}</td>
              <td className="px-4 py-3">{portugal}</td>
              <td className="px-4 py-3 font-semibold">{paraguay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Composer({ draft, setDraft, onSend }) {
  return (
    <div className="w-full shrink-0 bg-[#fcf8fa]/85 px-4 pb-8 pt-4 backdrop-blur-sm md:px-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onSend(prompt)}
              className="rounded-full border border-[#c6c6cd] bg-white px-4 py-2 text-sm font-medium leading-5 text-[#45464d] transition hover:border-[#006c49] hover:bg-[#f0edef] hover:text-[#006c49]"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="group relative">
          <div className="absolute inset-0 rounded-2xl bg-[#006c49]/5 blur-xl transition group-focus-within:bg-[#006c49]/10" />
          <div className="relative rounded-2xl border-2 border-[#c6c6cd] bg-white p-4 shadow-sm transition focus-within:border-[#006c49] focus-within:ring-4 focus-within:ring-[#006c49]/5">
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  onSend();
                }
              }}
              className="min-h-[100px] max-h-40 w-full resize-none border-none bg-transparent py-2 text-base leading-6 text-[#1b1b1d] outline-none placeholder:text-[#76777d] focus:ring-0"
              placeholder="Pergunte sobre leis fiscais, simule mudanças de residência ou gerencie suas obrigações..."
            />

            <div className="mt-2 flex items-center justify-between border-t border-[#c6c6cd]/30 pt-2">
              <div className="flex gap-2">
                {[
                  ["attach_file", "Anexar arquivo"],
                  ["image", "Enviar imagem"],
                  ["description", "Adicionar documento"],
                ].map(([icon, label]) => (
                  <IconButton key={icon} icon={icon} label={label} />
                ))}
              </div>

              <button
                type="button"
                onClick={() => onSend()}
                className="flex items-center gap-2 rounded-lg bg-[#006c49] px-4 py-2.5 font-mono text-xs font-bold leading-4 tracking-[0.05em] text-white shadow-[0_4px_6px_-1px_rgba(15,23,42,0.05),0_2px_4px_-2px_rgba(15,23,42,0.05)] transition hover:bg-[#005236] md:px-6"
              >
                <span className="hidden sm:inline">Enviar Mensagem</span>
                <span className="sm:hidden">Enviar</span>
                <Icon name="send" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] leading-4 text-[#45464d]">
          O assistente NomadTax IA pode cometer erros. Verifique informações
          importantes com um consultor humano.
        </p>
      </div>
    </div>
  );
}

function UserAvatar({ compact = false }) {
  const sizeClass = compact ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  return (
    <div
      className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-full bg-[#131b2e] font-semibold text-white`}
      aria-label="Alex River"
    >
      AR
    </div>
  );
}

function IconButton({ icon, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="rounded-lg p-2 text-[#45464d] transition hover:bg-[#6cf8bb]/20 hover:text-[#006c49]"
    >
      <Icon name={icon} className="h-5 w-5" />
    </button>
  );
}

function Icon({ name, className = "h-5 w-5" }) {
  const icons = {
    dashboard: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    smart_toy: (
      <>
        <path d="M12 3v3" />
        <rect x="4" y="6" width="16" height="14" rx="4" />
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
        <path d="M9 16h6" />
      </>
    ),
    compare_arrows: (
      <>
        <path d="M7 7h12" />
        <path d="m15 3 4 4-4 4" />
        <path d="M17 17H5" />
        <path d="m9 13-4 4 4 4" />
      </>
    ),
    travel_explore: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4 4" />
        <path d="M8 11h6" />
        <path d="M11 8v6" />
      </>
    ),
    description: (
      <>
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </>
    ),
    notifications: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
        <path d="M10 20a2 2 0 0 0 4 0" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1-2 3.5-.2-.1a1.7 1.7 0 0 0-1.9.3l-.1.1a1.7 1.7 0 0 0-.5 1.3H9a1.7 1.7 0 0 0-.5-1.3l-.1-.1a1.7 1.7 0 0 0-1.9-.3l-.2.1-2-3.5.1-.1a1.7 1.7 0 0 0 .3-1.8v-.2a1.7 1.7 0 0 0-1.1-1.6l-.1-.1v-4l.1-.1a1.7 1.7 0 0 0 1.1-1.6v-.2a1.7 1.7 0 0 0-.3-1.8l-.1-.1 2-3.5.2.1a1.7 1.7 0 0 0 1.9-.3l.1-.1A1.7 1.7 0 0 0 9 1h6a1.7 1.7 0 0 0 .5 1.3l.1.1a1.7 1.7 0 0 0 1.9.3l.2-.1 2 3.5-.1.1a1.7 1.7 0 0 0-.3 1.8v.2a1.7 1.7 0 0 0 1.1 1.6l.1.1v4l-.1.1a1.7 1.7 0 0 0-1 1.6z" />
      </>
    ),
    attach_file: (
      <path d="m21 12.5-8.8 8.8a6 6 0 0 1-8.5-8.5l9.9-9.9a4 4 0 0 1 5.7 5.7l-10 9.9a2 2 0 1 1-2.8-2.8l8.8-8.8" />
    ),
    image: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="10.5" r="1.5" />
        <path d="m21 15-5-5L5 19" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4z" />
        <path d="M22 2 11 13" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {icons[name]}
    </svg>
  );
}
