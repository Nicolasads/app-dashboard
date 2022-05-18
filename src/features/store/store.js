import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import appReducer from "../slicer/appSlice";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  app: appReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistorReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistorReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
