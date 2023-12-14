import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface InitialStateProps {
  userId: number;
}

const initialState: InitialStateProps = {
  userId: -1,
};

const globalSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    updateUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
  },
});

export const { updateUserId } = globalSlice.actions;

// NOTE: Selectors
export const selectUserId = (state: RootState) => state.global.userId;

// NOTE: Reducer
const globalReducer = globalSlice.reducer;

export default globalReducer;
