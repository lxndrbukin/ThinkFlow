import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";
import Home from "../components/Home/Home";
import ChatWindow from "../components/ChatWindow/ChatWindow";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/chat/:chatId",
        element: <ChatWindow />,
      },
    ],
  },
]);
