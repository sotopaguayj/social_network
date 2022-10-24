import { dbConex } from "utils/mongoose";
import userModel from "models/User";

dbConex();
export default async function addUser(req, res) {
  const { body } = req;
  try {
    const creatingUser = await userModel.create(body);
    if (creatingUser) {
      return res.status(201).json("userCreated");
    }
  } catch (error) {
    const { code, keyValue } = error;
    switch (code) {
      case 11000:
        return res.status(403).json(keyValue.user);
      default:
        return console.log(error);
    }
  }
}
