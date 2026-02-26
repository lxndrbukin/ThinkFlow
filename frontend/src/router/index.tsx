import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";
import ChatWindow from "../components/ChatWindow/ChatWindow";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <>Placeholder</> },
      {
        path: "/chat/:chatId",
        element: <ChatWindow />,
      },
    ],
  },
]);
