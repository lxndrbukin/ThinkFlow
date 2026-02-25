import { type JSX, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  type AppDispatch,
  type ChatResponse,
  getMessages,
  createChat,
} from "../../store";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

export default function ChatWindow(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(createChat())
      .unwrap()
      .then((chat: ChatResponse) => dispatch(getMessages(chat.id)));
  }, []);

  return (
    <div className="chat-window">
      <ChatHeader />
      <MessagesList />
      <MessageInput />
    </div>
  );
}
