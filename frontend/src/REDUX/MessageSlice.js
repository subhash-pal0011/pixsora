import { createSlice } from "@reduxjs/toolkit";

const MessageSlice = createSlice({
       name: "message",
       initialState: {
              selectedUser: null,
              messages: [],
              getConversationUser: [],
              onlineUsers: []
       },
       reducers: {
              setSelectedUser: (state, action) => {
                     state.selectedUser = action.payload;
              },
              setMessages: (state, action) => {
                     state.messages = action.payload;
              },
              clearChat: (state) => {  // IS LIYE JARURT PADI KYUKI JO ONLINE USER THE UN PR CLIK KRE PR OLD USER KE PROFILE KHUL RHE THE IS LIYE CLEAR KRNA PADA.
                     state.messages = [];
              },
              setGetConversationUser: (state, action) => {
                     state.getConversationUser = action.payload || [];
              },
              setOnlineUsers: (state, action) => {
                     state.onlineUsers = action.payload;
              }

       },
});

export const { setSelectedUser, setMessages, clearChat, setGetConversationUser , setOnlineUsers} = MessageSlice.actions;


export default MessageSlice.reducer;
