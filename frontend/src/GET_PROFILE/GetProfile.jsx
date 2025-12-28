import { setProfileData } from '@/REDUX/UserSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackOutline } from "react-icons/io5";
import Avatar from 'react-avatar'
import { LuDownload } from "react-icons/lu";
import { PiFileImageFill } from "react-icons/pi";
import { setSelectedUser } from '@/REDUX/MessageSlice'
import { TbHeart } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa";
import FollowUnfollow from '@/FOLLOW_UNFOLLOW/FollowUnfollow'
import { toast } from 'sonner'



const GetProfile = () => {
       const { userName } = useParams();
       const dispatch = useDispatch();
       const navigate = useNavigate()
       const { profileData, userData } = useSelector((state) => state.user);
       const [clickedType, setClickedType] = useState("posts")

       useEffect(() => {
              const fetchProfile = async () => {
                     try {
                            const res = await axios.get(
                                   `/api/profile/${userName}`,
                                   { withCredentials: true }
                            );
                            if (res.data.success) {
                                   dispatch(setProfileData(res.data.data));
                            }

                     } catch (error) {
                            console.log("Profile error:", error.response?.data?.message);
                     }
              };
              fetchProfile();
       }, [userName, dispatch]);

       const formatNum = (num) => {
              if (!num) return 0

              if (num >= 1000000) {
                     //                                        /\.0$/, "" HUME THODA SPACE BHI TO CHAHIYE.
                     return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m"
                     //                             1 HUME POINT KE PHLE 1 HI DIGIT CHHAIYE.
              }
              else if (num >= 1000) {
                     return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"
              }
              return num
       };

       const deleteAccount = async () => {
              try {
                     const res = await axios.delete("/api/deleteAccount", { withCredentials: true })
                     if (res.data.success) {
                            navigate("/login")
                            toast.success(res.data.message)
                     }
              } catch (error) {
                     console.log(`deleteAccount error : ${error.message}`)
              }
       }

       return (
              <div className="w-full h-screen items-center justify-cente flex flex-col">
                     <div className='flex justify-between w-full px-10 mt-2'>
                            <IoArrowBackOutline size={25} onClick={() => navigate("/")} className='cursor-pointer hover:text-white transition-all duration-500 hover:scale-105' />
                            <button className='text-blue-500 font-bold cursor-pointer'>Logout</button>
                     </div>
                     <div className='md:p-8 p-3 items-center justify-center flex flex-col'>

                            <p className='flex justify-center p-6 font-bold'>{profileData?.userName}</p>

                            <div className=' w-full flex  flex-col items-center space-y-5'>
                                   <div className="flex space-x-1 md:space-x-5 items-center">
                                          <Avatar
                                                 src={profileData?.profilePic || "/empty-img.jpg"} round
                                                 size='100px'
                                          />

                                          <div className="space-y-1">
                                                 <p className="font-semibold text-lg">
                                                        {profileData?.name || "Unknown User"}
                                                 </p>

                                                 <p className="text-sm text-gray-400 max-w-sm">
                                                        {profileData?.profession || "No profession added"}
                                                 </p>

                                                 <p className="text-gray-400 max-w-sm">
                                                        {profileData?.bio || "No bio available"}
                                                 </p>
                                          </div>

                                   </div>
                                   <div className='flex justify-between space-x-10 text-center'>
                                          <div>
                                                 <p className="font-semibold text-lg">
                                                        {formatNum(profileData?.posts?.length)}
                                                 </p>
                                                 <p className="text-gray-400 text-sm">Posts</p>
                                          </div>
                                          <div>
                                                 <p className="font-semibold text-lg">{formatNum(profileData?.follower?.length)}</p>
                                                 <p className="text-gray-400 text-sm">Follower</p>
                                          </div>
                                          <div>
                                                 <p className="font-semibold text-lg">{formatNum(profileData?.following?.length)}</p>
                                                 <p className="text-gray-400 text-sm">Following</p>
                                          </div>
                                   </div>
                                   <div>
                                          {profileData?._id === userData?._id ? (
                                                 <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                                                        <button
                                                               onClick={() => navigate("/editProfile")}
                                                               className="w-full sm:w-auto px-6 py-2.5 rounded-2xl font-semibold text-white bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-gray-500 hover:shadow-[0_0_5px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer"
                                                        >
                                                               Edit profile
                                                        </button>

                                                        <button
                                                               onClick={deleteAccount}
                                                               className="w-full sm:w-auto px-6 py-2.5 rounded-2xl font-semibold text-white bg-gray-800 border border-gray-700 hover:bg-red-500 hover:border-gray-500 hover:shadow-[0_0_5px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer"
                                                        >
                                                               Delete Account
                                                        </button>
                                                 </div>
                                          ) : (
                                                 <div className='md:space-x-7 space-x-2 flex'>
                                                        <button onClick={() => {
                                                               dispatch(setSelectedUser(profileData))
                                                               navigate(`/message/${profileData?.userName}`)
                                                        }}
                                                               className='px-6 py-2.5 rounded-2xl font-semibold text-white bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-gray-500 hover:shadow-[0_0_5px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer text-[10px] md:text-[15px]'>
                                                               Message</button>

                                                        <div className='px-6 py-2.5 rounded-2xl font-semibold text-white bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-gray-500 hover:shadow-[0_0_5px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer'>
                                                               <FollowUnfollow
                                                                      targetUserId={profileData?._id}
                                                                      isFollower={userData?.following.includes(profileData?._id)}
                                                               />

                                                        </div>
                                                 </div>
                                          )
                                          }
                                   </div>
                            </div>

                     </div>
                     <div className='flex md:space-x-50 space-x-40'>
                            <PiFileImageFill
                                   size={clickedType === "posts" ? 33 : 25}
                                   color={clickedType === "posts" ? "white" : "gray"}
                                   className="cursor-pointer transition-all duration-200 h-8"
                                   onClick={() => setClickedType("posts")}
                            />
                            <LuDownload
                                   size={clickedType === "saved" ? 33 : 25}
                                   color={clickedType === "saved" ? "white" : "gray"}
                                   className="cursor-pointer transition-all duration-200 h-8"
                                   onClick={() => setClickedType("saved")}
                            />
                     </div>
                     <div className="w-full md:w-2xl  p-2 rounded-xl border border-gray-900 shadow-lg m-2">
                            <div className=" grid gap-[0.8px]
                                   grid-cols-2        /* mobile: 2 images */
                                   md:grid-cols-3     /* tablet: 3 images */
                                   lg:grid-cols-4     /* desktop: 4 images */ 
                                   ">

                                   {(clickedType === "posts" ? profileData?.posts : profileData?.saved)?.map((post, index) => (
                                          <div
                                                 key={index}
                                                 className="relative w-full h-full min-h-[150px] group overflow-hidden cursor-pointer"
                                          >
                                                 {/* IMAGE */}
                                                 {post.mediaType === "image" && (
                                                        <img
                                                               src={post.media}
                                                               alt="post"
                                                               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                 )}

                                                 {post.mediaType === "video" && (
                                                        <video
                                                               src={post.media}
                                                               className="w-full h-full object-cover"
                                                               muted
                                                        />
                                                 )}

                                                 <div
                                                        className=" absolute inset-0 bg-black/60 flex items-center justify-center gap-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 "

                                                 >
                                                        {post.like.length > 0 &&
                                                               <div className="flex items-center gap-2 text-white font-semibold text-lg">
                                                                      <TbHeart size={22} />
                                                                      {post.like?.length || 0}
                                                               </div>
                                                        }

                                                        {post.comment.length > 0 &&
                                                               <div className="flex items-center gap-2 text-white font-semibold text-lg">
                                                                      <FaRegComment size={20} />
                                                                      {post.comment?.length || 0}
                                                               </div>
                                                        }
                                                 </div>
                                          </div>
                                   ))}
                                   {((clickedType === "saved" ? profileData?.saved : profileData?.posts)?.length === 0) && (
                                          <p className='text-gray-400 col-span-full text-center mt-4'> No posts to show</p>
                                   )}

                            </div>

                     </div>
              </div>
       );
};
export default GetProfile;
