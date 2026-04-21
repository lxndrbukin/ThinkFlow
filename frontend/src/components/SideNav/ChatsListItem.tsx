import { type JSX, type MouseEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { type ChatResponse, type AppDispatch, deleteChat } from '../../store';

export default function ChatsListItem({
  id,
  title,
}: ChatResponse): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [mouseOver, setMouseOver] = useState(false);

  const { chatId } = useParams();

  const handleMouseOver = () => {
    setMouseOver(!mouseOver);
  };

  const handleDelete = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (window.confirm('Delete chat history?')) {
      dispatch(deleteChat(id));
    }
  };

  return (
    <li
      onClick={() => navigate(`/chat/${id}`)}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOver}
      className={`sidenav-item ${Number(chatId) === id ? 'active' : ''}`}
    >
      <span>{title}</span>
      {mouseOver && (
        <i className='fa-solid fa-trash-can' onClick={handleDelete}></i>
      )}
    </li>
  );
}
