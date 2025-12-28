import React, { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";
import { IoMdArrowBack } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { VscSend } from "react-icons/vsc";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { setMessages , setSelectedUser } from "@/REDUX/MessageSlice";
import SenderMessage from "@/SENDER_MESSAGE/SenderMessage";
import ReceverMessage from "@/RECEVER_MESSAGE/ReceverMessage";
import { HiStatusOnline } from "react-icons/hi";
import socket from "@/socket";


const MessageArea = () => {
       const { userName } = useParams();
       const dispatch = useDispatch();
       const navigate = useNavigate();
       const { selectedUser, messages = [] } = useSelector((state) => state.message);
       const { userData } = useSelector((state) => state.user);
       const [previewPost, setPreviewPost] = useState(null);
       const [fileType, setFileType] = useState(null);
       const [loadingUser, setLoadingUser] = useState(true);
       const bottomRef = useRef(null)
       const [editingMessage, setEditingMessage] = useState(null);
       const { onlineUsers } = useSelector((state) => state.message)

       const {
              register,
              handleSubmit,
              reset,
              formState: { isSubmitting, dirtyFields },
       } = useForm();

       // JB DILTE KR RHE HOO SENDER MESSAGE FILE MEA FILTER YHA BHGI KRNA PADEGA MSG KO REAL TIME.
       useEffect(() => {
              const handleMessageDeleted = (deletedMessageId) => {
                     const updatedMessages = messages.filter(msg => msg._id !== deletedMessageId);
                     dispatch(setMessages(updatedMessages));
              };
              socket.on("messageDeleted", handleMessageDeleted);
              return () => socket.off("messageDeleted", handleMessageDeleted);
       }, [messages, dispatch]);


       //🔥 SEEN UNSEEN
       useEffect(() => {
              if (!selectedUser?._id) return;
              const seenMsg = async () => {
                     try {
                            const res = await axios.post(`https://pixsora-backend-85ol.onrender.com/api/seenmsg/${selectedUser._id}`, {},
                                   { withCredentials: true }
                            );
                            if (res.data.success) {
                                   dispatch(setMessages(res.data.updatedMessages)); //✅messages iske thrugh update ho jayega seen vala, kyuki controler mea seenmsg ko update kr de rhe hii.
                            }
                     } catch (error) {
                            console.log(error);
                            toast.error(error?.response?.data?.message)
                     }
              };
              seenMsg();
       }, [selectedUser, dispatch]);


       useEffect(() => {
              const fetchSelectedUser = async () => {
                     try {
                            if (selectedUser) {
                                   setLoadingUser(false);
                                   return;
                            }
                            const res = await axios.get(`https://pixsora-backend-85ol.onrender.com/api/profile/${userName}`, {
                                   withCredentials: true,
                            });
                            if (res.data.success) {
                                   dispatch(setSelectedUser(res.data.data));
                            }
                     } catch (error) {
                            toast.error("User load failed");
                     } finally {
                            setLoadingUser(false);
                     }
              };
              fetchSelectedUser();
       }, [userName, selectedUser, dispatch]);

       //🔥 auto scrooll
       useEffect(() => {
              if (bottomRef.current) {
                     bottomRef.current.scrollIntoView({
                            behavior: "smooth",
                     })
              }
       }, [messages])

       useEffect(() => {
              if (!selectedUser?._id) return; // 
              const getMessages = async () => {
                     try {
                            const res = await axios.get(
                                   `https://pixsora-backend-85ol.onrender.com/api/getmsg/${selectedUser._id}`,
                                   { withCredentials: true }
                            );

                            if (res.data.success) {
                                   dispatch(setMessages(res.data.messages));
                            }
                     } catch (error) {
                            toast.error("Messages load failed");
                     }
              };
              getMessages();
       }, [selectedUser?._id, dispatch]);


       const handleFileChange = (e) => {
              const file = e.target.files[0];
              if (!file) return;
              setPreviewPost(URL.createObjectURL(file));
              if (file.type.startsWith("image/")) setFileType("image");
              if (file.type.startsWith("video/")) setFileType("video");
       };


       //🔥 yE EDIT MSG KE LIYE USE EFFECT
       useEffect(() => {
              const handleMessageEdited = (updatedMsg) => {
                     const updatedMessages = messages.map(msg =>
                            msg._id === updatedMsg._id ? updatedMsg : msg
                     );
                     dispatch(setMessages(updatedMessages));
              };

              socket.on("messageEdited", handleMessageEdited);

              return () => {
                     socket.off("messageEdited", handleMessageEdited);
              };
       }, [messages, dispatch]);

       //🔥 bhai dekho ji mesg KO send kr rhe hii o message slice ke setMessage mea store ho rha hii to hum use hi socket se conect kr ke realtime kr diye. 🔥[ YE SEND MESSAGE KA USEEFFECT HII]
       useEffect(() => {
              if (!selectedUser?._id) return;

              const handleReceiveMessage = (msg) => {
                     if (msg.sender === selectedUser._id || msg.receiver === selectedUser._id) {
                            dispatch(setMessages([...messages, msg]));
                     }
              };

              socket.on("receiveMessage", handleReceiveMessage); // message chala gya to socket ko off krna padega to niche return mea off kr diye

              return () => {
                     socket.off("receiveMessage", handleReceiveMessage);
              };
       }, [selectedUser?._id, messages, dispatch]);

       const onSubmit = async (data) => {
              try {
                     // EDITED
                     if (editingMessage) {
                            const res = await axios.post(`https://pixsora-backend-85ol.onrender.com/api/editmsg/${editingMessage._id}`,
                                   { message: data.message }, { withCredentials: true }
                            );

                            if (res.data.success) {
                                   const editedMessage = res.data.data;

                                   const updated = messages.map((msg) =>
                                          msg._id === editingMessage._id ? res.data.data : msg
                                   );

                                   dispatch(setMessages(updated));
                                   socket.emit("editMessage", {
                                          sender: userData._id,
                                          receiver: selectedUser._id,
                                          updatedMessage: editedMessage,
                                   });
                                   setEditingMessage(null);
                                   reset({ message: "" });
                            }
                            return;  //🔥 return isliye kyunki niche new message ka bhi code hai
                     }

                     //NEW MSG
                     const formData = new FormData();
                     if (data.message?.trim()) {
                            formData.append("message", data.message.trim());
                     }
                     if (data.media?.length > 0) {
                            formData.append("media", data.media[0]);
                            formData.append("mediaType", fileType);
                     }
                     const res = await axios.post(
                            `https://pixsora-backend-85ol.onrender.com/api/sendmsg/${selectedUser._id}`,
                            formData,
                            { withCredentials: true }
                     );
                     if (res.data.success) {
                            dispatch(setMessages([...(messages || []), res.data.data]));

                            socket.emit("sendMessage", {  // socket se connect
                                   sender: userData._id,
                                   receiver: selectedUser._id,
                                   datas: res.data.data,
                            })

                            reset();
                            setPreviewPost(null);
                            setFileType(null);
                     }
              } catch (error) {
                     toast.error("Message send failed");
              }
       };

       const backBtn = () => {
              setPreviewPost(null)
              setFileType(null)
              reset()
       }

       if (loadingUser || !selectedUser) {
              return (
                     <div className="w-full h-screen flex items-center justify-center">
                            <ClipLoader color="white" />
                     </div>
              );
       }
       const isEdited = dirtyFields.message || dirtyFields.media;

       // DATE CREATE
       const getDateLabel = (dateString) => {
              const msgDate = new Date(dateString);
              const today = new Date();

              const isToday =
                     msgDate.toDateString() === today.toDateString();

              const yesterday = new Date();
              yesterday.setDate(today.getDate() - 1);

              const isYesterday =
                     msgDate.toDateString() === yesterday.toDateString();

              if (isToday) return "Today";
              if (isYesterday) return "Yesterday";

              return msgDate.toLocaleDateString("en-IN", {
                     day: "numeric",
                     month: "short",
                     year: "numeric",
              });
       };

       const clearChat = async () => {
              try {
                     const res = await axios.delete(`https://pixsora-backend-85ol.onrender.com/api/clearchat/${selectedUser?._id}`, {}, { withCredentials: true });
                     if (res.data.success) {
                            dispatch(setMessages([])); //ISSE HUM JO REDUX MEA MESSAGE STORE KIYE HII CLEAR KR RHE HII.
                            toast.success(res.data.message);
                     }
              } catch (error) {
                     console.log(`clear chat error : ${error}`);
                     toast.error("Clear chat failed");
              }
       };

       const isOnline = onlineUsers?.includes(selectedUser?._id);

       return (
              <div className="w-full min-h-screen bg-black pb-28">
                     <div className="fixed top-0 left-0 w-full z-50 bg-black flex items-center p-4 gap-3 border-b border-gray-800">
                            <IoMdArrowBack
                                   onClick={() => navigate("/")}
                                   size={24}
                                   className="cursor-pointer text-gray-400 hover:text-white transition-all duration-500 hover:scale-105 hidden lg:block"
                            />

                            <IoMdArrowBack
                                   onClick={() => navigate("/message")}
                                   size={24}
                                   className="cursor-pointer text-gray-400 hover:text-white transition-all duration-500 hover:scale-105 block lg:hidden "
                            />


                            <Avatar src={selectedUser.profilePic} round size="40" />
                            <div>
                                   <p className="font-bold">{selectedUser.userName}</p>
                                   {isOnline ?
                                          <p className="text-green-500"><HiStatusOnline size={20} /></p>
                                          :
                                          <p className="text-sm text-gray-400">{selectedUser.name}</p>
                                   }
                            </div>
                            <button onClick={clearChat}
                                   className="cursor-pointer text-[12px] border border-red-200 p-2 px-3 hover:bg-red-500 font-semibold rounded-full bg-gray-700 transition-all duration-500 hidden lg:block">Clear chat</button>

                     </div>

                     <div className="flex flex-col gap-2 px-4 pt-23 overflow-y-auto">
                            <div className="items-center justify-center text-center flex flex-col ">
                                   <Avatar src={selectedUser?.profilePic} round size="80" />
                                   <p className="font-semibold mt-2">{selectedUser?.name}</p>
                                   <p className="text-sm font-bold">{selectedUser?.userName}</p>
                                   <p className="text-gray-400 text-sm">
                                          Whenever you’re ready, let’s continue.
                                   </p>
                                   <button
                                          onClick={() => navigate(`/profile/${selectedUser.userName}`)}
                                          className="px-4 py-2 mt-2 rounded-xl bg-gray-800 text-sm font-semibold text-white hover:bg-gray-700 transition cursor-pointer"
                                   >
                                          View Profile
                                   </button>
                                   <button className="block sm:hidden cursor-pointer text-[12px] border border-red-200 px-3 py-2 font-semibold rounded-full  bg-red-500 transition-all duration-500 mt-1">
                                          Clear chat
                                   </button>
                            </div>

                            {/* || []  ISE LAGA SKTE HO NHI BHI OPTIONAL BEST PRECTICE KE LIYE LAGAYE HII */}
                            {(messages || []).map((msg, index) => {
                                   const currentDate = getDateLabel(msg.createdAt);
                                   const prevDate =
                                          // INDEX MTLB JITNE BHI YA DHYAN SE.
                                          index > 0 ? getDateLabel(messages[index - 1].createdAt) : null;
                                   const showDate = currentDate !== prevDate;

                                   return (
                                          <React.Fragment key={msg._id}>
                                                 {showDate && (
                                                        <div className="flex justify-center my-4">
                                                               <span className="px-4 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                                                                      {currentDate}
                                                               </span>
                                                        </div>
                                                 )}
                                                 {msg.sender === userData._id || msg.sender?._id === userData._id ? (
                                                        // <SenderMessage message={msg} />
                                                        <SenderMessage
                                                               message={msg}
                                                               onEdit={(msg) => {
                                                                      setEditingMessage(msg);
                                                                      reset({ message: msg.message }); // 👈 message isi ke trugh input me text aa jayega
                                                               }}
                                                        />
                                                 ) : (
                                                        <ReceverMessage message={msg} />
                                                 )}
                                          </React.Fragment>
                                   );
                            })}
                            <div ref={bottomRef} />
                     </div>

                     {previewPost && (
                            <div className="fixed bottom-24 w-full flex justify-center">
                                   <IoMdArrowBack
                                          onClick={backBtn}
                                          size={25}
                                          className="cursor-pointer text-gray-400 hover:text-white transition-all duration-500 hover:scale-105"
                                   />
                                   {fileType === "image" && (
                                          <img src={previewPost} className="max-h-60 rounded" />
                                   )}
                                   {fileType === "video" && (
                                          <video src={previewPost} controls className="max-h-60 rounded" />
                                   )}
                            </div>
                     )}

                     <div className="fixed bottom-5 left-0 w-full px-3">
                            <form onSubmit={handleSubmit(onSubmit)} className="relative">
                                   <label
                                          htmlFor="media"
                                          className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                   >
                                          <CiImageOn size={22} />
                                   </label>

                                   <input
                                          type="file"
                                          id="media"
                                          className="hidden"
                                          accept="image/*,video/*"
                                          {...register("media", { onChange: handleFileChange })}
                                   />
                                   <input
                                          type="text"
                                          placeholder="Message..."
                                          {...register("message")}
                                          className="w-full rounded-3xl px-12 py-3 pr-12 bg-black border border-gray-700 outline-none"
                                   />

                                   {isEdited && (
                                          <button
                                                 type="submit"
                                                 disabled={isSubmitting}
                                                 className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                                          >
                                                 {isSubmitting ? (
                                                        <ClipLoader size={20} color="white" />
                                                 ) : (
                                                        <VscSend size={20} />
                                                 )}
                                          </button>
                                   )}
                            </form>
                     </div>
              </div>
       );
};
export default MessageArea;
