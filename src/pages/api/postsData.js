import { dbConex } from "utils/mongoose";
import postModel from "models/Posts";

dbConex();

export default async function postsData(req, res) {
  try {
    const dataDB = await postModel.find();
    return res.status(200).json(dataDB);
  } catch (error) {
    console.log("-----ERROR----");
    console.log(error);
    console.log("-----APi/postsData----");
    return res.status(400).json("error");
  }
}
