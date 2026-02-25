import { type JSX, type FormEvent, type KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  type AppDispatch,
  type RootState,
  streamMessage,
  addMessage,
} from "../../store";

export default function MessageInput(): JSX.Element {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, chatId } = useSelector(
    (state: RootState) => state.chats.currentChat,
  );

  const handleSend = () => {
    if (!message.trim() || isLoading || !chatId) return;
    dispatch(addMessage({ role: "user", content: message }));
    dispatch(streamMessage({ chatId, message }));
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
        placeholder="Ask anything"
      ></textarea>
      <button disabled={isLoading} type="submit">
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </form>
  );
}
