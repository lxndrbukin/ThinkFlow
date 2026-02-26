import { type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState, deleteChat } from "../../store";

export default function ChatHeader(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector(
    (state: RootState) => state.chats.currentChat,
  );
  const navigate = useNavigate();
  const { chatId } = useParams();

  const confirm = () => {
    if (!chatId) return;
    if (window.confirm("Delete chat history?")) {
      dispatch(deleteChat(Number(chatId))).then(() => navigate("/"));
    }
  };

  const renderDeleteBtn = () => {
    return (
      <button onClick={confirm} disabled={isLoading}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    );
  };

  return <div className="chat-header">{renderDeleteBtn()}</div>;
}
