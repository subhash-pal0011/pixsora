import React, { useEffect, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/REDUX/MessageSlice";
import { SiTicktick } from "react-icons/si";
import socket from "@/socket";

const SenderMessage = ({ message, onEdit }) => {
       const videoRef = useRef(null)
       const dispatch = useDispatch()
       const { messages } = useSelector((state) => state.message);

       // video ke liye
       useEffect(() => {
              if (!videoRef.current) return
              const observer = new IntersectionObserver(
                     (entery) => {
                            if (!entery.isIntersecting) {
                                   videoRef.current.pause()  // jese hi screen se bahar vese hi push ho jayega yani band.
                            }
                     },
                     {
                            threshold: 0.5  //mtlb 50%  dikhna chhaiye jb tk 40% dikhega tb tk video on rhega nhi to band ho jayega
                     }
              )
              observer.observe(videoRef.current);
              return () => {
                     observer.disconnect();
              };
       }, [])

       const formatTime = (date) => {
              return new Date(date).toLocaleTimeString("en-IN", {
                     hour: "2-digit",
                     minute: "2-digit",
                     hour12: true,
              });
       };

       // 🔥 DELETE MSG KA USEEFECT.
       useEffect(() => {
              const handleMessageDeleted = (deletedMessageId) => {
                     dispatch(setMessages(prevMessages => prevMessages.filter(msg => msg._id !== deletedMessageId)));
              };
              socket.on("messageDeleted", handleMessageDeleted);
              return () => socket.off("messageDeleted", handleMessageDeleted);
       }, [dispatch]);


       const deleteMsg = async () => {
              try {
                     const res = await axios.delete(`/api/deletemsg/${message._id}`,{ withCredentials: true});

                     if (res.data.success) {
                            dispatch(setMessages(
                                   messages.filter(msg => msg._id !== message._id)
                            ));

                            socket.emit("deleteMessage", {
                                   sender: message.sender,
                                   receiver: message.receiver,
                                   deletedMessageId: message._id,
                            });

                     }
              } catch (error) {
                     toast.error("Delete failed");
              }
       };

       return (
              <div className="w-full flex justify-end mb-3 ">
                     <MdDeleteOutline onClick={deleteMsg}
                            size={18} className="hover:text-red-500 cursor-pointer md:opacity-0 md:hover:opacity-100 md:transition-all md:duration-300 text-center items-center" />
                     <div
                            className="bg-blue-500 text-white px-2 py-1 mr-5 rounded-lg
                            rounded-br-none max-w-md min-w-[50px] rounded-tl-none"
                     >
                            {message?.media && message?.mediaType === "image" && (
                                   <>
                                          <img src={message.media} alt="img" className="mb-2 rounded-sm md:max-h-60 max-h-30 object-cover" />
                                          <p className="text-[10px] text-white/70 text-right flex items-center">
                                                 {formatTime(message.createdAt)}
                                                 {message.seen && <SiTicktick />}
                                          </p>
                                   </>
                            )}
                            {message?.media && message?.mediaType === "video" && (
                                   <>
                                          <video ref={videoRef} src={message.media} controls className="max-h-60" />
                                          <p className="text-[10px] text-white/70 text-right flex items-center">
                                                 {formatTime(message.createdAt)}
                                                 {message.seen && <SiTicktick />}
                                          </p>
                                   </>
                            )}
                            {message?.message && (
                                   <>
                                          <p className="text-sm font-bold group">{message.message}</p>
                                          <div className="text-[10px] text-white/70 text-right flex items-center justify-between mt-1">
                                                 {formatTime(message.createdAt)}
                                                 {message.seen && <SiTicktick />}
                                                 <CiEdit
                                                        size={18}
                                                        className="text-white cursor-pointer hover:scale-150 transition-all duration-500"
                                                        onClick={() => onEdit(message)}
                                                 />
                                          </div>
                                   </>
                            )}

                     </div>
              </div>
       );
};
export default SenderMessage;

