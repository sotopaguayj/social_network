import { dbConex } from "utils/mongoose";
import postModel from "models/Posts";

dbConex();
export default async function addUser(req, res) {
  const { body } = req;
  try {
    const creatingPost = await postModel.create(body);
    if (creatingPost) {
      return res.status(201).json("postCreated");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("serverProblem");
  }
}
