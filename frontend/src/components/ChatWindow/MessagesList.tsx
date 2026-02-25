import { type JSX, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { type RootState, type MessageProps } from "../../store";
import Message from "./Message";

export default function MessagesList(): JSX.Element {
  const { messages, isLoading, streamingContent } = useSelector(
    (state: RootState) => state.chats.currentChat,
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, streamingContent]);

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

  const renderEmptyMessage = (): JSX.Element => {
    return (
      <div className="messages-empty">
        <h2>How can I help?</h2>
        <p>Ask me anything</p>
      </div>
    );
  };

  return (
    <div className="messages-list">
      {renderMessages(messages)}

      {messages.length === 1 &&
        messages[0].role == "system" &&
        !isLoading &&
        renderEmptyMessage()}
      {isLoading && !streamingContent && (
        <div className="message-loading">
          <span />
          <span />
          <span />
        </div>
      )}
      {streamingContent && (
        <Message role="assistant" content={streamingContent} />
      )}
      <div ref={bottomRef} />
    </div>
  );
}
