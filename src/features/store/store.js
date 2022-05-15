import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "../slicer/appSlice";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  app: appReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistorReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistorReducer,
  middleware: [thunk],
});
