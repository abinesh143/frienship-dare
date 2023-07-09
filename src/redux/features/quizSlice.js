import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: "",
    name: "",
    quiz: {},
    score: 0,
  },
};

export const quizSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    storeUser: (state, action) => {
      state.value.name = action.payload;
    },
    storeId: (state, action) => {
      state.value.id = action.payload;
    },
    resetState: () => {
      return initialState;
    },
    setScore: (state, action) => {
      state.value.score = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeUser, storeId, resetState, setScore } = quizSlice.actions;

export default quizSlice.reducer;
