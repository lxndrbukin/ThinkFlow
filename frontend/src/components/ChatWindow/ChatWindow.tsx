import { type JSX, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  type AppDispatch,
  type RootState,
  getMessages,
  streamMessage,
  addMessage,
  clearMessages,
} from "../../store";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

export default function ChatWindow(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isLoading,
    chatId: reduxChatId,
    messages,
  } = useSelector((state: RootState) => state.chats.currentChat);

  const { chatId } = useParams();

  useEffect(() => {
    if (!chatId) return;
    if (Number(chatId) === reduxChatId && messages.length > 0) {
      return;
    }
    dispatch(clearMessages());
    dispatch(getMessages(Number(chatId)));
  }, [chatId]);

  const handleSend = (message: string) => {
    if (!message) return;
    if (!message.trim() || isLoading || !chatId) return;
    dispatch(addMessage({ role: "user", content: message }));
    dispatch(streamMessage({ chatId: Number(chatId), message }));
  };

  return (
    <div className="chat-window">
      <ChatHeader />
      <MessagesList />
      <MessageInput onSend={handleSend} />
    </div>
  );
}
