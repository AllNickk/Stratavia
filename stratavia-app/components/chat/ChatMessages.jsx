import MessageBubble from "./MessageBubble";

export default function ChatMessages() {
  const messages = [
    { id: 1, role: "user", text: "Oi, preciso de ajuda tributária" },
    { id: 2, role: "bot", text: "Claro! Qual sua dúvida?" },
  ];

  return (
    <div>
      {messages.map((msg) => (
        <MessageBubble key={msg.id} role={msg.role} text={msg.text} />
      ))}
    </div>
  );
}