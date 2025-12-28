import { createSlice } from "@reduxjs/toolkit";

const UploadSlice = createSlice({
       name: "post",
       initialState: {
              post: null,
       },
       reducers: {
              setPost: (state, action) => {
                     state.post = action.payload;
              },
       },
});

export const { setPost} = UploadSlice.actions;
export default UploadSlice.reducer;
