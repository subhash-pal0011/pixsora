import React from "react";

const convos = [
  { name: "pxr_ann", msg: "Sure, let's do that!", img: "https://i.pravatar.cc/60?u=11" },
  { name: "andre_17", msg: "Sounds good!", img: "https://i.pravatar.cc/60?u=3" },
  { name: "sophia", msg: "Nice!", img: "https://i.pravatar.cc/60?u=4" },
  { name: "juanna", msg: "Sure thing!", img: "https://i.pravatar.cc/60?u=7" },
];

export default function MessagesColumn(){
  return (
    <div className="bg-[#0f0f12] rounded-2xl p-4 border border-white/5 h-[720px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Messages</h3>
        <button className="text-xl">＋</button>
      </div>

      <div className="bg-[#0b0b0d] p-2 rounded-xl mb-4">
        <input className="w-full bg-transparent placeholder:text-gray-500 outline-none" placeholder="Search" />
      </div>

      <div className="space-y-3 overflow-auto h-[600px] pr-2">
        {convos.map(c => (
          <div key={c.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/3">
            <img src={c.img} className="w-12 h-12 rounded-full" />
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-400 truncate w-40">{c.msg}</div>
            </div>
            <div className="ml-auto text-xs text-gray-500">2h</div>
          </div>
        ))}
      </div>
    </div>
  );
}
