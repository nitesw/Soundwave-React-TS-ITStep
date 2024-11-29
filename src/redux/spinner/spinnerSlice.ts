import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SpinnerState {
  spinning: boolean;
}
const initialState: SpinnerState = {
  spinning: false,
};

export const spinnerSlice = createSlice({
  name: "spinner",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSpinner: (state, action: PayloadAction<boolean>) => {
      state.spinning = action.payload;
    },
  },
});

export const { setSpinner } = spinnerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSpinner = (state: RootState) => state.spinner.spinning;

export default spinnerSlice.reducer;
