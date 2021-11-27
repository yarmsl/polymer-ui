import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import reportWebVitals from "./reportWebVitals";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import appStore, { persistor } from "./store";
import { SnackbarProvider } from "notistack";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/effect-fade/effect-fade.min.css";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={appStore}>
      <PersistGate persistor={persistor}>
        <SnackbarProvider maxSnack={5} autoHideDuration={5000}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </SnackbarProvider>
      </PersistGate>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
