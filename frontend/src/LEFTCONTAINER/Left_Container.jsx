import React, { useEffect, useState } from 'react'
import logo from "../assets/pixoraImage.png"
import { MdOutlineNotificationsNone } from "react-icons/md";
import Avatar from "react-avatar";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/REDUX/UserSlice';
import FollowUnfollow from '@/FOLLOW_UNFOLLOW/FollowUnfollow';

const Left_Container = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();


  const { notification } = useSelector((state) => state.notificationCount)

  //     {userData} ye userSlice mea ka likh jata hii.
  const { userData } = useSelector(state => state.user) // user YE STORE KA LIKHA HII.

  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await axios.get("https://pixsora-backend-85ol.onrender.com/api/suggestedUser", { withCredentials: true });
        if (res.data.success) {
          setSuggestedUsers(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    fetchSuggestedUsers();
  }, []);

  const logout = async () => {
    try {
      const res = await axios.get("https://pixsora-backend-85ol.onrender.com/api/logout", { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
        // redux state clear. HUME RFEDUX SE BHI TO USER KA DATA CLEAR TO KRNA HII NA.
        dispatch(logoutUser());
        navigate("/login");
      }
    }
    catch (error) {
      toast.error("Logout failed");
      console.log("Logout Error:", error);
    }
  };

  return (
    <div className='hidden lg:block w-1/4 min-h-screen border-r border-gray-400'>
      <div className='px-4'>
        <div className='flex w-full justify-between items-center'>
          <img src={logo} alt='logo' className='w-24' />
          
          <div className="relative cursor-pointer" onClick={() => navigate("/notification")}>

            <MdOutlineNotificationsNone size={30} />

            {notification > 0 &&
              <span className="absolute -top-3 left-05 text-red-500  text-[15px] font-bold flex items-center justify-center">
                +{notification}
              </span>
            }
          </div>

        </div>
        <div className='space-y-8'>
          <div className=' w-full py-5 flex space-x-2 justify-between rounded-md px-3 shadow-sm shadow-gray-800'>
            <div className='flex space-x-2 cursor-pointer' onClick={() => navigate(`/profile/${userData.userName}`)}>
              <Avatar
                src={userData.profilePic || "empty-img.jpg"}
                round
                size='50'
              />
              <div className='items-center'>
                <b className='text-sm'>
                  {userData.userName.length > 8 ? `${userData.userName.slice(0, 8)}...` : userData.userName}
                </b>
                <p className='font-semibold text-xs'>
                  {userData.name.length > 8 ? `${userData.name.slice(0, 8)}...` : userData.name}
                </p>
              </div>
            </div>
            <button onClick={logout} className='font-semibold hover:text-red-500 text-sm transition cursor-pointer'>Logout</button>
          </div>

          <div className='flex  flex-col space-y-3'>
            <Link className='font-semibold text-sm text-gray-400 hover:text-white transition'>Suggested User</Link>

            {suggestedUsers && suggestedUsers.slice(0, 4).map((user, index) => (
              <div key={index}
                className=' w-full py-3 flex justify-between items-center rounded-md px-3 shadow-sm shadow-gray-800'>

                <div onClick={() => navigate(`/profile/${user.userName}`)} className='flex items-center space-x-3 cursor-pointer'>
                  <Avatar src={user.profilePic || "/empty-img.jpg"} round size='40' />
                  <div className='flex flex-col'>
                    <b className='text-sm'>
                      {user.userName.length > 9 ? `${user.userName.slice(0, 9)}...` : user.userName}
                    </b>

                    <p className='font-semibold text-xs text-gray-300'>
                      {user.name.length > 8 ? `${user.name.slice(0, 8)}...` : user.name}
                    </p>
                  </div>
                </div>
                {/* <button className='font-semibold text-sm text-blue-500 hover:text-blue-400 transition cursor-pointer'>Follow</button> */}
                <FollowUnfollow
                  targetUserId={user._id}
                  isFollower={userData.following.includes(user._id)}
                />

              </div>
            ))}
          </div>

        </div>
      </div>
    </div >
  )
}

export default Left_Container



