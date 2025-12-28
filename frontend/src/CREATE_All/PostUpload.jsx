import {
       Dialog,
       DialogTrigger,
       DialogContent,
       DialogHeader,
       DialogTitle,
       DialogDescription,
       DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { MdCameraswitch } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setPost } from "@/REDUX/UplodSlice";


export function PostUpload() {
       const [reviewPost, setReviewPost] = useState(null) // ⭐  POST KO SELCR KRKE DEIKHAN HII IS LIYE.
       const [fileType, setFileType] = useState(null)// ⭐ check krne ke liye img hii ya video.
       const dispatch = useDispatch()

       const {
              register,
              handleSubmit,
              reset,
              formState: { errors, isSubmitting },
       } = useForm()

       const handleFileChange = (e) => {
              // file ISE CONSOLE MEA LAGA KE DEKH LO KYU [0] LAGTE HII KYKI O NO PE HII file mea URL MIL JATA HII IS LIYE.
              const file = e.target.files[0];
              if (!file) return
              const url = (URL.createObjectURL(file));
              setReviewPost(url)

              if (file.type.startsWith("image/")) {
                     setFileType("image")
              }
              // ⭐ else if is liye lage else case mea agr file bhi send krte to video mea le leta is liye USE.
              else if (file.type.startsWith("video/")) {
                     setFileType("video")
              }
       };

       const backButton = () => {
              setReviewPost(null)
              setFileType(null)
       }

       const onSubmit = async (data) => {
              const formData = new FormData();
              formData.append("caption", data.caption);
              formData.append("media", data.media[0]);
              formData.append("mediaType", fileType);

              try {
                     const res = await axios.post(
                            "https://pixsora-backend-85ol.onrender.com/api/createPost",formData,
                            {
                                   headers: { "Content-Type": "multipart/form-data" },
                                   withCredentials: true,
                            }
                     );

                     if (res.data.success) {
                            toast.success(res.data.message);
                            reset();
                            setReviewPost(null);
                            setFileType(null);
                            dispatch(setPost(res.data.data))
                     }
              }
              catch (error) {
                     console.log(error);
                     toast.error(error.response?.data?.message);
              }
       };

       return (
              <Dialog>
                     <DialogTrigger asChild>
                            <div className="md:w-20 h-[35px] flex items-center justify-center font-semibold cursor-pointer rounded-md
                                   hover:bg-gray-800 hover:border hover:border-gray-500
                                   transition-transform duration-200 hover:scale-105">
                                   Post
                            </div>
                     </DialogTrigger>

                     <DialogContent className="bg-black text-gray-200">
                            <DialogHeader>
                                   <DialogTitle className="text-center">Create Post</DialogTitle>
                                   <DialogDescription className="text-center"></DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
                                   {reviewPost ? (
                                          <div className="flex flex-col items-center gap-4 w-full">
                                                 <button type="button" onClick={backButton} className="self-start">
                                                        <IoMdArrowBack
                                                               size={30}
                                                               className="hover:text-white text-gray-500 transition-all duration-500 hover:scale-110 cursor-pointer"
                                                        />
                                                 </button>

                                                 {fileType === "image" && (
                                                        <img
                                                               src={reviewPost}
                                                               className="w-full max-w-sm h-80 object-cover rounded-xl border border-gray-600 shadow-md"
                                                        />
                                                 )}

                                                 {fileType === "video" && (
                                                        <video
                                                               src={reviewPost}
                                                               controls
                                                               className="w-full max-w-sm h-80 rounded-xl border border-gray-600 shadow-md"
                                                        />
                                                 )}

                                                 <input
                                                        type="text"
                                                        placeholder="Write Caption"
                                                        maxLength={100}
                                                        {...register("caption", {
                                                               validate: (value) =>
                                                                      value.trim().length > 0 || value === "" || "Spaces only are not allowed",
                                                        })}
                                                        className="w-full max-w-sm p-3  rounded outline-none transition-all "

                                                 />
                                                 {errors.caption && (
                                                        <span className="text-red-500 text-sm">{errors.caption.message}</span>
                                                 )}

                                                 <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full max-w-sm p-3 bg-gray-700 hover:bg-gray-900 text-white font-semibold rounded-2xl
                                                        transition-all disabled:opacity-50 flex justify-center items-center gap-2 cursor-pointer duration-700"
                                                 >
                                                        {isSubmitting ? <ClipLoader size={25} color="white" /> : "Submit Post"}
                                                 </button>
                                          </div>
                                   ) : (
                                          // ⭐ File select section
                                          <div className="flex flex-col items-center gap-4 w-full">
                                                 <label
                                                        htmlFor="post"
                                                        className="border border-gray-400 bg-gray-800 flex items-center justify-center cursor-pointer 
                                                        rounded-lg py-6 mx-8 hover:bg-gray-600 duration-500 
                                                        md:w-sm sm:w-72 w-40"
                                                 >
                                                        <MdCameraswitch
                                                               size={80}
                                                               className="duration-500 hover:scale-125 transition-transform"
                                                        />
                                                 </label>

                                                 <input
                                                        id="post"
                                                        type="file"
                                                        accept="image/*,video/*" //⭐ Allow both image + video.
                                                        hidden
                                                        {...register("media", {
                                                               required: true,
                                                               //⭐ ON CHANGE JB FILE SELECT KRNI RHTI HII TO USE 
                                                               onChange: (e) => {
                                                                      handleFileChange(e); // E IS LIYE LIKHNA PADA KYUKI HUM JO SELECT KR RHE HII FILE KA ACTUAL DATA CHAHIYE ACTUAL DATA HUM APNE REVIEW POST MEA DIKHA RHE HII TO E LIKH KR DIKHA DIYE.
                                                               }
                                                               // onChange:handleFileChange 
                                                        })}
                                                 />

                                                 {errors.media && <span className="text-red-500">This field is required</span>}
                                          </div>
                                   )}
                            </form>

                            <DialogFooter></DialogFooter>
                     </DialogContent>
              </Dialog >
       );
}
