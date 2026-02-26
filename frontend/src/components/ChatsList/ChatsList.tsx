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
      return <ChatsListItem {...chat} />;
    });
  };

  return (
    <div className="sidenav" style={{ width: !showNav ? "60px" : "250px" }}>
      <i
        id="nav-toggle"
        style={{ justifySelf: !showNav ? "center" : "end" }}
        onClick={() => setShowNav(!showNav)}
        className="fa-solid fa-bars"
      ></i>
      <div style={{ display: !showNav ? "none" : "block" }} className="logo">
        <i className="fa-solid fa-brain"></i>
      </div>
      <ul
        style={{ display: !showNav ? "none" : "block" }}
        className="sidenav-items"
      >
        {renderChatsList(list)}
      </ul>
    </div>
  );
}
