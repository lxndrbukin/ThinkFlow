import { type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState, deleteChat } from "../../store";

export default function ChatHeader(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, chatId } = useSelector(
    (state: RootState) => state.chats.currentChat,
  );

  const confirm = () => {
    if (!chatId) return;
    if (window.confirm("Delete chat history?")) {
      dispatch(deleteChat(chatId));
    }
  };

  const renderDeleteBtn = () => {
    return (
      <button onClick={confirm} disabled={isLoading}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    );
  };

  return (
    <div className="chat-header">
      <div className="logo">
        <i className="fa-solid fa-brain"></i>
      </div>
      {renderDeleteBtn()}
    </div>
  );
}
