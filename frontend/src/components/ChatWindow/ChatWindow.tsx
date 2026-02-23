import { type JSX, useEffect } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch, getMessages } from "../../store";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

export default function ChatWindow(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  return (
    <div className="chat-window">
      <MessagesList />
      <MessageInput />
    </div>
  );
}
