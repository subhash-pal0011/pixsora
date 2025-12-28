import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
       name: "user",
       initialState: {
              // jb data lena rahega to userData is name se likk kr lenge
              userData: null, // null means user NOT logged in
              profileData: null
       },
       reducers: {
              //setUser yaha jo store karyenge 
              setUsers: (state, action) => {
                     state.userData = action.payload;
              },
              logoutUser: (state) => {
                     state.userData = null;
                     state.profileData = null
              },
              setProfileData: (state, action) => {
                     state.profileData = action.payload;
              },

              // 🔥 FOLLOW / UNFOLLOW BOTH
              updateFollowers: (state, action) => {
                     // isFollowing ISE GET action.payload SE IS LIYA KIYA KYUKI FOLLOW UNFOLLOW CONTROLER SE BHEJ RHE HII HUTA BHI SKTE HII.
                     const { targetUser, isFollowing, targetUserId } = action.payload;
                     if (!state.userData || !state.userData.following) return;
                     if (isFollowing) {
                            //✅FOLLOW
                            state.userData.following.push(targetUser);
                     } else {
                            // UNFOLLOW
                            state.userData.following = state.userData.following.filter(
                                   (user) => user._id !== targetUserId
                            );
                     }
              },
       }
});
//            yaha export bhi krenge.
//           setUser jb data dena rhega to yaha se data denge.
export const { setUsers, logoutUser, setProfileData, updateFollowers } = UserSlice.actions;
export default UserSlice.reducer;


