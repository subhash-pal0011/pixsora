import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import { toast } from "sonner";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Viewrs } from "@/VIEWRS_OF_STORY/Viewrs";
import { useSelector } from "react-redux";


const ViewStory = () => {
       const { userName } = useParams();
       const navigate = useNavigate();
       const [story, setStory] = useState([]);
       const { userData } = useSelector((state) => state.user);
       const [currentIndex, setCurrentIndex] = useState(0);

       // useEffect(() => {
       //        const getUserStory = async () => {
       //               try {
       //                      const res = await axios.get(`https://pixsora-backend-85ol.onrender.com/api/getUserStory/${userName}`, {}, { withCredentials: true });
       //                      if (res.data.success) {
       //                             setStory(res.data.data);
       //                             setCurrentIndex(0);
       //                      }
       //               } catch (error) {
       //                      toast.error(error.response?.data?.message);
       //               }
       //        };
       //        getUserStory();
       // }, [userName]);


       useEffect(() => {
              const getUserStory = async () => {
                     try {
                            const res = await axios.get(
                                   `https://pixsora-backend-85ol.onrender.com/api/getUserStory/${userName}`,
                                   { withCredentials: true }
                            );

                            if (res.data.success) {
                                   setStory(res.data.data);
                                   setCurrentIndex(0);
                            }
                     } catch (error) {
                            toast.error(error.response?.data?.message || "Unauthorized");
                     }
              };

              getUserStory();
       }, [userName]);


       useEffect(() => {
              if (story.length === 0) return;
              const timer = setTimeout(() => {
                     // currentIndex ISKA MTLB 0 TOTLA STORY = 5 currentIndex ISKA MTLB 0, 0 < 5-1 ETC
                     if (currentIndex < story.length - 1) {
                            setCurrentIndex(prev => prev + 1);
                     } else {
                            navigate(-1);
                     }
              }, 30000);
              return () => clearTimeout(timer);
       }, [story, currentIndex, navigate]);

       const currentStory = story[currentIndex];

       const deleteStory = async () => {
              try {
                     const res = await axios.delete(`https://pixsora-backend-85ol.onrender.com/api/deleteStory/${currentStory._id}`, { withCredentials: true });

                     if (res.data.success) {
                            toast.success(res.data.message);
                            setStory((prev) => prev.filter((d) => d._id !== currentStory._id));

                            // agar last story delete ho gayi
                            if (story.length === 1) {
                                   navigate(-1);
                            } else if (currentIndex > 0) {
                                   setCurrentIndex((prev) => prev - 1);
                            }
                     }
              }
              catch (error) {
                     toast.error(error.response?.data?.message);
              }
       };

       return (
              <div className="h-screen w-full  flex flex-col">
                     <div className="w-full flex items-center justify-between md:px-10 p-2 relative">
                            <div className="flex items-center gap-2">
                                   <IoMdArrowBack
                                          size={28}
                                          onClick={() => navigate(-1)}
                                          className="cursor-pointer text-gray-400 hover:text-white transition-all duration-300"
                                   />
                                   <p className="text-sm font-semibold hidden md:block">
                                          Viewing story of <span className="text-pink-500">{userName}</span>
                                   </p>
                            </div>
                            {story.length > 1 &&
                                   <p className="absolute left-1/2 font-semibold">{currentIndex + 1} <span className="text-gray-600">of</span> {story.length}</p>
                            }
                            {userData.userName === userName &&
                                   <MdDelete onClick={deleteStory}
                                          size={20} className="text-gray-600 hover:text-red-500 transition-all duration-500 cursor-pointer" />
                            }
                     </div>

                     <div className="flex-1 flex justify-center items-center px-4 ">
                            <div class="hidden md:block">
                                   <IoChevronBackCircleOutline
                                          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                          size={30} className="text-gray-700 hover:text-white cursor-pointer transition-all duration-500 hover:scale-110"
                                   />
                            </div>

                            {currentStory && (
                                   currentStory.mediaType === "image" ? (
                                          <img
                                                 src={currentStory.media}
                                                 alt="story"
                                                 className="max-h-[80vh] w-auto md:w-auto object-contain"
                                          />
                                   ) : (
                                          <video
                                                 src={currentStory.media}
                                                 autoPlay
                                                 muted
                                                 controls
                                                 className="max-h-[85vh] w-full md:w-auto object-contain"
                                          />
                                   )
                            )}
                            {userName === userData.userName &&
                                   <div className="flex absolute bottom-20 gap-2 items-center">
                                          <Viewrs storyId={currentStory?._id} />

                                          <p className="text-gray-900 font-semibold">{currentStory?.view?.usernam}</p>
                                   </div>
                            }

                            <div className="hidden md:block">
                                   <IoChevronForwardCircleOutline
                                          onClick={() => {
                                                 if (currentIndex < story.length - 1) {
                                                        setCurrentIndex((prev) => prev + 1)
                                                 }
                                                 else {
                                                        navigate(-1)
                                                 }
                                          }}
                                          size={30} className="text-gray-700 hover:text-white cursor-pointer transition-all duration-500 hover:scale-110"
                                   />
                            </div>
                     </div>
              </div>

       );
};

export default ViewStory;



