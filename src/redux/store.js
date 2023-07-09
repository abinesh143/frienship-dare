import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./features/quizSlice";

export const store = configureStore({
  reducer: {
    quizReducer,
  },
});
