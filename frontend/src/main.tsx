import { createRoot } from "react-dom/client";
import App from "./components/App";

const rootDiv = document.querySelector("#root");

if (rootDiv) {
  createRoot(rootDiv).render(<App />);
}
