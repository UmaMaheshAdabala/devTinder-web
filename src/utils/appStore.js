import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import ConnectionsReducer from "../utils/connectionsSlice";
import requestReducer from "./requestsSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: ConnectionsReducer,
    requests: requestReducer,
  },
});

export default appStore;
