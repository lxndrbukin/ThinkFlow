import { type JSX, type FormEvent, type KeyboardEvent, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store";

type MessageInputProps = {
  onSend: (message: string) => void;
};

export default function MessageInput({
  onSend,
}: MessageInputProps): JSX.Element {
  const [message, setMessage] = useState("");

  const { isLoading } = useSelector(
    (state: RootState) => state.chats.currentChat,
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(message);
      setMessage("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSend(message);
    setMessage("");
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
