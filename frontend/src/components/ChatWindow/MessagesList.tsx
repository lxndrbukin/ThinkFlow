import { type JSX, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { type RootState, type MessageProps } from "../../store";
import Message from "./Message";

export default function MessagesList(): JSX.Element {
  const { messages, isLoading } = useSelector((state: RootState) => state.chat);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  return (
    <div className="messages-list">
      {renderMessages(messages)}
      {isLoading && (
        <div className="message-loading">
          <span />
          <span />
          <span />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
