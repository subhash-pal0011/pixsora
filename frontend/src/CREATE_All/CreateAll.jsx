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
