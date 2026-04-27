"use client";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatContainer() {
  return (
    <div>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}