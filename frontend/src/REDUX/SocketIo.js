import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
       name: "socket",
       initialState: {
              onlineUser: [],   // array hona chahiye
       },
       reducers: {
              setOnLineUser: (state, action) => {
                     state.onlineUser = action.payload;
              },
              
       },
});

export const { setOnLineUser} = socketSlice.actions;
export default socketSlice.reducer;
