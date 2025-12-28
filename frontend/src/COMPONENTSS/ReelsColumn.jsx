import React from "react";

export default function ReelsColumn(){
  return (
    <div className="bg-[#0f0f12] rounded-2xl p-4 border border-white/5 h-[720px] flex flex-col justify-center items-center">
      <div className="w-full h-[520px] rounded-2xl overflow-hidden bg-gray-800" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80)`, backgroundSize:'cover' }} />
      <div className="mt-4 w-full flex items-center justify-between">
        <div>
          <div className="font-semibold">pxr_ann</div>
          <div className="text-xs text-gray-400">Exploring the city</div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-lg">♡</button>
          <button>💬</button>
        </div>
      </div>
    </div>
  );
}
