import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { PiShareFat } from "react-icons/pi";
import { useSelector } from "react-redux";
import { ReelsCommentDailog } from "@/ALL_COOMENT_DAILOG/ReelsCommentDailog";
import FollowUnfollow from "@/FOLLOW_UNFOLLOW/FollowUnfollow";
import { DeleteReels } from "@/ALL_DELETE/DeleteReels";

const Reels = () => {
       const navigate = useNavigate();
       const [reels, setReels] = useState([]);
       const videoRefs = useRef([]);
       const { userData } = useSelector((state) => state.user)

       useEffect(() => {
              const getAllReels = async () => {
                     try {
                            const res = await axios.get("https://pixsora-backend-85ol.onrender.com/api/getReels", { withCredentials: true });

                            if (res.data.success) {
                                   setReels(res.data.data);
                            } else {
                                   toast.error("Failed to load reels");
                            }
                     } catch (error) {
                            toast.error(error.response?.data?.message);
                     }
              };

              getAllReels();
       }, []);

       const likeReels = async (reelsId) => {
              try {
                     setReels((prev) =>
                            prev.map((item) =>
                                   //                                agr like mea user include hii to   ? 
                                   item._id === reelsId ? {
                                          ...item, like: item.like.includes(userData._id) ?
                                                 //  item ko filter krke dislike krva do      : verna like hi rhen do
                                                 item.like.filter((id) => id !== userData._id) : [...item.like, userData._id]
                                   } : item
                            )
                     );
                     // backend me request
                     const res = await axios.post(`https://pixsora-backend-85ol.onrender.com/api/like/${reelsId}`, {}, { withCredentials: true });
                     if (!res.data.success) {
                            toast.error("Failed to like");
                     }
              } catch (error) {
                     console.log(`like reels error : ${error}`);
                     toast.error(error.response?.data?.message);
              }
       };

       // 🔥 AUTO PLAY + AUTO PAUSE ON SCROLL
       useEffect(() => {
              const observer = new IntersectionObserver(
                     (entries) => {
                            entries.forEach((entry) => {
                                   const video = entry.target;

                                   if (entry.isIntersecting) {
                                          video.play().catch(() => { });
                                   } else {
                                          video.pause();
                                   }
                            });
                     },
                     { threshold: 0.6 } //jb hum 60% scrool krte hii to o next video ko on kr dega iska yhi kam hii
              );

              videoRefs.current.forEach((video) => {
                     if (video) observer.observe(video);
              });

              return () => observer.disconnect();
       }, [reels]);

       const formentNum = (num) => {
              if (!num) return 0
              if (num >= 1000000) {
                     return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m"
              }
              if (num > 1000) {
                     return (num > 1000).toFixed(1).replace(/\.0$/, "") + "k"
              }
              return num
       }

       return (
              <div className="w-full h-screen overflow-hidden bg-black flex flex-col items-center">
                     {/* Header */}
                     <div className="flex justify-between items-center md:px-30 px-10 py-3 w-full absolute top-0 z-20">
                            <IoMdArrowBack
                                   onClick={() => navigate("/")}
                                   size={25}
                                   className="cursor-pointer text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                            />
                            <p className="font-semibold text-gray-300 text-lg">Reels</p>
                     </div>

                     <div className="w-md h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide">
                            {reels.map((item, index) => (
                                   <div
                                          key={index}
                                          className="w-full h-screen relative flex justify-center items-center snap-start"
                                   >
                                          <video
                                                 ref={(el) => (videoRefs.current[index] = el)}
                                                 src={item.media}
                                                 className="w-sm h-full object-cover cursor-pointer shadow-2xl  border border-gray-500 shadow-blue-950"
                                                 playsInline

                                                 onClick={() => {
                                                        // INDEX MTLB YE VALA (item, index) JINTI BHI VIDEO HO UN SB YE LAGU KRO
                                                        const v = videoRefs.current[index];
                                                        // [index] MTLB HOTA HII KJESE HUM MAP FUNCTION MEA KRTE HII KI JITNI BHI CHIJE HO YE A ADD KRTE JAO UVESE HII YE KAM KRTA HII.
                                                        if (!v) return;

                                                        if (v.paused) {
                                                               v.play();
                                                               v.muted = false
                                                        } else {
                                                               v.pause();
                                                               v.muted = true
                                                        }
                                                 }}
                                                 onDoubleClick={() => {  // dubelclik pr kevl video chalega avj mute rhegi.
                                                        const v = videoRefs.current[index];
                                                        if (!v) return;
                                                        v.muted = !v.muted;
                                                 }}


                                          />

                                          <div className="absolute md:right-10 right-20 bottom-32 flex flex-col items-center gap-5 text-white">
                                                 <div className="flex flex-col items-center hover:scale-110 transition">
                                                        {item.like?.includes(userData?._id) ?
                                                               <IoMdHeart onClick={() => likeReels(item._id)}
                                                                      size={32} className="cursor-pointer drop-shadow-lg text-red-500"
                                                               />
                                                               :
                                                               <IoIosHeartEmpty onClick={() => likeReels(item._id)}
                                                                      size={32} className="cursor-pointer drop-shadow-lg"
                                                               />
                                                        }
                                                        <p className="text-xs text-gray-300 mt-1">{formentNum(item.like.length)}</p>
                                                 </div>

                                                 <div className="flex flex-col items-center hover:scale-110 transition">
                                                        <ReelsCommentDailog
                                                               reelsId={item._id}
                                                               initialComments={item.comment} //initialComments MTLB JO COMMNET HII.
                                                        />

                                                        <p className="text-xs text-gray-300 mt-1">{formentNum(item?.comment.length)}</p>
                                                 </div>
                                                 <DeleteReels
                                                        reelsId={item._id}
                                                        setReels={setReels}
                                                 />
                                          </div>

                                          <div className="absolute md:left-10 left-24 bottom-10 text-white space-y-1">
                                                 <div className="flex space-x-3">
                                                        <p onClick={() => navigate(`/profile/${item?.author.userName}`)} className="font-semibold text-lg text-gray-400 cursor-pointer">@{item?.author?.userName}</p>
                                                        <FollowUnfollow targetUserId={item?.author?._id} />
                                                 </div>
                                                 <p className="text-sm text-gray-300 w-60 leading-tight ">
                                                        {item?.caption}
                                                 </p>
                                          </div>
                                   </div>
                            ))}
                     </div>
              </div>
       );
};

export default Reels;

