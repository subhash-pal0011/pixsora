import { clearChat , setSelectedUser } from "@/REDUX/MessageSlice";
import React from "react";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OnlineUser = ({ user }) => {
  if (!user) return null;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handelClik = ()=>{
    dispatch(setSelectedUser(user)) // 🔥 hum selected user mea set kr denge ji user ko clik kr rhe hii.
    dispatch(clearChat()) // 🔥 OLD CHAT CLEAR
    navigate(`/message/${user.userName}`)
  }

  return (
    <div className="w-[70px] flex flex-col items-center">
      <div className="relative cursor-pointer" onClick={handelClik}>
        <Avatar src={user?.profilePic || "/empty-img.jpg"} round size="50" />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
      </div>
      <p className="text-[12px] text-center truncate w-full">{user?.userName}</p>
    </div>
  );
};

export default OnlineUser;

