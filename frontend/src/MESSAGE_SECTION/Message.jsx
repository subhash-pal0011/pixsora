import React, { useRef } from "react";
import OnlineUser from "@/ONLINE_USERS/OnlineUSer";
import { IoMdArrowBack } from "react-icons/io";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { setSelectedUser } from "@/REDUX/MessageSlice";

const Message = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user);
  const { onlineUser } = useSelector((state) => state.socket);
  const { getConversationUser, message } = useSelector((state) => state.message)

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full text-white">

      <div className="w-full p-5 flex items-center gap-2">
        <IoMdArrowBack
          onClick={() => navigate("/")}
          size={25}
          className="cursor-pointer text-gray-400 hover:text-white transition-all duration-300 block md:hidden"
        />
        <p className="text-md font-semibold text-gray-300">OnlineUsers</p>
      </div>

      <div className="relative flex items-center">
        {onlineUser.length > 3 &&
          <button
            onClick={scrollLeft}
            className="absolute left-2 z-10 p-1 bg-transparent rounded-full hover:bg-gray-700 transition"
          >
            <IoIosArrowBack size={24} />
          </button>
        }
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-12 py-2"
        >
          {userData?.following?.map((user) => {
            if (onlineUser?.includes(user?._id)) {
              return <OnlineUser key={user._id} user={user} />;
            }
            return null;
          })}
        </div>

        {onlineUser.length > 3 &&
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 p-1 bg-transparent rounded-full hover:bg-gray-700 transition"
          >
            <IoIosArrowForward size={24} />
          </button>
        }
      </div>
      <div className="w-full h-[0.5px] bg-gray-700 rounded-full mt-1"></div>

      <div className="flex flex-col">
        <p className="font-semibold text-sm text-gray-400 px-3 p-1">Chet users</p>
        {getConversationUser.map((user) => (
          <div
            onClick={() => {
              dispatch(setSelectedUser(user))
              navigate(`/message/${user.userName}`)
            }}
            key={user._id}
            className="p-3 flex items-center gap-3 hover:bg-gray-800 cursor-pointer transition"
          >

            <div className="flex items-center gap-1">
              <Avatar src={user.profilePic || "/empty-img.jpg"} round size="50" />
              <div>
                <p className="text-sm ">
                  {user.userName}
                </p>
                <div className="text-xs text-gray-400 flex items-center gap-1 w-full overflow-hidden">
                  <p className="truncate md:max-w-[28%]">
                    {user.lastMessage?.message ||
                      (user.lastMessage?.media ? "📷 Media" : "No messages")}
                  </p>

                  <p className="shrink-0">
                    {user.lastMessage
                      ? new Date(user.lastMessage.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      : ""}
                  </p>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;


