// import {
//        Dialog,
//        DialogTrigger,
//        DialogContent,
//        DialogHeader,
//        DialogTitle,
//        DialogDescription,
//        DialogFooter,
// } from "@/components/ui/dialog";

// import { IoAddCircleOutline } from "react-icons/io5";

// export function CreateAll() {
//        return (
//               <Dialog>
//                      <DialogTrigger asChild>
//                             <IoAddCircleOutline
//                                    size={30}
//                                    className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-transform duration-200"
//                             />
//                      </DialogTrigger>

//                      <DialogContent className="bg-black text-gray-200">
//                             <DialogHeader>
//                                    <DialogTitle className="text-center">Create Post</DialogTitle>
//                                    <DialogDescription className="text-center">
//                                           Like story & post reels
//                                    </DialogDescription>
//                             </DialogHeader>

//                             <div className="flex justify-center md:space-x-4 space-x-5 md:p-2 p-1">
//                                    <div className="md:w-20 h-[35px] flex items-center justify-center font-semibold cursor-pointer rounded-md
//                                    hover:bg-gray-800 hover:border hover:border-gray-500
//                                    transition-transform duration-200 hover:scale-105">
//                                           Post
//                                    </div>

//                                    <div className="md:w-20 h-[35px] flex items-center justify-center font-semibold cursor-pointer rounded-md
//                                    hover:bg-gray-800 hover:border hover:border-gray-500
//                                    transition-transform duration-200 hover:scale-105">
//                                           Reels
//                                    </div>

//                                    <div className="md:w-20 h-[35px] flex items-center justify-center font-semibold cursor-pointer rounded-md
//                                    hover:bg-gray-800 hover:border hover:border-gray-500
//                                    transition-transform duration-200 hover:scale-105">
//                                           Story
//                                    </div>
//                             </div>
//                             <DialogFooter></DialogFooter>
//                      </DialogContent>
//               </Dialog>
//        );
// }



import {
       Dialog,
       DialogTrigger,
       DialogContent,
       DialogHeader,
       DialogTitle,
       DialogDescription,
       DialogFooter,
} from "@/components/ui/dialog";

import { IoAddCircleOutline } from "react-icons/io5";
import { PostUpload } from "./PostUpload";
import { CreateStory } from "./CreateStory";
import { ReelsUplod } from "./ReelsUplod";

export function CreateAll() {
       return (
              <Dialog>
                     <DialogTrigger asChild>
                            <IoAddCircleOutline
                                   size={25}
                                   className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-transform duration-200"
                            />
                     </DialogTrigger>

                     <DialogContent className="bg-black text-gray-200">
                            <DialogHeader>
                                   <DialogTitle className="text-center">Create Post</DialogTitle>
                                   <DialogDescription className="text-center">
                                          Like story & post reels
                                   </DialogDescription>
                            </DialogHeader>

                            <div className="flex justify-center md:space-x-4 space-x-5 md:p-2 p-1">
                                   <PostUpload />
                                   <ReelsUplod />
                                   <CreateStory />
                            </div>
                            <DialogFooter></DialogFooter>
                     </DialogContent>
              </Dialog>
       );
}
