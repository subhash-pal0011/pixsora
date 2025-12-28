import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import {
       Select,
       SelectContent,
       SelectGroup,
       SelectItem,
       SelectLabel,
       SelectTrigger,
       SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const EditProfile = () => {
       const navigate = useNavigate();
       const userData = useSelector((state) => state.user.userData);

       // for profile picture preview
       const [previewImage, setPreviewImage] = useState(userData?.profilePic || "/empty-img.jpg");
       const [isImageEdited, setIsImageEdited] = useState(false);

       const {
              register,
              handleSubmit,
              setValue,
              formState: { errors, isSubmitting, dirtyFields },
       } = useForm({
              // YE KRTA HII KI AGR KOI PAHLE SE VALUE HII TO RHEN DO JBTK USER CHANGE NA KRE.
              defaultValues: {
                     userName: userData?.userName || "",
                     bio: userData?.bio || "",
                     gender: userData?.gender || "",
                     profession: userData?.profession || "",
              },
       });

       const onSubmit = async (data) => {
              try {
                     const formData = new FormData();

                     formData.append("userName", data.userName);
                     formData.append("bio", data.bio);
                     formData.append("gender", data.gender);
                     formData.append("profession", data.profession);

                     if (data.profilepic) {
                            formData.append("profilepic", data.profilepic[0]);
                     }
                     const res = await axios.post("http://localhost:8000/api/editProfile", formData, {
                            headers: { "Content-Type": "multipart/form-data" },
                            withCredentials: true
                     });
                     if(res.data.success){
                            toast.success(res.data.message)
                            navigate(`/profile/${data.userName}`);
                     }
              } 
              catch (error) {
                     console.log(`error editProfile : ${error}`);
                     toast.error(error.response?.data?.message);
              }
       };


       // profile picture change function
       const handleImageChange = (e) => {
              const file = e.target.files[0];
              if (!file) return;

              // preview
              setPreviewImage(URL.createObjectURL(file));

              // send to form
              setValue("profilepic", e.target.files, { shouldDirty: true });

              // mark as edited
              setIsImageEdited(true);
       };

       //               ITNE MEA SE KOI BHI INPUT MEA KOI CHANGE HUA TO BUTTON PE DEKHO.
       const isEdited =
              dirtyFields.userName ||
              dirtyFields.bio ||
              dirtyFields.gender ||
              dirtyFields.profession ||
              isImageEdited; // image change included

       return (
              <div className="w-full min-h-screen bg-black text-white">
                     <div className="flex items-center space-x-3 p-5">
                            <IoArrowBackOutline
                                   onClick={() => navigate(`/profile/${userData.userName}`)}
                                   size={25}
                                   className="cursor-pointer text-gray-400 hover:text-white transition-all duration-500 hover:scale-100"
                            />
                            <p className="text-md font-semibold">Edit Profile</p>
                     </div>

                     <div className="flex flex-col items-center text-center space-y-3 mt-5">
                            {/* <img
                                   src={previewImage}
                                   className="w-28 h-28 object-cover rounded-full border border-gray-700"
                            /> */}
                            <Avatar src={previewImage} round />

                            <label
                                   htmlFor="profilePic"
                                   className="text-blue-500 font-semibold cursor-pointer"
                            >
                                   Change Your Profile Picture
                            </label>

                            <input
                                   id="profilePic"
                                   type="file"
                                   accept="image/*"
                                   className="hidden"
                                   onChange={handleImageChange}
                            />
                     </div>


                     <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col space-y-4 px-6 mt-6 max-w-xl mx-auto  "
                     >
                            <input
                                   {...register("userName", {
                                          required:"Its Requierd*",
                                          validate: (value) => value.trim().length === 0 && value.length > 0 ? "Space not Sllowed !" : true
                                   })}
                                   type="text"
                                   placeholder="Enter Username"
                                   className="border border-gray-700 p-3 rounded-xl text-white outline-none"
                            />
                            {errors.userName && (
                                   <p className="text-red-500 text-sm font-semibold">{errors.userName.message}</p>
                            )}
                            <input
                                   {...register("profession", {
                                          validate: (value) => value.trim().length === 0 && value.length > 0 ?
                                                 "Space not Sllowed !" : true
                                   })}
                                   type="text"
                                   minLength={5}
                                   maxLength={89}
                                   placeholder="Enter your profession"
                                   className="border border-gray-700 p-3 rounded-xl text-white outline-none"
                            />
                            {errors.profession && (
                                   <p className="text-red-500 text-sm font-semibold">{errors.profession.message}</p>
                            )}

                            <Select
                                   defaultValue={userData?.gender}
                                   onValueChange={(value) =>
                                          setValue("gender", value, { shouldDirty: true })
                                   }
                            >
                                   <SelectTrigger className="w-full py-6 rounded-xl bg-black text-white border border-gray-700">
                                          <SelectValue placeholder="Select Gender" />
                                   </SelectTrigger>

                                   <SelectContent className="bg-black text-white border border-gray-700 rounded-xl">
                                          <SelectGroup>
                                                 <SelectLabel className="text-gray-400">Gender</SelectLabel>

                                                 <SelectItem value="male">Male</SelectItem>
                                                 <SelectItem value="female">Female</SelectItem>
                                                 <SelectItem value="other">Other</SelectItem>
                                          </SelectGroup>
                                   </SelectContent>
                            </Select>

                            <input
                                   {...register("bio", {
                                          validate: (value) => value.trim().length === 0 && value.length > 0 ?
                                                 "Space not Sllowed !" : true
                                   })}
                                   type="text"
                                   placeholder="Enter Bio"
                                   minLength={5}
                                   maxLength={89}
                                   className="border border-gray-700 p-3 rounded-xl text-white outline-none"
                            />
                            {errors.bio && (
                                   <p className="text-red-500 text-sm font-semibold">{errors.bio.message}</p>
                            )}
                            {isEdited ?
                                   <button
                                          disabled={isSubmitting}
                                          type="submit"
                                          className="bg-blue-600 p-3 rounded-xl font-semibold hover:bg-blue-700 cursor-pointer"
                                   >
                                          {isSubmitting ? <ClipLoader size={25} color="white"/> : "Save Changes"}
                                   </button> :

                                   <p
                                          className="bg-blue-600 p-3 rounded-xl font-semibold hover:bg-blue-700 cursor-not-allowed text-center"
                                   >
                                          Save Changes
                                   </p>
                            }
                     </form>
              </div>
       );
};

export default EditProfile;
