import {
  type JSX,
  type FormEvent,
  type ChangeEvent,
  type KeyboardEvent,
  useState,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import { type RootState, type PromptProps, type ImageProps } from "../../store";

type MessageInputProps = {
  onSend: (message: PromptProps) => void;
};

export default function MessageInput({
  onSend,
}: MessageInputProps): JSX.Element {
  const { isLoading } = useSelector(
    (state: RootState) => state.chats.currentChat,
  );

  const [image, setImage] = useState<ImageProps | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [model, setModel] = useState<string>(
    localStorage.getItem("model") || "gpt-4o-mini",
  );
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      setImage({
        type: "file",
        data: base64,
        mediaType: file.type,
      });
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = () => {
    onSend({ input, image, model });
    setInput("");
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend();
  };

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
    localStorage.setItem("model", e.target.value);
  };

  const renderSelect = (): JSX.Element => {
    return (
      <select defaultValue={model} onChange={handleModelChange}>
        <option value="gpt-4o-mini">GPT-4o Mini</option>
        <option value="gpt-4o">GPT-4o</option>
        <option value="gpt-4-turbo">GPT-4 Turbo</option>
        <option value="gpt-4.1-mini">GPT-4.1 Mini</option>
        <option value="gpt-4.1-nano">GPT-4.1 Nano</option>
        <option value="gpt-4.1">GPT-4.1</option>
      </select>
    );
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
          <button
            type="button"
            className="image-preview-remove"
            onClick={handleRemoveImage}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
      <textarea
        onKeyDown={handleKeyDown}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        name="message"
        placeholder="Ask anything"
      ></textarea>
      <div className="message-input-actions">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {renderSelect()}
        <button
          type="button"
          className={`attach-btn ${image ? "attach-btn--active" : ""}`}
          onClick={() => fileInputRef.current?.click()}
          title="Attach image"
        >
          <i className="fa-solid fa-paperclip"></i>
        </button>
        <button disabled={isLoading} type="submit">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
}
