import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import App from "./App.tsx";
import "./css/reset.css";
import "./css/index.css";
const app = (
   <Provider store={store}>
      <App />
   </Provider>
);
ReactDOM.createRoot(document.getElementById("root")!).render(app);
