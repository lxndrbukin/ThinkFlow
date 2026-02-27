import { type JSX, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState, getChats } from "../../store";
import ChatsList from "./ChatsList";

export default function SideNav(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.chats);

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    dispatch(getChats());
  }, []);

  return (
    <div
      className={`sidenav ${showNav ? "" : "sidenav--collapsed"}`}
      onClick={() => {
        if (!showNav) setShowNav(true);
        return;
      }}
    >
      <div className="sidenav-top">
        <Link to="/" className="logo">
          ThinkFlow
        </Link>
        <i
          id="nav-toggle"
          onClick={() => setShowNav(!showNav)}
          className={`fa-solid fa-angles-${showNav ? "left" : "right"}`}
        ></i>
      </div>
      <ChatsList list={list} />
    </div>
  );
}
