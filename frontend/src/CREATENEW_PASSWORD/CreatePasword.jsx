import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/pixoraImage.png"
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const CreatePassword = () => {
       const {
              register,
              handleSubmit,
              formState: { errors, isSubmitting },
       } = useForm();

       const [showPassword, setShowpassword] = useState(false)
       
       const onSubmit = async (data) => {
              
       };

       return (
              <div className="w-full h-screen bg-black text-gray-300 flex items-center justify-center">
                     <div className="w-sm space-y-5 text-center">
                            <div className="items center justify-center text-center flex">
                                   <img src={logo} alt="logo" className="h-40 block m-0 p-0" />
                            </div>

                            <h1 className="text-xl font-bold text-center">Create New Password</h1>
                            <p className="text-center font-semibold">Please create a strong password to ensure the security of your account.</p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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
                                                 onClick={() => setShowpassword(!showPassword)}
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
                                                 onClick={() => setShowpassword(!showPassword)}
                                                 className="absolute right-3 top-3 text-xl text-gray-400 cursor-pointer"
                                          >
                                                 {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                                          </div>

                                          <label
                                                 htmlFor="confirmPassword"
                                                 className="absolute left-3 top-3 bg-black px-1 text-gray-400
                                                 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm 
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
                                          {isSubmitting ? "Saving..." : "Create Password"}
                                   </button>
                            </form>
                            <Link to={"/signup"} className="font-semibold hover:text-purple-400 hover:underline">Back</Link>
                     </div>
              </div>
       );
};

export default CreatePassword;


