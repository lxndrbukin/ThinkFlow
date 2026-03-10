import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";
import Home from "../components/Home/Home";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <Home /> },
          { path: "chat/:chatId", element: <ChatWindow /> },
        ],
      },
    ],
  },
]);
