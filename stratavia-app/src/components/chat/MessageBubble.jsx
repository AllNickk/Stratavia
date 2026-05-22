export default function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[70%] px-4 py-3 rounded-2xl text-sm
          ${
            isUser
              ? "bg-gray-600 text-white rounded-br-md"
              : "bg-green-500 text-white rounded-bl-md"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}