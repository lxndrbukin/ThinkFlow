import type { JSX } from "react";
import { useSelector } from "react-redux";
import { type RootState, type MessageProps } from "../../store";
import Message from "./Message";

export default function MessagesList(): JSX.Element {
  const { messages } = useSelector((state: RootState) => state.chat);

  const renderMessages = (
    messages: Array<MessageProps>,
  ): Array<JSX.Element> => {
    return messages
      .filter(
        (message: MessageProps) =>
          (message.role === "user" || message.role === "assistant") &&
          message.content,
      )
      .map((message: MessageProps, idx) => {
        return <Message key={idx} {...message} />;
      });
  };

  return <div className="messages-list">{renderMessages(messages)}</div>;
}
