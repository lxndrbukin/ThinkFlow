import type { JSX } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { MessageProps } from "../../store";

export default function Message({ role, content }: MessageProps): JSX.Element {
  const returnContent = (content: string | Array<any>) => {
    if (typeof content === "string") return content;
    const textBlock = content.find((block) => block.type === "text");
    return textBlock ? textBlock.text : "";
  };

  return (
    <div className="message">
      <span className={`message-role-${role}`}>{role}</span>
      <div className="message-content">
        <ReactMarkdown
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className}>{children}</code>
              );
            },
          }}
        >
          {returnContent(content)}
        </ReactMarkdown>
      </div>
    </div>
  );
}
