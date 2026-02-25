import type { JSX } from "react";
import ChatWindow from "./ChatWindow/ChatWindow";
import ChatsList from "./ChatsList/ChatsList";

export default function App(): JSX.Element {
  return (
    <div className="container">
      <ChatsList />
      <ChatWindow />
    </div>
  );
}
