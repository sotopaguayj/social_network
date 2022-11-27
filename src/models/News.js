import { Schema, model, models } from "mongoose";

const NewsModel = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      name: {
        type: String,
      },
      size: {
        type: Number,
      },
      type: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.newsModel || model("newsModel", NewsModel);
