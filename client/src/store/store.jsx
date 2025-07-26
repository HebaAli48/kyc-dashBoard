import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import loadingReducer from "./slices/loadingSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["auth/updateUser/fulfilled"],
        // Or ignore these paths in the state
        // ignoredPaths: ["auth.user.birthdate"], // Adjust according to your needs
      },
    }),
});

export default store;
