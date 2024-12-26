import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./slices/usersSlice";
import expensesReducer from "./slices/expensesSlice";
import notificationsReducer from "./slices/notificationsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  expenses: expensesReducer,
  notifications: notificationsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
