import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { updateFollowers } from "@/REDUX/UserSlice";

const FollowUnfollow = ({ targetUserId }) => {
       const dispatch = useDispatch();
       const { userData } = useSelector((state) => state.user);

       const [isFollowing, setIsFollowing] = useState(false);

       // 🔁 sync with redux
       useEffect(() => {
              if (userData?.following) {
                     const followed = userData.following.some(
                            (user) => user._id === targetUserId
                     );
                     setIsFollowing(followed);
              }
       }, [userData, targetUserId]);//HUMNE JO YHA PE USESTATE LAGA HII ISKO HUM DIRECT handleFollow FUNC MEA BHI LAGA SKTE HII BUT HUME BTN CLIK KRNE PR CALL BHI TO FUNC KO KRANA THA.

       const handleFollow = async () => {
              try {
                     const res = await axios.post(
                            `https://pixsora-backend-85ol.onrender.com/api/follow/${targetUserId}`,
                            {},
                            { withCredentials: true }
                     );

                     if (res.data.success) {
                            dispatch(
                                   updateFollowers({
                                          targetUser: res.data.targetUser, // null on unfollow.

                                          // isFollowing CONTERLOER MEA HII IS LIYE USE KR LERHE HUTA BHI SKTE HII.
                                          isFollowing: res.data.isFollowing,
                                          targetUserId,
                                   })
                            );

                            setIsFollowing(res.data.isFollowing);
                            toast.success(res.data.message);
                     }
              } catch (error) {
                     toast.error(error.response?.data?.message || "Something went wrong");
              }
       };

       return (
              <button
                     onClick={handleFollow}
                     className={`font-semibold cursor-pointer
                     text-[10px] px-2 py-1          /* very small devices */
                     sm:text-sm   /* normal mobile */
                     md:text-sm    /* tablet & desktop */
                     ${isFollowing ? "text-gray-400" : "text-blue-500 hover:text-blue-300"} `}

              >
                     {isFollowing ? "Following" : "Follow"}
              </button>
       );
};

export default FollowUnfollow;
