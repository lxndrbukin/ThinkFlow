import type { JSX } from "react";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

export default function ChatWindow(): JSX.Element {
  return (
    <div className="chat-window">
      <MessagesList />
      <MessageInput />
    </div>
  );
}
