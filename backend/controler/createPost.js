import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";
import { uploadCloudinary } from "../storageSetup/uplodCloudenry.js";

export const createPost = async (req, res) => {
       try {
              const { caption, mediaType } = req.body;

              // 👉 Jo file upload hui hai wo receive karo
              let media;
              if (req.file) {
                     media = await uploadCloudinary(req.file.path); //👉 req.file.path humne hisb se path le lega jo bhi rhega kuki humne CLOUDENRY MEA resource_type AUTO rkha hii.
              }
              else {
                     return res.status(400).json({
                            success: false,
                            message: "Media is required",
                     });
              }
              const post = await Post.create({
                     caption,
                     mediaType,
                     media,
                     author: req.userId
              });
              const user = await User.findById(req.userId)
              user.posts.push(post._id) // user schema mea jo post hii uske under bhi to bhejni hii na isliye .. aur hum post ki id hi kevl bhej rhe hii kyuki post mea kevl id hii.
              await user.save()

              //👉 Populate → kyunki author me sirf ID hai
              const findUserOfPost = await Post.findById(post._id)
                     .populate("author", "name userName profilePic");

              return res.status(201).json({
                     success: true,
                     message: "Post created successfully",
                     data: findUserOfPost,
              });
       }
       catch (error) {
              console.error("Post create error:", error);
              return res.status(500).json({
                     success: false,
                     message: "Internal server error",
              });
       }
};
