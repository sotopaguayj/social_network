import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
      name: {
        type: String,
      },
      role: {
        type: Number,
      },
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.postModel || model("postModel", PostSchema);
