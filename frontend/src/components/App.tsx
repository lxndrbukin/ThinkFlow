import type { JSX } from "react";
import ChatWindow from "./ChatWindow/ChatWindow";

export default function App(): JSX.Element {
  return (
    <div className="container">
      <ChatWindow />
    </div>
  );
}
