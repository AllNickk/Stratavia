import MessageBubble from "./MessageBubble";

export default function ChatMessages({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            role={msg.role}
            text={msg.text}
          />
        ))}
      </div>
    </div>
  );
}