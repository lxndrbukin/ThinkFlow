import { type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState, deleteHistory } from "../../store";

export default function ChatHeader(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading } = useSelector((state: RootState) => state.chat);

  const confirm = () => {
    if (window.confirm("Delete chat history?")) {
      dispatch(deleteHistory());
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
