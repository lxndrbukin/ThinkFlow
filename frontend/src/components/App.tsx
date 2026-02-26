import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import ChatsList from "./ChatsList/ChatsList";

export default function App(): JSX.Element {
  return (
    <div className="container">
      <ChatsList />
      <Outlet />
    </div>
  );
}
