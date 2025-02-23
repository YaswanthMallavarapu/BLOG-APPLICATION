import mongoose from "mongoose";
import {Schema} from "mongoose"
const PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    author:{type:Schema.Types.ObjectId,ref:'User'},
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", PostSchema);
export default Post;
