import { type JSX, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  type AppDispatch,
  type RootState,
  type ChatResponse,
  getChats,
} from "../../store";

export default function ChatsList(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const { list } = useSelector((state: RootState) => state.chats);

  useEffect(() => {
    dispatch(getChats());
  }, []);

  const renderChatsList = (chats: Array<ChatResponse>) => {
    return chats.map((chat: ChatResponse) => {
      return <li key={chat.id}>{chat.title}</li>;
    });
  };

  return (
    <div>
      <ul>{renderChatsList(list)}</ul>
    </div>
  );
}
