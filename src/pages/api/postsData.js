import { dbConex } from "utils/mongoose";
import userModel from "models/User";
import axios from "axios";

dbConex();

export default async function postsData(req, res) {
  let arrPosts = [];
  await userModel.find().then((val) => {
    for (let i = 0; i < val.length; i++) {
      val[i].posts.map((element) => {
        element.user = val[i].data.user;
        element.date = val[i].createdAt;
        arrPosts.push(element);
      });
    }
  });
  return res.status(200).json(arrPosts);
}
