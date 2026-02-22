import type { JSX, FormEvent } from "react";

export default function MessageInput(): JSX.Element {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <textarea name="message"></textarea>
      <button type="submit">Send</button>
    </form>
  );
}
