import "./assets/styles.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./components/App";

const rootDiv = document.querySelector("#root");

if (rootDiv) {
  createRoot(rootDiv).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
