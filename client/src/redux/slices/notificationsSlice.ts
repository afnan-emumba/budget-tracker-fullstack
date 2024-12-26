import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const {
  addNotification,
  deleteNotification,
  clearNotificationsForUser,
  clearAllNotifications,
  markNotificationsAsRead,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
