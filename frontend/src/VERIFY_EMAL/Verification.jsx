import React from 'react'
import { MdOutlineMailLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { useUser } from '@/CONTEXT_API/User';
import { ClipLoader } from "react-spinners";

// ye dono data rkhne ke liye.
import { useDispatch } from "react-redux";  //user set krne ke liye useDispatch  hook use krenge.
import { setUsers } from '@/REDUX/UserSlice';



const Verification = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch() // ye bhi redux mea data rkhne ke liye.

  const { user} = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://pixsora-backend-85ol.onrender.com/api/verificationEmail",
        { email: user.email, otp: data.otp },
        { withCredentials: true }
      )

      if (res.data.success) {
        // Save user in Redux
        dispatch(setUsers(res.data.data))
        
        toast.success(res.data.message)
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(`verification email error : ${error}`)
    }
  };

  return (
    <div className="bg-black flex items-center justify-center w-full h-screen text-gray-300">

      {user?.email ? (
        <div className="border border-gray-600 p-9 rounded-lg w-sm">
          <div className="flex flex-col items-center text-center space-y-5">
            <MdOutlineMailLock size={150} className='text-purple-500' />

            <p className="text-xl font-semibold mt-2">Enter Confirmation Code</p>
            <p className="text-sm text-gray-400 mb-6">
              Enter the confirmation code we sent to your email.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  id="otp"
                  {...register("otp", {
                    required: "OTP is required",
                    validate: (value) =>
                      value.trim() !== "" || "OTP cannot be empty",
                  })}
                  className="
                  peer w-full border border-gray-600 rounded-md px-3 py-3 
                  bg-black text-white focus:outline-none 
                "
                />

                <label
                  htmlFor="otp"
                  className="absolute left-3 top-3 bg-black px-1 text-gray-400 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
                "
                >
                  OTP
                </label>
                {errors.otp && (
                  <span className="text-red-500 text-sm start-1 flex">
                    {errors.otp.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 py-2 rounded-md mt-2 hover:bg-purple-700 disabled:bg-gray-700 cursor-pointer"
              >
                {isSubmitting ? <ClipLoader size={30} color='white' /> : "Verify OTP"}
              </button>
            </form>
            <Link to={"/signup"} className='text-purple-700'>Go back</Link>
          </div>
        </div>
      ) :
        (
          <div className='text-center items-center flex flex-col justify-center space-y-3 w-sm'>
            <MdOutlineDoNotDisturbAlt size={80} />
            <b>Profile isn't available</b>
            <p>The link be broken, or the Profile may have been removed.</p>
            <Link to={"/signup"} className='bg-purple-700 rounded-md px-5 p-2 font-semibold cursor-pointer hover:bg-purple-900'>Sign up for Pixora</Link>
          </div>
        )
      }
    </div>
  );
};

export default Verification;


