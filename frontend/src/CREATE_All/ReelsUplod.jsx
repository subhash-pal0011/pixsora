import {
       Dialog,
       DialogTrigger,
       DialogContent,
       DialogHeader,
       DialogTitle,
       DialogDescription,
       DialogFooter,
       DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { MdCameraswitch } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";

export function ReelsUplod() {
       const [reviewReels, setReviewReels] = useState(null);

       const {
              register,
              handleSubmit,
              reset,
              formState: { errors, isSubmitting },
       } = useForm();

       const handleFileChange = (e) => {
              const file = e.target.files[0]; 
              if (!file) return;
              setReviewReels(URL.createObjectURL(file)); 
       };

       const backButton = () => {
              setReviewReels(null);
       };

       const onSubmit = async (data) => {
              try {
                     const formData = new FormData();  
                     formData.append("media", data.media[0]); 
                     formData.append("caption", data.caption);

                     const res = await axios.post("https://pixsora-backend-85ol.onrender.com/api/reelsCreate",formData,{ withCredentials: true });

                     if (res.data.success) {
                            toast.success(res.data.message || "Reels Uploaded!");
                            setReviewReels(null);
                            reset();
                     }
              } 
              catch (error) {
                     console.log(`reels upload error: ${error}`);
                     toast.error(error.response?.data?.message);
              }
       };

       return (
              <Dialog>
                     <DialogTrigger asChild>
                            <div className="md:w-20 h-[35px] flex items-center justify-center font-semibold cursor-pointer rounded-md hover:bg-gray-800 hover:border hover:border-gray-500 transition-transform duration-200 hover:scale-105">
                                   Reels
                            </div>
                     </DialogTrigger>

                     <DialogContent className="bg-black text-gray-200 text-center items-center flex flex-col">
                            <DialogHeader>
                                   <DialogTitle>Create Reels 🎶</DialogTitle>
                                   <DialogDescription></DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                   {reviewReels ? (
                                          <div className="flex flex-col items-center gap-4">
                                                 <button type="button" onClick={backButton} className="self-auto">
                                                        <IoMdArrowBack
                                                               size={30}
                                                               className="hover:text-white text-gray-500 transition-all duration-500 hover:scale-110 cursor-pointer"
                                                        />
                                                 </button>

                                                 <video
                                                        src={reviewReels}
                                                        controls
                                                        className="w-64 h-64 rounded-lg object-cover"
                                                 />

                                                 <input
                                                        type="text"
                                                        placeholder="Write Caption"
                                                        maxLength={150}
                                                        {...register("caption", {
                                                               validate: (value) =>
                                                               value.trim().length > 0 || value === "" || "Spaces only are not allowed",
                                                        })}

                                                        className="w-full max-w-sm p-3 rounded outline-none transition-all"
                                                 />
                                                 {errors.caption && (
                                                        <span className="text-red-500 text-sm">
                                                               {errors.caption.message}
                                                        </span>
                                                 )}

                                                 <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full max-w-sm p-3 bg-gray-700 hover:bg-gray-900 text-white font-semibold rounded-2xl transition-all disabled:opacity-50 flex justify-center items-center gap-2 cursor-pointer duration-700"
                                                 >
                                                        {isSubmitting ? (
                                                               <ClipLoader size={25} color="white" />
                                                        ) : (
                                                               "Submit Reels"
                                                        )}
                                                 </button>
                                          </div>
                                   ) : (
                                          <div className="flex flex-col items-center gap-4">
                                                 <label
                                                        htmlFor="post"
                                                        className="border border-gray-400 bg-gray-800 flex items-center justify-center cursor-pointer rounded-lg py-6 mx-8 hover:bg-gray-600 duration-500 md:w-sm sm:w-72 w-40"
                                                 >
                                                        <MdCameraswitch
                                                               size={80}
                                                               className="duration-500 hover:scale-125 transition-transform"
                                                        />
                                                 </label>

                                                 <input
                                                        id="post"
                                                        type="file"
                                                        accept="video/*"
                                                        hidden
                                                        {...register("media", {
                                                               required: true,
                                                               onChange: handleFileChange,
                                                        })}
                                                 />
                                                 {errors.media && (
                                                        <span className="text-red-500">This field is required</span>
                                                 )}
                                          </div>
                                   )}
                            </form>

                            <DialogFooter>
                                   <DialogClose asChild></DialogClose>
                            </DialogFooter>
                     </DialogContent>
              </Dialog>
       );
}
