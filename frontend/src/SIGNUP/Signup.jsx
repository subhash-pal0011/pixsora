import React, { useState } from 'react'
import logo from '../assets/pixoraImage.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners";
import { FaMehRollingEyes } from "react-icons/fa";
import { BsEmojiHeartEyes } from "react-icons/bs";
import axios from 'axios';
import { toast } from 'sonner';
import { useUser } from '@/CONTEXT_API/User';


const Signup = () => {
       const navigate = useNavigate()
       
       const { setUser } = useUser()

       const [showPassword, setShowPassword] = useState(false);
       const {
              register,
              handleSubmit,
              watch,
              reset,
              formState: { errors, isSubmitting },
       } = useForm()

       const seen = watch("password")

       const onSubmit = async (data) => {
              try {
                     const res = await axios.post("/api/signup", data, {
                            headers: {
                                   "Content-Type": "application/json"
                            },
                            withCredentials: true
                     });

                     if (res.data.success) {
                            toast.success(res.data.message)
                            setUser({ email: data.email });
                            reset()
                            navigate("/Account/verification")
                     }
              }
              catch (error) {
                     toast.error(error.response?.data?.message)
                     console.log(`signup response error : ${error.response?.data?.message}`)
              }
       }

       return (
              <div className='w-full min-h-screen bg-black flex items-center justify-center'>
                     <div className='border border-gray-700 p-8 rounded-xl w-sm space-y-5'>

                            <div className="flex flex-col items-center justify-center">
                                   <img
                                          src={logo}
                                          alt="pixora logo"
                                          className="h-25 object-contain "
                                   />
                                   <p className='text-gray-300 text-center text-sm mt-3'>
                                          <b>Sign up to see photos and videos from your friends</b>
                                   </p>
                            </div>

                            <div className="flex items-center ">
                                   <div className="flex-grow-2 h-px bg-gray-600"></div>
                                   <span className="px-3 text-gray-400 text-xs font-semibold">OR</span>
                                   <div className="flex-grow-2 h-px bg-gray-600"></div>
                            </div>


                            <form
                                   onSubmit={handleSubmit(onSubmit)}
                                   className='space-y-3 text-center'>

                                   <div className="relative w-full">
                                          <input
                                                 type="text"
                                                 id="fullname"
                                                 {...register("name", { required: true, validate: (value) => value.trim() !== "" })}
                                                 className="peer w-full border border-gray-600 rounded-md px-3 py-3 text-white focus:outline-none text-whit"
                                          />
                                          {errors.name && (
                                                 <span className="text-red-500 flex items-start text-sm">
                                                        This field is required *
                                                 </span>
                                          )}

                                          <label
                                                 htmlFor="fullname"
                                                 className="absolute left-3 top-3 bg-black px-1 text-gray-400 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm"
                                          >
                                                 Fullname
                                          </label>
                                   </div>

                                   <div className="relative w-full">
                                          <input
                                                 type="text"
                                                 id="userName"
                                                 {...register("userName", { required: true, validate: (value) => value.trim() !== "" })}
                                                 className="peer w-full border border-gray-600 rounded-md px-3 py-3 text-white focus:outline-none"
                                          />
                                          {errors.userName && (
                                                 <span className="text-red-500 flex items-start text-sm">
                                                        This field is required *
                                                 </span>
                                          )}
                                          <label
                                                 htmlFor="username"
                                                 className="absolute left-3 top-3 bg-black px-1 text-gray-400 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm"
                                          >
                                                 Username
                                          </label>
                                   </div>

                                   <div className="relative w-full">
                                          <input
                                                 type="email"
                                                 id="email"
                                                 {...register("email", { required: true, validate: (value) => value.trim() !== "" })}
                                                 className="peer w-full border border-gray-600 rounded-md px-3 py-3 text-white focus:outline-none"
                                          />
                                          {errors.email &&
                                                 <span className="text-red-500 flex items-start text-sm">
                                                        This field is required *
                                                 </span>
                                          }
                                          <label
                                                 htmlFor="email"
                                                 className="absolute left-3 top-3 bg-black px-1 text-gray-400 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm"
                                          >
                                                 Email
                                          </label>
                                   </div>

                                   <div className="relative w-full">
                                          <input
                                                 type={showPassword ? "text" : "password"}
                                                 id="password"
                                                 {...register("password", {
                                                        required: true,
                                                        validate: (value) => value.trim() !== "",
                                                 })}
                                                 className="peer w-full border border-gray-600 rounded-md px-3 py-3 text-white focus:outline-none"
                                          />

                                          {seen &&
                                                 <div
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 text-gray-300 cursor-pointer">
                                                        {showPassword ? <BsEmojiHeartEyes size={24} color='white' /> : <FaMehRollingEyes size={24} color='white' />}
                                                 </div>
                                          }

                                          {errors.password && (
                                                 <span className="text-red-500 start flex">
                                                        This field is required *
                                                 </span>
                                          )}

                                          <label
                                                 htmlFor="password"
                                                 className="absolute left-3 top-3 bg-black px-1 text-gray-400 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm"
                                          >
                                                 Password
                                          </label>
                                   </div>

                                   <button className='bg-purple-600 w-full p-2 rounded-xl text-white font-semibold hover:bg-purple-700 transition cursor-pointer' disabled={isSubmitting}>
                                          {isSubmitting ? <ClipLoader size={30} color='white' /> : "Sign up"}

                                   </button>

                                   <span className='text-white'>Have an account? </span>
                                   <Link to="/login" className="text-purple-400 hover:underline cursor-pointer">
                                          Log in
                                   </Link>
                            </form>

                     </div>
              </div>
       )
}
export default Signup
