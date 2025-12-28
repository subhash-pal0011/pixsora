import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import {setNotification } from "@/REDUX/getNotiCountSlice";
import socket from "@/socket";

const Notification = () => {
       const navigate = useNavigate();
       const [notification, setNotifications] = useState([])
       const [loading, setLoading] = useState(true);
       const dispatch = useDispatch()


       useEffect(() => {
              const handleNewNotification = (notification) => {

                     // Agar chahte ho ki list update ho
                     setNotifications(prev => [notification, ...prev]);
              }

              socket.on("newNotification", handleNewNotification);

              return () => {
                     socket.off("newNotification", handleNewNotification);
              }
       }, []);


       useEffect(() => {
              const getAllNotification = async () => {
                     try {
                            const res = await axios.get("/api/getAllNotification", {
                                   withCredentials: true,
                            });

                            if (res.data.success) {
                                   setNotifications(res.data.data);
                            }

                            await axios.put("/api/markAllReadNotification", {}, { withCredentials: true });

                            // 🔥 ISSE REDUX COUNT = 0, REDUX KE UNDER HI NA COUNT KO STORE KRA RHE HII TO USE 0 BANA DIYA.
                            dispatch(setNotification(0))
                     }
                     catch (error) {
                            console.log("error for getNotification :", error);
                     }
                     finally {
                            setLoading(false);
                     }
              };
              getAllNotification();
       }, []);



       return (
              <div className="h-screen w-full">

                     <div className="relative md:flex  items-center h-14 border-b border-gray-600 px-5">

                            <IoMdArrowBack size={30} onClick={() => navigate("/")}
                                   className="cursor-pointer text-gray-500 hover:text-white transition-all duration-500 hover:scale-110"
                            />

                            <p className="absolute left-1/2 -translate-x-1/2 font-semibold text-lg">
                                   Notification
                            </p>
                     </div>

                     <div className="p-3 sm:p-4 space-y-3">
                            {loading && (
                                   <p className="text-center text-gray-400 mt-6">
                                          Loading...
                                   </p>
                            )}

                            {!loading && notification.length === 0 && (
                                   <p className="text-center text-gray-400 mt-6">
                                          No notifications yet
                                   </p>
                            )}

                            {!loading &&
                                   notification.map((noti) => (
                                          <div
                                                 key={noti._id}
                                                 className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                                          >
                                                 <Avatar
                                                        src={noti.sender?.profilePic || "empty-img.jpg"}
                                                        name={noti.sender?.userNAme}
                                                        round
                                                        size={window.innerWidth < 640 ? "38" : "45"}
                                                 />

                                                 <div className="flex-1">
                                                        <p className="text-sm sm:text-base leading-snug">
                                                               <span className="font-semibold">
                                                                      {noti.sender?.userName}
                                                               </span>{" "}
                                                               {noti.message}
                                                        </p>
                                                        <span className="text-xs text-gray-400">
                                                               {new Date(noti.createdAt).toLocaleString()}
                                                        </span>
                                                 </div>
                                                 {noti.post?.media && (
                                                        <img
                                                               src={noti.post.media}
                                                               alt="Post"
                                                               className="h-15 w-15 rounded-full sm:h-20 sm:w-24 sm:rounded-lg object-cover flex-shrink-0"
                                                        />
                                                 )}
                                          </div>
                                   ))
                            }

                     </div>
              </div>
       );
};

export default Notification;
