"use client";

import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <div className="px-10 py-4 border-t border-gray-700 bg-[#2b2b2b]">
      <div className="flex gap-4 items-center">
        
        <input
          type="text"
          placeholder="Digite alguma coisa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-gray-600 text-white px-4 py-3 rounded-md outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md font-semibold"
        >
          Enviar
        </button>

      </div>
    </div>
  );
}