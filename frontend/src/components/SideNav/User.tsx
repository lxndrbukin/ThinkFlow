import { type JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch, logout } from "../../store";

export default function User(): JSX.Element {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [popup, showPopup] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const renderPopup = (): JSX.Element => {
    return (
      <div className="sidenav-user-popup">
        <ul>
          <li onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="sidenav-user-container">
      {popup && renderPopup()}
      <div onClick={() => showPopup(!popup)} className="sidenav-user">
        <i className="fa-solid fa-circle-user"></i>
        <span>{user?.username}</span>
      </div>
    </div>
  );
}
