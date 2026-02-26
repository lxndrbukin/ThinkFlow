import { type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { type AppDispatch, streamMessage, createChat } from "../../store";
import MessageInput from "../ChatWindow/MessageInput";

export default function Home(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSend = async (message: string) => {
    const chat = await dispatch(createChat()).unwrap();
    dispatch(streamMessage({ chatId: chat.id, message }));
    navigate(`/chat/${chat.id}`);
  };

  return (
    <div className="home">
      <div className="messages-empty">
        <h2>How can I help?</h2>
        <p>Ask me anything</p>
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
