import { dbConex } from "utils/mongoose";
import userModel from "models/User";

dbConex();
export default async function changePass(req, res) {
  console.log(req.body);
  return res.status(200);
}
