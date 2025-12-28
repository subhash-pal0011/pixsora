import { configureStore } from "@reduxjs/toolkit";
import MessageSlice from "./MessageSlice"
import SocketSlice from "./SocketIo";
import UploadSlice from "./UplodSlice"
import SearchSlice from "./SearchSlice"
import getNotiCountSlice from "./getNotiCountSlice"
import UserSlice from "./UserSlice"
//     UserSlice ISKA KOI BHI NAME RKH SKTE HII.


export const Store = configureStore({
       reducer: {
              // jb data lena rhega to use hoga ye (user) kevl.
              user: UserSlice,
              uplod: UploadSlice,
              message: MessageSlice,
              socket: SocketSlice,
              search: SearchSlice,
              notificationCount : getNotiCountSlice
       }
})
