import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import timerReducer from "./timer/timerSlice";
import outlookSidebarReducer from "./outlookSidebar/outlookSidebarSlice";
import checkpointReducer from "./checkpoint/checkpointSlice";
import highlightContentReducer from "./highlightContent/highlightContentSlice";
import phishingDataReducer from "./simulationData/phishingData/phishingDataSlice";
import dashboardDataReducer from "./dashboardData/dashboardDataSlice";
import userReducer from "./user/userSlice";
import generalReducer from "./general/generalSlice";
import tryReducer from "./simulationData/phishingData/trySlice";
import simulationsReducer from "./simulations/simulationsSlice";
import moduleReducer from "./module/moduleSlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // whitelist: [
  //   "timerReducer",
  //   "tabReducer",
  //   "outlookSidebarReducer",
  //   "checkpointReducer",
  //   "highlightContentReducer",
  //   "phishingDataReducer",
  //   "dashboardDataReducer",
  //   "userReducer",
  // ],
  blacklist: ['general']
};

const combinedReducer = combineReducers({
  timer: timerReducer,
  outlookSidebar: outlookSidebarReducer,
  checkpoint: checkpointReducer,
  highlightContent: highlightContentReducer,
  phishingData: phishingDataReducer,
  dashboardData: dashboardDataReducer,
  user: userReducer,
  general: generalReducer,
  trying: tryReducer,
  simulations: simulationsReducer,
  module: moduleReducer
});

const rootReducer = (state, action) => {
  if (action.type === "user/userLogout") {
    storage.removeItem("persist:root");
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// To toggle between remembering user data or not, we can set manualPersist under config : `persistStore(store, [config, callback])`
// When user toggles "Keep me signed in" in LoginPrompt, 
// We wait for the login to go through
// If login successfully goes through, we start persistor.persist()

// Potential issues: 
// When user restarts their browser, persistor might not persist
// In that case, maybe we detect whether localstorage has the data, and if it has them, then we manually start persistence
export const persistor = persistStore(store);
