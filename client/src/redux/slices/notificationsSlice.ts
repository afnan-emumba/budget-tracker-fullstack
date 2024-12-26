import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface Notification {
  id: number;
  userId: number;
  type: "add" | "delete" | "update";
  message: string;
  timestamp: number;
  icon: string;
  expenseTitle: string;
}

interface NotificationsState {
  notifications: Notification[];
  hasNewNotifications: boolean;
}

const initialState: NotificationsState = {
  notifications: [],
  hasNewNotifications: false,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
      state.hasNewNotifications = true;
    },
    deleteNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotificationsForUser: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.userId !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.hasNewNotifications = false;
    },
    markNotificationsAsRead: (state) => {
      state.hasNewNotifications = false;
    },
  },
});

const persistConfig = {
  key: "notifications",
  storage,
};

const persistedNotificationsReducer = persistReducer(
  persistConfig,
  notificationsSlice.reducer
);

export const {
  addNotification,
  deleteNotification,
  clearNotificationsForUser,
  clearAllNotifications,
  markNotificationsAsRead,
} = notificationsSlice.actions;
export default persistedNotificationsReducer;
