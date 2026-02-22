import type { JSX } from "react";
import type { MessageProps } from "../../store";

export default function Message({ role, content }: MessageProps): JSX.Element {
  return (
    <div className="message">
      <span className={`message-role-${role}`}>{role}</span>
      <div className="message-content">{content}</div>
    </div>
  );
}
