import React, { useEffect, useRef, useState } from "react";
import { GoArrowLeft, GoArrowRight, GoHeart } from "react-icons/go";
import { IoMdHeart } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { LuDownload } from "react-icons/lu";
import { TbSend } from "react-icons/tb";
import { MdOutlineNotificationsNone } from "react-icons/md";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import socket from "@/socket";
import Navbar from "@/NAVBAR/Navbar";
import { DeletePost } from "@/ALL_DELETE/DeletePost";
import { CommentDailog } from "@/ALL_COOMENT_DAILOG/CommentDailog";
import FollowUnfollow from "@/FOLLOW_UNFOLLOW/FollowUnfollow";
import logo from "../assets/pixoraImage.png";

const Center_container = () => {
  const scrollRef = useRef(null);
  const videoRef = useRef(null);

  const [userPosts, setUserPosts] = useState([]);
  const [story, setStory] = useState([]);

  const { userData } = useSelector((state) => state.user);
  const { post } = useSelector((state) => state.uplod);
  const { notification } = useSelector((state) => state.notificationCount)

  const navigate = useNavigate();


  const formatPostTime = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diff = Math.floor((now - postDate) / 1000);

    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`;

    return postDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const res = await axios.get("https://pixsora-backend-85ol.onrender.com/api/getAllPost", { withCredentials: true });
        if (res.data.success) {
          setUserPosts(res.data.data);
        }
      }
      catch (error) {
        console.log("error getAllPost :", error);
        toast.error(error.response?.data?.message);
      }
    };
    getAllPost();
  }, [post]);

  useEffect(() => {
    if (!videoRef.current) return
    const observer = new IntersectionObserver(
      (entery) => {
        if (!entery.isIntersecting) {
          videoRef.current.pause()  // jese hi screen se bahar vese hi push ho jayega yani band.
        }
      },
      {
        threshold: 0.4  //mtlb 30% 
      }
    )
    observer.observe(videoRef.current);
    return () => {
      observer.disconnect();
    };
  }, [])

  // LIKE KE LIYE USEFFECT
  useEffect(() => {
    const handleRealtimeLike = ({ postId, userId }) => {
      setUserPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? {
              ...post,
              like: post.like.some(u => u._id === userId)
                ? post.like
                : [...post.like, { _id: userId }],
            }
            : post
        )
      );
    };
    socket.on("postLiked", handleRealtimeLike);
    return () => {
      socket.off("postLiked", handleRealtimeLike);
    };
  }, []);

  const likPost = async (postId) => {
    try {
      const res = await axios.post(`https://pixsora-backend-85ol.onrender.com/api/likePost/${postId}`, {}, { withCredentials: true });
      if (res.data.success) {
        //🔥setUserPosts(res.data.data) //sidha nhi bhej skte kyuki hume liked dilkie ek sth hi emplement kiya hii  hume post ko map krke dekhna padega.

        const likeAndDislikeUser = userPosts.map((post) =>
          post._id === postId ? res.data.data : post
        );
        setUserPosts(likeAndDislikeUser);

        socket.emit("likePost", { postId, userId: userData?._id });
        toast.success(res.data.message);
      }
    }
    catch (error) {
      console.log(`like post error : ${error}`);
      toast.error(error.response?.data?.message);
    }
  };

  const savedPost = async (postId) => {
    try {
      const res = await axios.post(`https://pixsora-backend-85ol.onrender.com/api/savedpost/${postId}`, {}, { withCredentials: true })
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(`get post error : ${error}`)
      toast.error(error.response?.data?.message)
    }
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const getStory = async () => {
      try {
        const res = await axios.get("https://pixsora-backend-85ol.onrender.com/api/getAllStory", { withCredentials: true });
        if (res?.data?.success) {
          setStory(res.data.data);
        }
      } catch (error) {
        console.log("get story error :", error);
        toast.error(error.response?.data?.message);
      }
    };
    getStory();
  }, []);

  return (
    <div className="lg:w-2/4 md:w-full min-h-screen border-r border-gray-400 md:border-none overflow-y-auto scrollbar-hide px-2 sm:px-5">

      <div className="flex items-center justify-between w-full px-2 md:hidden mt-2 mb-3">
        <img src={logo} alt="logo" className="h-14 w-14 object-contain select-none" />
        <div className="flex gap-4">

          <div className="relative cursor-pointer" onClick={() => navigate("/notification")}>
            <MdOutlineNotificationsNone size={30} />
            {notification > 0 &&
              <span className="absolute -top-3 left-05 text-red-500  text-[15px] font-bold flex items-center justify-center">
                +{notification}
              </span>
            }
          </div>
          <TbSend size={25} onClick={() => navigate("/message")} className="cursor-pointer" />
        </div>
      </div>

      <div className="relative mb-5">
        {story.length > 5 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/40 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-gray-800/70"
          >
            <GoArrowLeft size={20} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide py-2 md:mt-2"
        >
          {story.map((item) => (
            <div key={item._id} className="flex flex-col items-center cursor-pointer space-y-1">
              <div className="p-0.5 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500">
                <Avatar
                  src={item.author?.profilePic}
                  round
                  size="60"
                  onClick={() => navigate(`/view/story/${item.author?.userName}`)}
                  className="border border-gray-500 shadow-sm"
                />
              </div>
              <p className="text-xs truncate max-w-[60px] text-center">
                {item.author?.userName}
              </p>
            </div>
          ))}
        </div>

        {story.length > 5 && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/40 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-gray-800/70"
          >
            <GoArrowRight size={20} />
          </button>
        )}
      </div>

      <div className="flex flex-col space-y-8">
        {userData?.following?.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 items-center justify-center flex flex-col">
            <img src={logo} className="h-50 w-50" />
            <p className="text-lg font-medium">Follow someone to see posts!</p>
            <p className="text-sm mt-2">Start following users to see their latest posts here.</p>

            <div className="mt-10">
              <ClipLoader size={80} color="gray" />
            </div>

          </div>

        ) : (
          userPosts.map((user, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-2xl w-full p-4 sm:p-5 hover:shadow-md hover:shadow-gray-950"
            >

              <div className="flex gap-3 w-full">
                <img
                  src={user.author?.profilePic || "empty-img.jpg"}
                  alt="author"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex flex-col w-full min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => navigate(`/profile/${user.author?.userName}`)}
                      className="font-semibold text-sm sm:text-base break-words max-w-full cursor-pointer"
                    >
                      {user.author?.userName}
                    </button>

                    <span className="text-gray-400 text-[12px] ">
                      • {formatPostTime(user.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {user.author?._id !== userData?._id ? (
                      <FollowUnfollow
                        targetUserId={user.author?._id}
                        isFollower={userData?.following?.includes(user.author?._id)}
                      />
                    ) : (
                      <p className="text-[12px]">Author</p>
                    )
                    }
                    <DeletePost
                      postId={user._id}
                      setPosts={setUserPosts}
                      authorId={user.author?._id}
                    />
                  </div>

                </div>
              </div>

              {user.mediaType === "video" ? (
                <video
                  ref={videoRef}
                  src={user.media}
                  controls
                  className="w-full rounded-2xl max-h-[400px] sm:max-h-[500px] object-cover"
                />
              ) : (
                <img
                  src={user.media}
                  alt={`post-${index}`}
                  className="w-full rounded-2xl max-h-[400px] sm:max-h-[500px] object-cover"
                />
              )}

              {/* Actions */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-3 items-center">
                  {user.like.some((u) => u._id === userData?._id) ? (
                    <IoMdHeart
                      size={20}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => likPost(user._id)}
                    />
                  ) : (
                    <GoHeart
                      size={20}
                      className="cursor-pointer"
                      onClick={() => likPost(user._id)}
                    />
                  )}
                  {user.like.length > 0 && (
                    <p className="text-sm font-medium text-gray-700 hidden sm:block">
                      {user.like.length} <span className="text-[12px]">like</span>
                    </p>
                  )}

                  <CommentDailog postId={user._id} comments={user.comment} />
                  {user.comment.length > 0 && (
                    <p className="text-sm font-medium text-gray-700 hidden sm:block">
                      {user.comment.length} <span className="text-[12px]">insight</span>
                    </p>
                  )}
                </div>

                {user.saved?.some((u) => u.id === userData?.id) ? (
                  <LuDownload
                    size={25}
                    className="cursor-pointer text-green-500"
                    onClick={() => savedPost(user._id)}
                  />
                ) : (
                  <LuDownload
                    size={20}
                    className="cursor-pointer text-gray-500"
                    onClick={() => savedPost(user._id)}
                  />
                )}
              </div>

              <p className="font-semibold text-sm line-clamp-2 sm:line-clamp-3 md:line-clamp-4 mt-2">
                {user.caption}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="mt-5">
        <Navbar />
      </div>
    </div>
  );
};

export default Center_container;



// {/* <div className="flex flex-col space-y-8">
//         {
//           userPosts.map((user, index) => (
//             <div
//               key={index}
//               className="border border-gray-800 rounded-2xl w-full p-4 sm:p-5 hover:shadow-md hover:shadow-gray-950"
//             >

//               <div className="flex gap-3 w-full">
//                 <img
//                   src={user.author?.profilePic || "empty-img.jpg"}
//                   alt="author"
//                   className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover flex-shrink-0"
//                 />

//                 <div className="flex flex-col w-full min-w-0">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <button
//                       onClick={() => navigate(`/profile/${user.author?.userName}`)}
//                       className="font-semibold text-sm sm:text-base break-words max-w-full cursor-pointer"
//                     >
//                       {user.author?.userName}
//                     </button>

//                     <span className="text-gray-400 text-[12px] ">
//                       • {formatPostTime(user.createdAt)}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-1">
//                     {user.author?._id !== userData?._id ? (
//                       <FollowUnfollow
//                         targetUserId={user.author?._id}
//                         isFollower={userData?.following?.includes(user.author?._id)}
//                       />
//                     ) : (
//                       <p className="text-[12px]">Author</p>
//                     )
//                     }
//                     <DeletePost
//                       postId={user._id}
//                       setPosts={setUserPosts}
//                       authorId={user.author?._id}
//                     />
//                   </div>

//                 </div>
//               </div>

//               {user.mediaType === "video" ? (
//                 <video
//                   ref={videoRef}
//                   src={user.media}
//                   controls
//                   className="w-full rounded-2xl max-h-[400px] sm:max-h-[500px] object-cover"
//                 />
//               ) : (
//                 <img
//                   src={user.media}
//                   alt={`post-${index}`}
//                   className="w-full rounded-2xl max-h-[400px] sm:max-h-[500px] object-cover"
//                 />
//               )}

//               {/* Actions */}
//               <div className="flex items-center justify-between mt-3">
//                 <div className="flex gap-3 items-center">
//                   {user.like.some((u) => u._id === userData?._id) ? (
//                     <IoMdHeart
//                       size={20}
//                       color="red"
//                       className="cursor-pointer"
//                       onClick={() => likPost(user._id)}
//                     />
//                   ) : (
//                     <GoHeart
//                       size={20}
//                       className="cursor-pointer"
//                       onClick={() => likPost(user._id)}
//                     />
//                   )}
//                   {user.like.length > 0 && (
//                     <p className="text-sm font-medium text-gray-700 hidden sm:block">
//                       {user.like.length} <span className="text-[12px]">like</span>
//                     </p>
//                   )}

//                   <CommentDailog postId={user._id} comments={user.comment} />
//                   {user.comment.length > 0 && (
//                     <p className="text-sm font-medium text-gray-700 hidden sm:block">
//                       {user.comment.length} <span className="text-[12px]">insight</span>
//                     </p>
//                   )}
//                 </div>

//                 {user.saved?.some((u) => u.id === userData?.id) ? (
//                   <LuDownload
//                     size={25}
//                     className="cursor-pointer text-green-500"
//                     onClick={() => savedPost(user._id)}
//                   />
//                 ) : (
//                   <LuDownload
//                     size={20}
//                     className="cursor-pointer text-gray-500"
//                     onClick={() => savedPost(user._id)}
//                   />
//                 )}
//               </div>

//               <p className="font-semibold text-sm line-clamp-2 sm:line-clamp-3 md:line-clamp-4 mt-2">
//                 {user.caption}
//               </p>
//             </div>
//           ))
//         }
//       </div>  */}