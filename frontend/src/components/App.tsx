import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav/SideNav";

export default function App(): JSX.Element {
  return (
    <div className="container">
      <SideNav />
      <Outlet />
    </div>
  );
}
