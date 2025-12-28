import React, { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import Avatar from "react-avatar";
import { setSearch } from "@/REDUX/SearchSlice";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { searchs } = useSelector((state) => state.search);


  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting }
  } = useForm();

  const searchValue = watch("search");


  const search = async (query) => {
    try {
      const res = await axios.get(`https://pixsora-backend-85ol.onrender.com/api/search?search=${query}`,{ withCredentials:true});
      if (res.data.success) {
        dispatch(setSearch(res.data.data));
      }
      else {
        toast.info(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };


  // jb surch mn lo nhi pata use ki ye live serch hii to koi name likh kr enter hi mar diya to bhi serch hoga ( SERCH FUNCTION MEA DATACHALA JAYEGA).
  const onSubmit = async (data) => {
    if (!data.search || data.search.trim() === "") return
    await search(data.search)
  };

  // LIVE SEARCH
  useEffect(() => {
    if (!searchValue || !searchValue.trim() === "") return

    const timer = setTimeout(() => {
      search(searchValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchValue]) // jese hi serchValue mea koi text ayega vese hi ye useeffect call ho jayega



  return (
    <div className="w-full min-h-screen ">

      <div className="relative w-full h-[70px] flex items-center px-4">

        <IoMdArrowBack
          onClick={() => navigate("/")}
          size={30}
          className="absolute left-4 text-gray-400 cursor-pointer hover:text-white transition-all duration-500 hover:scale-110"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-[700px] relative"
        >
          <input
            {...register("search")}
            type="text"
            placeholder="Search..."
            className="w-full rounded-full px-5 py-3 pr-12 bg-gray-800 text-white border border-gray-700 focus:border-gray-500 outline-none shadow shadow-gray-500"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            {isSubmitting ? (
              <ClipLoader size={18} color="white" />
            ) : (
              <MdOutlineSearch size={22} className="text-gray-400" />
            )}
          </button>
        </form>
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 py-6">
        {searchs && searchs.length > 0 ? (
          <div className="flex flex-col gap-3">
            {searchs.map((user) => (
              <div key={user._id} onClick={()=> navigate(`/profile/${user.userName}`)}
                className="flex items-center gap-4 p-3 rounded-lg bg-gray-900 hover:bg-gray-800 transition cursor-pointer"
              >
                <Avatar
                  src={user.profilePic || "/empty-img.jpg"}
                  size="45"
                  round
                />

                <div className="flex flex-col">
                  <p className="text-sm font-semibold">
                    {user.userName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
          </p>
        )}
      </div>

    </div>
  );
};

export default Search;

