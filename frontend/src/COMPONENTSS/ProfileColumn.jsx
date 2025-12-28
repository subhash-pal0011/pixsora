import React from "react";

export default function ProfileColumn(){
  return (
    <div className="space-y-6">
      <div className="bg-[#0f0f12] rounded-2xl p-6 border border-white/5">
        <div className="flex items-center gap-4">
          <img src="https://i.pravatar.cc/120?u=33" className="w-20 h-20 rounded-full" />
          <div>
            <div className="text-xl font-semibold">Andrew</div>
            <div className="text-sm text-gray-400">@andre_17</div>
            <div className="mt-3 flex gap-6 text-center">
              <div><div className="font-semibold">1,234</div><div className="text-xs text-gray-400">Posts</div></div>
              <div><div className="font-semibold">8,789</div><div className="text-xs text-gray-400">Followers</div></div>
              <div><div className="font-semibold">1,234</div><div className="text-xs text-gray-400">Following</div></div>
            </div>
          </div>
        </div>

        <button className="w-full mt-4 py-2 bg-white/5 rounded-lg">Edit Profile</button>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg overflow-hidden bg-gray-800 h-28" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80)`, backgroundSize:'cover' }} />
          <div className="rounded-lg overflow-hidden bg-gray-800 h-28" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504788364811-ec6d9b0f2c73?w=800&q=80)`, backgroundSize:'cover' }} />
        </div>
      </div>

      <div className="bg-[#0f0f12] rounded-2xl p-4 border border-white/5">
        <h4 className="text-sm text-gray-400 mb-3">Recent posts</h4>
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-20 bg-gray-700 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
