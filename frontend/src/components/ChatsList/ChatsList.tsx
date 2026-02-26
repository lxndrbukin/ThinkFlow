import { type JSX, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  type AppDispatch,
  type RootState,
  type ChatResponse,
  getChats,
} from "../../store";
import ChatsListItem from "./ChatsListItem";

export default function ChatsList(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.chats);

  useEffect(() => {
    dispatch(getChats());
  }, []);

  const renderChatsList = (chats: Array<ChatResponse>) => {
    return chats.map((chat: ChatResponse) => {
      return <ChatsListItem {...chat} />;
    });
  };

  return (
    <div className="sidenav">
      <div className="logo">
        <i className="fa-solid fa-brain"></i>
      </div>
      <ul className="sidenav-items">{renderChatsList(list)}</ul>
    </div>
  );
}
