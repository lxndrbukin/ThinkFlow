import { type JSX, type FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState, sendMessage } from "../../store";

export default function MessageInput(): JSX.Element {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { messages } = useSelector((state: RootState) => state.chat);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    dispatch(sendMessage({ message, history: messages }));
    setMessage("");
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name="message"
      ></textarea>
      <button type="submit">Send</button>
    </form>
  );
}
