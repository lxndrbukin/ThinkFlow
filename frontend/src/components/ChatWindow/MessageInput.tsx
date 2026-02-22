import { type JSX, type FormEvent, type KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  type AppDispatch,
  type RootState,
  sendMessage,
  addMessage,
} from "../../store";

export default function MessageInput(): JSX.Element {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { messages, isLoading } = useSelector((state: RootState) => state.chat);

  const handleSend = () => {
    if (!message.trim() || isLoading) return;
    dispatch(addMessage({ role: "user", content: message }));
    dispatch(sendMessage({ message, history: messages }));
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <textarea
        onKeyDown={handleKeyDown}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name="message"
      ></textarea>
      <button disabled={isLoading} type="submit">
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </form>
  );
}
