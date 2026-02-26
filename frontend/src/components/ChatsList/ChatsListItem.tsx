import { type JSX, useState } from "react";
import { useDispatch } from "react-redux";
import { type ChatResponse, type AppDispatch, deleteChat } from "../../store";

export default function ChatsListItem({
  id,
  title,
}: ChatResponse): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseOver = () => {
    setMouseOver(!mouseOver);
  };

  return (
    <li
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOver}
      className="sidenav-item"
    >
      <span>{title}</span>
      {mouseOver && (
        <i
          className="fa-solid fa-trash-can"
          onClick={() => dispatch(deleteChat(id))}
        ></i>
      )}
    </li>
  );
}
