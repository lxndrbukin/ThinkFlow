import { type JSX, useEffect, useState } from "react";
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

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    dispatch(getChats());
  }, []);

  const renderChatsList = (chats: Array<ChatResponse>) => {
    return chats.map((chat: ChatResponse) => {
      return <ChatsListItem key={chat.id} {...chat} />;
    });
  };

  return (
    <div className={`sidenav ${showNav ? "" : "sidenav--collapsed"}`}>
      <div className="sidenav-top">
        <div className="logo">
          <i className="fa-solid fa-brain"></i>
        </div>
        <i
          id="nav-toggle"
          onClick={() => setShowNav(!showNav)}
          className={`fa-solid fa-angles-${showNav ? "left" : "right"}`}
        ></i>
      </div>
      <ul className="sidenav-items">{renderChatsList(list)}</ul>
    </div>
  );
}
