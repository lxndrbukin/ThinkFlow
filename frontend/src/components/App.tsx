import { type JSX, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { type AppDispatch, getMe } from "../store";
import SideNav from "./SideNav/SideNav";

export default function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getMe());
    }
  }, []);

  return (
    <div className="container">
      <SideNav />
      <Outlet />
    </div>
  );
}
