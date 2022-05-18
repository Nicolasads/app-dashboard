import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./components/Loading";
import { persistor, store } from "./features/store/store";
import Routes from "./routes/routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
