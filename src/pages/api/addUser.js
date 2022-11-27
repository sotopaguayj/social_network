import { dbConex } from "utils/mongoose";
import userModel from "models/User";

dbConex();
export default async function addUser(req, res) {
  const { body } = req;
  // console.log(body);
  try {
    const user = new userModel(body);
    await user.save();
    return res.status(201).json("UserCreated");
  } catch (err) {
    console.log(err);
  }
}
