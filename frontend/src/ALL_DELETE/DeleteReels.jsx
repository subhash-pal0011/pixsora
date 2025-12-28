import {
       Dialog,
       DialogTrigger,
       DialogContent,
       DialogFooter,
       DialogClose,
       DialogHeader,
       DialogTitle,
       DialogDescription

} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";

export function DeleteReels({ reelsId, setReels }) {  // ⬅ props add data

       const deleteReel = async () => {
              try {
                     const res = await axios.delete(
                            `/api/deleteReels/${reelsId}`,
                            { withCredentials: true }
                     );

                     if (res.data.success) {
                            setReels((prev) =>
                                   prev.filter((r) => r._id !== reelsId)
                            );
                            toast.success(res.data.message);
                     }
              } catch (error) {
                     toast.error(error.response?.data?.message);
              }
       };

       return (
              <Dialog>
                     <DialogTrigger asChild>
                            <div className="cursor-pointer text-xl font-bold">...</div>
                     </DialogTrigger>

                     <DialogContent className="bg-black text-gray-200">
                            <DialogHeader>
                                   <DialogTitle></DialogTitle>
                                   <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 text-center">
                                   <button
                                          onClick={deleteReel}
                                          className="border border-gray-800 bg-red-500 text-white font-semibold p-2 rounded-3xl md:rounded-none md:hover:rounded-3xl duration-500 cursor-pointer"
                                   >
                                          Delete
                                   </button>

                                   <DialogClose asChild>
                                          <button className="border border-gray-800 text-white font-semibold p-2 rounded-3xl md:rounded-none md:hover:rounded-3xl transition-all duration-500 ease-in-out cursor-pointer">
                                                 Cancel
                                          </button>
                                   </DialogClose>
                            </div>

                            <DialogFooter />
                     </DialogContent>
              </Dialog>
       );
}

