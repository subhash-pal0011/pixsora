import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       searchs: []  
};

const SearchSlice = createSlice({
       name: "search",
       initialState,  // YAHA DIRECT DEFINE KR SKTE HO initialState CHAHYYE FUNC NAME HI KAFI HII.
       reducers: {
              setSearch: (state, action) => {
                     state.searchs = action.payload;
              },
              clearSearch: (state) => {
                     state.searchs = [];
              }
       }
});
export const { setSearch, clearSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
