import React from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import logo from "../assets/pixoraImage.png";
import axios from 'axios';
import { toast } from 'sonner';
import { useUser } from '@/CONTEXT_API/User';


//redux
import { useDispatch } from 'react-redux';
import { setUsers } from '@/REDUX/UserSlice';




const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser()

  const dispatch = useDispatch() // redux
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://pixsora-backend-85ol.onrender.com/api/login", data, {
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message);
        setUser({ email: data.email })
        dispatch(setUsers(res.data.user))
        reset()
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(`Login error : ${error}`)
    }
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-black text-gray-200 space-x-10'>
      <img src='instaImg.png' alt='img' className='w-md hidden md:block mt-10' />
      <div className='w-full max-w-sm'>

        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-40" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 '>
          <div className='relative'>
            <input
              id='Email'
              type='email'
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                validate: value =>
                  value.trim() !== "" || "Email cannot be empty"
              })}
              className="
                peer w-full border border-gray-600 rounded-md px-3 py-3
                bg-black text-white focus:outline-none
              "
            />
            <label
              htmlFor='Email'
              className="absolute left-3 top-3 bg-black px-1 text-gray-400 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
              "
            >
              Email
            </label>

            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className='relative'>
            <input
              id='Password'
              type='password'
              autoComplete="password"
              {...register("password", {
                required: "password is required",
                validate: value =>
                  value.trim() !== "" || "Password cannot be empty"
              })}
              className="
                peer w-full border border-gray-600 rounded-md px-3 py-3
                bg-black text-white focus:outline-none
              "
            />
            <label
              htmlFor='Password'
              className="absolute left-3 top-3 bg-black px-1 text-gray-400 transition-all duration-200 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-purple-600 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
              "
            >
              Password
            </label>

            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}

            <div className='m-3'>
              <Link to={"/forgot/password"} className='text-purple-500 hover:underline'>Forgot Password</Link>
            </div>
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-purple-600 py-2 rounded-md hover:bg-purple-700 font-semibold cursor-pointer'
          >
            {isSubmitting ? <ClipLoader size={20} /> : "Login"}
          </button>

          <span className='text-center'>Don't have an account? <Link to={"/signup"} className='text-purple-400 text-center hover:underline'>Sign up</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login




