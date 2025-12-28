import React, { useEffect, useState } from 'react';
import { RiRotateLockFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { ClipLoader } from "react-spinners";
import { useUser } from '@/CONTEXT_API/User';
import logo from "../assets/pixoraImage.png";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";


const ForgotPassword = () => {
       const navigate = useNavigate();
       const { user, setUser } = useUser();
       const [step, setStep] = useState(1);
       const [showPassword, setShowPassword] = useState(false);

       const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();


       // FIR USKE BAD SETITME MEA STORE KRKE AGE BADHTE RENGE API KE THRUGH API MEA BHI  HII DEKH LO
       useEffect(() => {
              const savedStep = localStorage.getItem("forgot_step");
              if (savedStep) setStep(Number(savedStep));
       }, []);


       useEffect(() => {  // ⭐📌 STEP ---1  LOCALsTORAGE MEA MEA STEP +1 KRKE STORE KR LE RHA HUM KYUKI PAGE KO REFRACE KRTE HII INPUT AND ELEMNT CHANGE HO RHE THE IS LIYE 
              localStorage.setItem("forgot_step", step);
       }, [step]);

       const handleEmailSubmit = async (data) => {
              try {
                     const res = await axios.post("https://pixsora-backend-85ol.onrender.com/api/forgot/sendotp", data, { withCredentials: true });
                     if (res.data.success) {
                            toast.success(res.data.message);
                            setUser({ email: data.email });
                            setStep(2);
                            reset();
                     }
              } catch (error) {
                     toast.error(error.response?.data?.message || "Server error");
              }
       };

       const handleOtpSubmit = async (data) => {
              try {
                     const res = await axios.post("https://pixsora-backend-85ol.onrender.com/api/forgotPass/verify", {
                            email: user.email,
                            otp: data.otp
                     }, { withCredentials: true });

                     if (res.data.success) {
                            toast.success(res.data.message);
                            setStep(3);
                            reset();
                     }
              } catch (error) {
                     toast.error(error.res?.data?.message || "Server error");
              }
       };

       const handlePasswordSubmit = async (data) => {
              try {
                     const res = await axios.post("https://pixsora-backend-85ol.onrender.com/api/forgotpassword", {
                            email: user.email,
                            password: data.password,
                            confirmPassword: data.confirmPassword
                     }, { withCredentials: true });

                     if (res.data.success) {
                            toast.success(res.data.message);
                            setUser(null);
                            setStep(1);
                            localStorage.removeItem("forgot_step");
                            navigate("/login");
                     }
              } catch (error) {
                     toast.error(error.response?.data?.message || "Server error");
              }
       };

       return (
              <div className="w-full h-screen bg-black text-gray-300 flex items-center justify-center">
                     <div className="w-sm space-y-6">

                            {step === 1 && (
                                   <div className='space-y-4'>
                                          <div className='flex flex-col items-center justify-center text-center space-y-2'>
                                                 <RiRotateLockFill size={90} />
                                                 <p className='font-bold'>Trouble logging in?</p>
                                                 <p>Please enter your email to receive an OTP for password reset.</p>
                                          </div>
                                          <form onSubmit={handleSubmit(handleEmailSubmit)} className='space-y-5'>
                                                 <input
                                                        type='email'
                                                        placeholder='Enter Email'
                                                        {...register("email", { required: "Email is required" })}
                                                        className="w-full bg-black border border-gray-600 rounded-md px-3 py-3 text-white focus:outline-none"
                                                 />
                                                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                                 <button disabled={isSubmitting} className='bg-purple-600 w-full py-2 rounded flex justify-center cursor-pointer'>
                                                        {isSubmitting ? <ClipLoader size={25} color="white" /> : "Send OTP"}
                                                 </button>
                                                 <div className='text-center mt-2'>
                                                        <Link to="/login" className='text-purple-400 hover:underline'>Back to Login</Link>
                                                 </div>
                                          </form>
                                   </div>
                            )}



                            {step === 2 && (
                                   <div className='space-y-4'>
                                          <div className='text-center'>
                                                 <p className='font-bold text-xl'>Verify OTP</p>
                                                 <p>Enter the OTP sent to your email</p>
                                          </div>
                                          <form onSubmit={handleSubmit(handleOtpSubmit)} className='space-y-5'>
                                                 <input
                                                        type="text"
                                                        placeholder="Enter OTP"
                                                        maxLength={6}  
                                                        {...register("otp", {
                                                               required: "OTP is required",
                                                               validate: (value) => value.trim() !== "" || "OTP cannot be empty",
                                                               maxLength: {
                                                                      value: 6,
                                                                      message: "OTP must be 6 digits"
                                                               },
                                                               pattern: {
                                                                      value: /^[0-9]+$/,
                                                                      message: "OTP must contain only numbers"
                                                               }
                                                        })}
                                                        className="w-full bg-black border border-gray-600 rounded-md px-3 py-3 text-white focus:outline-none"
                                                 />

                                                 {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
                                                 <button disabled={isSubmitting} className='bg-purple-600 w-full py-2 rounded flex justify-center cursor-pointer'>
                                                        {isSubmitting ? <ClipLoader size={25} color="white" /> : "Verify OTP"}
                                                 </button>
                                          </form>
                                          <Link to={"/login"} className='font-semibold hover:text-purple-400 hover:underline flex justify-center'>Back</Link>
                                   </div>
                            )}



                            {step === 3 && (
                                   <div className="space-y-5 text-center">
                                          <img src={logo} alt="logo" className="h-40 mx-auto" />
                                          <h1 className="text-xl font-bold">Create New Password</h1>
                                          <p className="text-center font-semibold">Please create a strong password to secure your account.</p>


                                          <form onSubmit={handleSubmit(handlePasswordSubmit)} className="space-y-5">

                                                 <div className="relative">
                                                        <input
                                                               id="Password"
                                                               type={showPassword ? "text" : "password"}
                                                               placeholder=" "
                                                               {...register("password", {
                                                                      required: "Password is required",
                                                                      minLength: {
                                                                             value: 6,
                                                                             message: "Minimum 6 characters required",
                                                                      },
                                                                      validate: {
                                                                             emptyCheck: (value) => value.trim() !== "" || "Do not leave blank",
                                                                             noSpace: (value) =>
                                                                                    !/\s/.test(value) || "Password cannot contain spaces",
                                                                      },
                                                                      pattern: {
                                                                             value:
                                                                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                                             message:
                                                                                    "Must include upper, lower, number & special character",
                                                                      },
                                                               })}
                                                               className="peer w-full border border-gray-600 rounded-md px-3 py-3 bg-black text-white focus:outline-none"
                                                        />

                                                        <div
                                                               onClick={() => setShowPassword(!showPassword)}
                                                               className="absolute right-3 top-3 text-xl text-gray-400 cursor-pointer"
                                                        >
                                                               {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                                        </div>

                                                        <label
                                                               htmlFor="Password"
                                                               className="absolute left-3 top-3 bg-black px-1 text-gray-400
                                                                                           transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm"
                                                        >
                                                               New Password
                                                        </label>

                                                        {errors.password && (
                                                               <p className="text-red-500 text-sm mt-1">
                                                                      {errors.password.message}
                                                               </p>
                                                        )}
                                                 </div>

                                                 <div className="relative">
                                                        <input
                                                               id="confirmPassword"
                                                               type={showPassword ? "text" : "password"}
                                                               placeholder=" "
                                                               {...register("confirmPassword", {
                                                                      required: "Confirm Password is required",
                                                                      validate: (value) => value.trim() !== "" || "Do not blank password",

                                                               })}
                                                               className="peer w-full border border-gray-600 rounded-md px-3 py-3 bg-black text-white focus:outline-none"
                                                        />

                                                        <div
                                                               onClick={() => setShowPassword(!showPassword)}
                                                               className="absolute right-3 top-3 text-xl text-gray-400 cursor-pointer"
                                                        >
                                                               {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                                        </div>

                                                        <label
                                                               htmlFor="confirmPassword"
                                                               className="absolute left-3 top-3 bg-black px-1 text-gray-400 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm 
                                                                                             
                                                                                         peer-focus:text-purple-600 peer-placeholder-shown:top-3         peer-placeholder-shown:text-base
                                                                                         peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm"
                                                        >
                                                               Confirm Password
                                                        </label>

                                                        {errors.confirmPassword && (
                                                               <p className="text-red-500 text-sm mt-1">
                                                                      {errors.confirmPassword.message}
                                                               </p>
                                                        )}
                                                 </div>

                                                 <button
                                                        disabled={isSubmitting}
                                                        className="bg-purple-600 w-full p-2 rounded-md font-semibold hover:bg-purple-700 cursor-pointer"
                                                 >
                                                        {isSubmitting ? <ClipLoader size={30} color='white' /> : "Create Password"}
                                                 </button>
                                          </form>
                                          <Link to={"/signup"} className="font-semibold hover:text-purple-400 hover:underline">Back</Link>
                                   </div>
                            )}

                     </div>
              </div>
       );
};

export default ForgotPassword;

