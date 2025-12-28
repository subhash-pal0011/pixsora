import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './HOME/Home'
import Signup from './SIGNUP/Signup'
import Login from './LOGIN/Login'
import ForgotPassword from './FORGOT_PASSWORD/ForgotPassword'

// redux se data lene ke liye ye hook use krenge.
import { useDispatch, useSelector } from 'react-redux'
import GetProfile from './GET_PROFILE/GetProfile'
import useCurrentUser from './CURRENTUSER/CurentUser'
import Search from './SEARCH/Search'
import EditProfile from './EDIT_PROFILE/EditProfile'
import Reels from './REELS/Reels'
import ViewStory from './VIEW_STORY/ViewStory'
import Message from './MESSAGE_SECTION/Message'
import MessageArea from './MESSAGE_PROFILE/MessageArea'
import GetConversation from './GET_CONVERSATION/GetConversation'
import socket from './socket'
import { setOnLineUser } from './REDUX/SocketIo'
import Notification from './NOTIFICATION/Notification'
import GetAllNotiCount from './GET_ALL_NOTIFICATION_COUNT/GetAllNotification'
import { setOnlineUsers } from './REDUX/MessageSlice'
import Verification from './VERIFY_EMAL/Verification'


const App = () => {

  // JO COUSTOM HOOK PE KOI CHIJ RHTA HII USE CALL KRNA PADTA HII JO KI HUMNE COUSTOM HOOK NAME LIK NHI BANA BAD MEA SHI KR LENGE.
  useCurrentUser()  // JB JB REDUX SE DATA PAGE KO REFRACE  KRNE PR HATEGA TB TB CurentUser()  YE FUNCTION CALL HOGA.

  GetConversation()

  GetAllNotiCount()

  const { userData} = useSelector(state => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!userData) return;

    // ✅ SOCKET CONNECT.
    socket.connect();

    // ✅ backend ko batao kaun online hai
    socket.emit("onlineUser", userData._id);

    // ✅ online users receive
    socket.on("onlineUsers", (users) => {
      dispatch(setOnlineUsers(users)); // isi ke thrugh hum online ka icon dikha rhe hii.
      dispatch(setOnLineUser(users)) // iske thrigh hum online user dikha rhe hii.
    });

    return () => {
      socket.off("onlineUsers");
      socket.disconnect(); // logout pr disconnect ok.
    };
  }, [userData]);

  return (
    <>
      <Routes>

        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/signup"
          element={userData ? <Navigate to="/" /> : <Signup />}
        />

        <Route
          path="/Account/verification"
          element={!userData ? <Verification /> : <Navigate to="/signup" />}
        />

        <Route
          path="/login"
          element={userData ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/forgot/password"
          element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
        />

        <Route path='/profile/:userName'
          element={userData ? <GetProfile /> : <Navigate to="/login" />}
        />

        <Route path='/search'
          element={userData ? <Search /> : <Navigate to="/login" />}
        />

        <Route path='/editProfile'
          element={userData ? <EditProfile /> : <Navigate to="/login" />}
        />
        <Route path='/reels'
          element={userData ? <Reels /> : <Navigate to="/login" />}
        />

        <Route path='/view/story/:userName'
          element={userData ? <ViewStory /> : <Navigate to="/login" />}
        />

        <Route path='/message' element={userData ? <Message /> : <Navigate to="/login"/>}/>

        <Route path='/message/:userName' element={userData ? <MessageArea /> : <Navigate to="/login"/> } />

        <Route path='/notification' element={userData ? <Notification /> :<Navigate to="/login"/> } />
      </Routes>
    </>
  )
}
export default App
