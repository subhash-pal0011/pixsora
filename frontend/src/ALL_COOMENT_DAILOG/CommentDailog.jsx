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
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "@/socket";

export function CommentDailog({ postId, comments }) {
       const [commentList, setCommentList] = useState(comments || []);
       const { userData } = useSelector((state => state.user))

       const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();


       useEffect(() => {
              const handleNewComment = ({ postId: incomingPostId, comment }) => {
                     if (incomingPostId !== postId) return;

                     setCommentList(prev => {
                            // duplicate prevent
                            const exists = prev.some(c => c._id === comment._id);
                            if (exists) return prev;

                            return [comment, ...prev];
                     });
              };
              socket.on("newComment", handleNewComment);
              return () => {
                     socket.off("newComment", handleNewComment);
              };
       }, [postId]);


       const comment = async (data) => {
              try {
                     const res = await axios.post(`/api/commentPost/${postId}`,data,
                            { withCredentials: true }
                     );

                     if (res.data.success) {
                            toast.success(res.data.message);

                            //🔥HUME NEW COMMENT Ko top pe deikhna chate hii
                            setCommentList(prev => [res.data.data, ...prev]);

                            socket.emit("postComment", {
                                   postId,
                                   comment: res.data.data,
                            });

                            reset();
                     }
              } 
              catch (error) {
                     toast.error(error.response?.data?.message);
              }
       };


       const deleteComment = async (commentId) => {
              try {
                     const res = await axios.delete(`/api/deleteComment/${postId}/${commentId}`, { withCredentials: true });
                     if (res.data.success) {
                            toast.success(res.data.message);
                            setCommentList(prev => prev.filter(cmt => cmt._id !== commentId));  //HUM FILTER KR DENGE TBHI HUME UI SE DELETE KRTE DIKHEGA NHITO PAGE KO RELOD KRNA PADEGA.
                     }
              } catch (error) {
                     console.log("deleteCommentError:", error);
                     toast.error(error.response?.data?.message);
              }
       };

       return (
              <Dialog>
                     <DialogTrigger asChild>
                            <FaRegComment size={20} className="cursor-pointer" />
                     </DialogTrigger>

                     <DialogContent className="h-full bg-black text-gray-400 overflow-y-scroll scrollbar-hide">
                            <DialogHeader>
                                   <DialogTitle>Comments</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4 mb-20">
                                   {commentList.length === 0 && <p className="text-center text-gray-500">No comments yet.</p>}

                                   {commentList?.map(cmt => (
                                          <div key={cmt._id}>
                                                 <div className="flex items-center gap-3">
                                                        <Avatar src={cmt.author?.profilePic || "empty-img.jpg"} round size="40" />
                                                        <p className="font-semibold">{cmt.author?.userName}</p>
                                                        <p className="text-gray-500 text-sm">{new Date(cmt.createdAt).toLocaleDateString()}</p>
                                                        {cmt.author?._id === userData?._id &&
                                                               <MdDelete
                                                                      onClick={() => deleteComment(cmt._id)}
                                                                      className="hover:text-red-600 cursor-pointer ml-auto"
                                                               />
                                                        }
                                                 </div>
                                                 <div className="text-sm font-semibold ml-12">{cmt.message}</div>
                                          </div>
                                   ))}
                            </div>

                            <div className="w-full max-h-1/2 sticky bottom-0 bg-black p-3 rounded-3xl backdrop-blur-3xl">
                                   <form onSubmit={handleSubmit(comment)} className="relative">
                                          <input
                                                 type="text"
                                                 {...register("message", {
                                                        required: "Comment is required",
                                                        validate: value => value.trim().length > 0 || "Comment cannot be empty",
                                                 })}
                                                 placeholder="Enter the message"
                                                 className="border w-full p-3 rounded-3xl outline-none pr-12 text-white"
                                          />
                                          {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}

                                          <button type="submit" disabled={isSubmitting} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900 cursor-pointer">
                                                 {isSubmitting ? "..." : <VscSend size={24} />}
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


