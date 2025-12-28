import React from "react";
import PostCard from "./PostCard";

const stories = [
       { name: "pxr_ann", img: "https://i.pravatar.cc/80?u=1" },
       { name: "clayton", img: "https://i.pravatar.cc/80?u=2" },
       { name: "andre_17", img: "https://i.pravatar.cc/80?u=3" },
       { name: "sophia", img: "https://i.pravatar.cc/80?u=4" },
];

export default function FeedColumn() {
       return (
              <div className="space-y-6">
                     <div className="bg-[#0f0f12] rounded-2xl p-4 border border-white/5">
                            <div className="flex items-center justify-between">
                                   <h2 className="text-2xl font-semibold">Pixora</h2>
                                   <button className="p-2 rounded-md hover:bg-white/5">✈</button>
                            </div>

                            {/* stories */}
                            <div className="mt-5">
                                   <div className="flex gap-3 overflow-x-auto pb-2">
                                          {stories.map(s => (
                                                 <div key={s.name} className="flex flex-col items-center">
                                                        <img src={s.img} alt={s.name} className="w-14 h-14 rounded-full ring-2 ring-purple-600/70" />
                                                        <span className="text-xs mt-1 text-gray-300">{s.name}</span>
                                                 </div>
                                          ))}
                                   </div>
                            </div>
                     </div>

                     <PostCard
                            author="pxr_ann"
                            avatar="https://i.pravatar.cc/80?u=11"
                            image="https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1000&q=80"
                            caption="Enjoying the views at the Golden Gate!"
                     />

                     {/* small feed card */}
                     <div className="bg-[#0f0f12] rounded-2xl p-4 border border-white/5">
                            <h3 className="text-sm text-gray-400">Suggested</h3>
                            <div className="mt-3 flex items-center gap-3">
                                   <img src="https://i.pravatar.cc/60?u=20" className="w-12 h-12 rounded-full" />
                                   <div>
                                          <div className="font-semibold">pxr_am</div>
                                          <div className="text-xs text-gray-400">Exploring the city</div>
                                   </div>
                                   <button className="ml-auto text-sm px-3 py-1 bg-purple-600 rounded-lg">Follow</button>
                            </div>
                     </div>
              </div>
       );
}
