import { type JSX } from "react";
import { type ChatResponse } from "../../store";
import ChatsListItem from "./ChatsListItem";

type ChatsListProps = {
  list: Array<{ id: number; title: string; created_at: Date }>;
};

export default function ChatsList({ list }: ChatsListProps): JSX.Element {
  const renderChatsList = (chats: Array<ChatResponse>) => {
    return chats.map((chat: ChatResponse) => {
      return <ChatsListItem key={chat.id} {...chat} />;
    });
  };

  return <ul className="sidenav-items">{renderChatsList(list)}</ul>;
}
