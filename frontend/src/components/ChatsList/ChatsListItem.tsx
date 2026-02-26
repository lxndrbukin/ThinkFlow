import { type JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { type ChatResponse, type AppDispatch, deleteChat } from "../../store";

export default function ChatsListItem({
  id,
  title,
}: ChatResponse): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseOver = () => {
    setMouseOver(!mouseOver);
  };

  return (
    <li
      onClick={() => navigate(`/chat/${id}`)}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOver}
      className="sidenav-item"
    >
      <span>{title}</span>
      {mouseOver && (
        <i
          className="fa-solid fa-trash-can"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteChat(id));
          }}
        ></i>
      )}
    </li>
  );
}
