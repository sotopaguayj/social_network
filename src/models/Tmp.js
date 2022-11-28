import { Schema, model, models } from "mongoose";

const Tmp = new Schema(
  {
    name: {
      type: String,
    },
    link: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default models.Tmp || model("Tmp", Tmp);
