import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import appStore, { persistor } from "./store";
import { SnackbarProvider } from "notistack";
import "swiper/swiper.scss";
import "swiper/modules/pagination/pagination.scss";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/effect-fade/effect-fade.scss";

ReactDOM.render(
  <StrictMode>
    <StoreProvider store={appStore}>
      <PersistGate persistor={persistor}>
        <SnackbarProvider maxSnack={5} autoHideDuration={5000}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </SnackbarProvider>
      </PersistGate>
    </StoreProvider>
  </StrictMode>,
  document.getElementById("root")
);
