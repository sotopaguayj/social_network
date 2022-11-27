import { dbConex } from "utils/mongoose";
import userModel from "models/User";
import Posts from "models/News";

dbConex();
export default async function addUser(req, res) {
  let date = new Date();
  let today = date.toISOString();
  console.log(today);
  const { body } = req;
  let postCont = {
    body: body.body,
    comments: [],
    likes: 0,
    fecha: today,
  };

  await userModel
    .updateOne({ "data.user": body.user }, { $push: { posts: postCont } })
    .then((val) => {
      if (val.modifiedCount == 1) return res.status(201).json("postCreated");
      console.log("Algo salio mal, contacte al encargado");
    });
}
