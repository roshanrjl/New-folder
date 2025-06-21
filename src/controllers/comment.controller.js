import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!videoId) {
    throw new ApiError(400, "can't find the video");
  }

  const skip = (page - 1) * limit;
  const comment = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: Number(limit),
    },
    {
      $lookup: {
        from: User,
        localField: "user",
        foreignField: "_id",
        as: user,
      },
    },
    {
      $unwind: "$user", //conver the user array into single object
    },
    {
      $project: {
        _id: 1,
        content: 1,
        video:1,
        createdAt: 1,
        updatedAt: 1,
        "user._id": 1,
        "user.username": 1,
        "user.avatar": 1,
      },
    },
  ]);

  return res 
            .status(200)
            .json(new ApiResponse(200 ,comment ,"comment feched successfully"))
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
});

export { getVideoComments, addComment, updateComment, deleteComment };
