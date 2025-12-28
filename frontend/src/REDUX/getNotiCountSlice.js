import { createSlice } from "@reduxjs/toolkit";

const getNotiCountSlice = createSlice({
       name: "notificationCount",
       initialState: {
              notification: 0,
       },
       reducers: {
              setNotification: (state, action) => {
                     state.notification = action.payload;
              },
             
       },
});

export const { setNotification } = getNotiCountSlice.actions;
export default getNotiCountSlice.reducer;
