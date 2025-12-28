// import React from 'react';
// import { AiOutlineHome } from "react-icons/ai";
// import { IoSearchOutline } from "react-icons/io5";
// import { RxVideo } from "react-icons/rx";
// import { CgProfile } from "react-icons/cg";
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { CreateAll } from '@/CREATE_All/CreateAll';

// const Navbar = () => {
//        const navigate = useNavigate()

//        const { userData } = useSelector(state => state.user);
//        return (
//               <div className='w-full h-18 bg-gray-800/40 backdrop-blur-2xl flex items-center justify-center text-white font-bold text-lg shadow-md rounded-full'>
//                      <div className='flex md:gap-16 gap-10 sm:gap-16'>
//                             <AiOutlineHome size={24} className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-transform duration-200" />

//                             {/* <IoSearchOutline size={25} className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-transform duration-200 hidden md:block" onClick={() => navigate("/search")} /> */}

//                             <IoSearchOutline
//                                    size={25}
//                                    className="hidden sm:block cursor-pointer hover:text-blue-500 hover:scale-110 transition-transform duration-200"
//                                    onClick={() => navigate("/search")}
//                             />


//                             <CreateAll />

//                             <RxVideo onClick={() => navigate("/reels")} size={25} className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-transform duration-200" />

//                             <CgProfile onClick={() => navigate(`/profile/${userData.userName}`)} size={25} className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-transform duration-200" />
//                      </div>
//               </div>
//        );
// };

// export default Navbar;




import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { RxVideo } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateAll } from "@/CREATE_All/CreateAll";

const Navbar = () => {
       const navigate = useNavigate();
       const { userData } = useSelector((state) => state.user);

       return (
              <div
                     className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[95%] sm:w-[80%] md:w-[65%] lg:w-[50%] h-14 sm:h-16 bg-gray-800/40 backdrop-blur-2xl flex items-center justify-center text-center
                     rounded-full shadow-lg z-50"
              >
                     <div className="flex items-center justify-evenly w-full sm:px-1">
                            <AiOutlineHome
                                   size={24}
                                   onClick={() => navigate("/")}
                                   className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-all"
                            />

                            <IoSearchOutline
                                   size={25}
                                   onClick={() => navigate("/search")}
                                   className=" cursor-pointer hover:text-blue-500 hover:scale-110 transition-all"
                            />

                            {/* Create */}
                            <CreateAll />

                            {/* Reels */}
                            <RxVideo
                                   size={25}
                                   onClick={() => navigate("/reels")}
                                   className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-all"
                            />

                            {/* Profile */}
                            <CgProfile
                                   size={25}
                                   onClick={() => navigate(`/profile/${userData?.userName}`)}
                                   className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-all"
                            />
                     </div>
              </div>
       );
};

export default Navbar;
