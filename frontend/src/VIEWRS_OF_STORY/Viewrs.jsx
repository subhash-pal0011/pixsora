import {
       Dialog,
       DialogContent,
       DialogDescription,
       DialogFooter,
       DialogHeader,
       DialogTitle,
       DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { FaRegEye } from "react-icons/fa6";
import { useSelector } from "react-redux";

export function Viewrs({ storyId }) {
       const [viewrs, setViewrs] = useState([]);
       const { userData } = useSelector((state) => state.user);


       useEffect(() => {
              if (!storyId || !userData?._id) return;

              const fetchViewrs = async () => {
                     try {
                            const res = await api.get(`/api/story/viewers/${storyId}`);

                            if (res.data.success) {
                                   setViewrs(res.data.data);
                            }
                     } catch (error) {
                            console.log("fetch viewers error:", error.response?.status);
                     }
              };

              fetchViewrs();
       }, [storyId, userData?._id]);


       return (
              <Dialog>
                     <DialogTrigger asChild>
                            <FaRegEye size={20} className="text-gray-900 cursor-pointer" />
                     </DialogTrigger>

                     <DialogContent className="sm:max-w-[425px] bg-gray-950 text-white">
                            <DialogHeader>
                                   <DialogTitle className="text-center">Views of story</DialogTitle>
                                   <DialogDescription />
                            </DialogHeader>

                            <div className="space-y-3 max-h-[300px] overflow-y-auto">
                                   {viewrs.length > 0 ? (
                                          viewrs.map((item) => (
                                                 <div
                                                        key={item._id}
                                                        className="flex items-center gap-3 p-2 rounded-sm border border-gray-900 shadow shadow-black"
                                                 >
                                                        <Avatar src={item.profilePic} round size="40" />
                                                        <p className="text-sm font-medium">{item.userName}</p>
                                                 </div>
                                          ))
                                   ) : (
                                          <p className="text-center text-gray-500 text-sm">No views yet</p>
                                   )}
                            </div>

                            <DialogFooter />
                     </DialogContent>
              </Dialog>
       );
}


