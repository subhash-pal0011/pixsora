import React from "react";

export default function PostCard({ author, avatar, image, caption }) {
       return (
              <div className="bg-[#0f0f12] rounded-2xl border border-white/5 overflow-hidden">
                     <div className="p-4 flex items-center gap-3">
                            <img src={avatar} className="w-11 h-11 rounded-full" />
                            <div>
                                   <div className="font-semibold">{author}</div>
                                   <div className="text-xs text-gray-400">San Francisco</div>
                            </div>
                            <button className="ml-auto">•••</button>
                     </div>

                     <div className="w-full h-72 bg-center bg-cover" style={{ backgroundImage: `url(${image})` }} />

                     <div className="p-4 space-y-3">
                            <div className="flex items-center gap-4">
                                   <button className="text-2xl">♡</button>
                                   <button>💬</button>
                                   <button>↗</button>
                            </div>
                            <div className="text-sm text-gray-300">
                                   <strong className="mr-2">{author}</strong>{caption}
                            </div>
                     </div>
              </div>
       );
}
