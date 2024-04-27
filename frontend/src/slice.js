import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 5,
};

const counter = createSlice({
  name: "countter",
  initialState: initialState,
  reducers: {
    addone: (state) => {
      state.value += 1;
    },
    minuson: (state) => {
      state.value -= 1;
    },
  },
});
export const {addone,minuson}=counter.actions;
export default counter.reducer;