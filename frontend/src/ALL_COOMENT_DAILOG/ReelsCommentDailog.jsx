import {
       Dialog,
       DialogClose,
       DialogContent,
       DialogFooter,
       DialogHeader,
       DialogTitle,
       DialogTrigger,
} from "@/components/ui/dialog";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function ReelsCommentDailog({ reelsId, initialComments  }) {

       // ✅ page reload pe bhi comments aayenge
       const [commentList, setCommentList] = useState(initialComments);

       const {
              register,
              handleSubmit,
              reset,
              formState: { errors, isSubmitting }
       } = useForm();

       const comment = async (data) => {
              try {
                     const res = await axios.post(`/api/comment/${reelsId}`,data,{ withCredentials: true });

                     if (res.data.success) {
                            toast.success(res.data.message);
                            // ✅ new comment top pe add
                            setCommentList((prev) => [res.data.data, ...prev]);
                            reset();
                     }
              } 
              catch (error) {
                     toast.error(error.response?.data?.message || "Comment failed");
              }
       };

       return (
              <Dialog>
                     <DialogTrigger asChild>
                            <FaRegComment size={30} className="cursor-pointer drop-shadow-lg" />
                     </DialogTrigger>

                     <DialogContent className="h-full bg-black text-gray-300 overflow-y-scroll scrollbar-hide">
                            <DialogHeader>
                                   <DialogTitle>Comments</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4 mb-24">
                                   {commentList.length === 0 && (
                                          <p className="text-center text-gray-500">No comments yet.</p>
                                   )}

                                   {commentList.map((cmt) => (
                                          <div key={cmt._id} className="space-y-1">
                                                 <div className="flex items-center gap-3">
                                                        <Avatar
                                                               src={cmt.author?.profilePic}
                                                               round
                                                               size="40"
                                                        />
                                                        <p className="font-semibold">
                                                               {cmt.author?.userName}
                                                        </p>
                                                        <p className="text-gray-500 text-xs">
                                                               {new Date(cmt.createdAt).toLocaleDateString()}
                                                        </p>
                                                 </div>

                                                 <p className="text-sm ml-12 text-gray-200">
                                                        {cmt.message}
                                                 </p>
                                          </div>
                                   ))}
                            </div>

                            {/* INPUT */}
                            <div className="w-full sticky bottom-0 bg-black p-3 backdrop-blur-3xl">
                                   <form onSubmit={handleSubmit(comment)} className="relative">
                                          <input
                                                 type="text"
                                                 {...register("message", {
                                                        required: "Comment is required",
                                                        validate: (v) =>
                                                               v.trim().length > 0 || "Comment cannot be empty",
                                                 })}
                                                 placeholder="Add a comment..."
                                                 className="border w-full p-3 rounded-3xl outline-none pr-12 bg-black text-white"
                                          />

                                          {errors.message && (
                                                 <span className="text-red-500 text-xs">
                                                        {errors.message.message}
                                                 </span>
                                          )}

                                          <button
                                                 type="submit"
                                                 disabled={isSubmitting}
                                                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                          >
                                                 {isSubmitting ? "..." : <VscSend size={22} />}
                                          </button>
                                   </form>
                            </div>

                            <DialogFooter>
                                   <DialogClose />
                            </DialogFooter>
                     </DialogContent>
              </Dialog>
       );
}


