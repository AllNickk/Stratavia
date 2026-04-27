export default function MessageBubble({ role, text }) {
  return (
    <div>
      <strong>{role === "user" ? "Você:" : "Bot:"}</strong>
      <p>{text}</p>
    </div>
  );
}