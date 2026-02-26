import "./assets/styles.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

const rootDiv = document.querySelector("#root");

if (rootDiv) {
  createRoot(rootDiv).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
}
