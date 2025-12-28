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
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DeletePost({ postId, setPosts, authorId }) {   // ⬅ props add
       const { userData } = useSelector((state) => state.user)
       const navigate = useNavigate()
       const deletePost = async () => {
              try {
                     const res = await axios.delete(`https://pixsora-backend-85ol.onrender.com/api/deletePost/${postId}`, {
                            withCredentials: true,
                     });

                     if (res.data.success) {
                            toast.success(res.data.message);

                            // 🔥 ISSE TURNT POST HUT JAYEHGA JESE HUM DELTE KRENGE.
                            setPosts((prev) => prev.filter((p) => p._id !== postId));
                     }
              }
              catch (error) {
                     console.log(`delete post router : ${error}`);
                     toast.error(error.response?.data?.message);
              }
       };

       return (
              <Dialog>
                     <DialogTrigger asChild>
                            <div className="ml-auto text-xl cursor-pointer font-bold mr-5">...</div>
                     </DialogTrigger>

                     <DialogContent className="bg-black text text-gray-200">
                            <DialogHeader>
                                   <DialogTitle></DialogTitle>
                                   <DialogDescription></DialogDescription>
                            </DialogHeader>

                            <div className="flex gap-5 flex-col text-center ">
                                   {userData?._id === authorId ?
                                          <button
                                                 onClick={deletePost}
                                                 className="border border-gray-800 bg-red-500 text-white font-semibold p-2 rounded-3xl md:rounded-none md:hover:rounded-3xl duration-500 cursor-pointer"
                                          >
                                                 Delete
                                          </button>

                                          :

                                          <button
                                                 className="border border-gray-800 bg-red-500 text-white font-semibold p-2  duration-500 cursor-not-allowed"
                                          >
                                                 Delete
                                          </button>
                                   }

                                   <button
                                          onClick={() => navigate(`/profile/${userData.posts.userName}`)}
                                          className="border border-gray-800 bg-gray-900 text-white font-semibold p-2 rounded-3xl md:rounded-none md:hover:rounded-3xl duration-500 cursor-pointer"
                                   >
                                          Go to Account
                                   </button>



                            </div>

                            <DialogFooter className="cursor-pointer">
                                   <DialogClose asChild></DialogClose>
                            </DialogFooter>
                     </DialogContent>
              </Dialog>
       );
}
