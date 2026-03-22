import { type JSX, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState, getMe } from "../store";
import SideNav from "./SideNav/SideNav";

export default function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getMe());
    }
  }, []);

  return (
    <div className="container">
      {user ? <SideNav /> : <div />}
      <Outlet />
    </div>
  );
}
