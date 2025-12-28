import {
       Dialog,
       DialogTrigger,
       DialogContent,
       DialogHeader,
       DialogTitle,
       DialogDescription,
       DialogFooter,
} from "@/components/ui/dialog";

import { MdCameraswitch } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "sonner";

export function CreateStory() {
       const [reviewStory, setReviewStory] = useState(null);
       const [fileType, setFileType] = useState(null); 
       const {
              register,
              handleSubmit,
              reset,
              formState: { isSubmitting },
       } = useForm();

       const handleFileChange = (e) => {
              // url ISE CONSOLE MEA LAGA KE DEKH LO KYU [0] LAGTE HII KYKI O NO PE HII URL MIL JATA HII IS LIYE
              const file = e.target.files[0];
              if (!file) return;

              setReviewStory(URL.createObjectURL(file));

              if (file.type.startsWith("image/")) {
                     setFileType("image");
              } else if (file.type.startsWith("video/")) {
                     setFileType("video");
              }
       };

       const backButton = () => {
              setFileType(null);
              setReviewStory(null);
       };

       const onSubmit = async (data) => {
              const formData = new FormData();
              formData.append("media", data.media[0]);
              formData.append("mediaType", fileType);

              try {
                     const res = await axios.post("https://pixsora-backend-85ol.onrender.com/api/storyUplod",formData,{ withCredentials: true });

                     if (res.data.success) {
                            toast.success(res.data.message);
                            setReviewStory(null);
                            setFileType(null);
                            reset();

                     }
              } catch (error) {
                     console.log(`uplodStoryError : ${error}`);
                     toast.error(error.response?.data?.message || "Upload Failed");
              }
       };


       return (
              <Dialog>
                     <DialogTrigger asChild>
                            <div
                                   className="md:w-20 h-[35px] flex items-center justify-center font-semibold cursor-pointer rounded-md hover:bg-gray-800 hover:border hover:border-gray-500 transition-transform duration-200 hover:scale-105"
                            >
                                   Story
                            </div>
                     </DialogTrigger>

                     <DialogContent className="bg-black text-gray-200">
                            <DialogHeader>
                                   <DialogTitle className="text-center">Create Story</DialogTitle>
                                   <DialogDescription className="text-center" />
                            </DialogHeader>

                            <form
                                   onSubmit={handleSubmit(onSubmit)}
                                   className="flex flex-col items-center gap-4"
                            >
                                   {reviewStory ? (
                                          <div className="flex flex-col items-center gap-4 w-full">
                                                 <button type="button" onClick={backButton} className="self-start">
                                                        <IoMdArrowBack
                                                               size={30}
                                                               className="hover:text-white text-gray-500 transition-all duration-500 hover:scale-110 cursor-pointer"
                                                        />
                                                 </button>

                                                 {fileType === "image" && (
                                                        <img
                                                               src={reviewStory}
                                                               className="w-full max-w-sm h-80 object-cover rounded-xl border border-gray-600 shadow-md"
                                                        />
                                                 )}

                                                 {fileType === "video" && (
                                                        <video
                                                               src={reviewStory}
                                                               controls
                                                               className="w-full max-w-sm h-80 rounded-xl border border-gray-600 shadow-md"
                                                        />
                                                 )}

                                                 <button
                                                        disabled={isSubmitting}
                                                        type="submit"
                                                        className="w-full max-w-sm p-3 bg-gray-700 hover:bg-gray-900 text-white font-semibold rounded-2xl
                                                        transition-all flex justify-center items-center gap-2 cursor-pointer duration-700"
                                                 >
                                                        {isSubmitting ? (
                                                               <ClipLoader size={25} color="white" />
                                                        ) : (
                                                               "Upload Story"
                                                        )}
                                                 </button>
                                          </div>
                                   ) : (
                                          <div className="flex items-center justify-center text-center w-full">
                                                 <label
                                                        htmlFor="post"
                                                        className="border border-gray-400 bg-gray-800 flex items-center justify-center cursor-pointer 
                                                        rounded-lg py-6 hover:bg-gray-600 duration-500 md:w-sm sm:w-72 w-40"
                                                 >
                                                        <MdCameraswitch
                                                               size={80}
                                                               className="duration-500 hover:scale-125 transition-transform"
                                                        />
                                                 </label>

                                                 <input
                                                        id="post"
                                                        type="file"
                                                        accept="image/*,video/*"
                                                        hidden
                                                        {...register("media", {
                                                               required: "Please select a file",
                                                               onChange: handleFileChange,
                                                        })}
                                                 />
                                          </div>
                                   )}
                            </form>

                            <DialogFooter />
                     </DialogContent>
              </Dialog>
       );
}


