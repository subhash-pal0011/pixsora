import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
       name: {
              type: String,
              required: true,
       },
       userName: {
              type: String,
              required: true,
              unique: true,
       },
       email: {
              type: String,
              required: true,
              unique: true,
       },
       password: {
              type: String,
              required: true,
       },
       isVerified: {
              type: Boolean,
              default: false,
       },
       isLogin: {
              type: Boolean,
              default: false,
       },
       otp: {
              type: String,
              default: null,
       },
       otpExp: {
              type: Date,
              default: null,
       },
       profilePic: {
              type: String,
              default: "",
       },
       bio: {
              type: String,
              default: "",
       },
       onlineUser: {
              type: Boolean,
              default: false,
       },
       profession: {
              type: String,
              default: "",
       },
       gender: {
              type: String,
              enum: ["male", "female", "other"],
              default: "other",
       },

       posts: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Post",
              },
       ],

       reels: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Reels"
              }
       ],

       story: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Story",
              }
       ],

       follower: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User",
              },
       ],

       following: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "User",
              },
       ],

       share: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Share",
              },
       ],
       saved: [
              {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Post"
              }
       ]
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
