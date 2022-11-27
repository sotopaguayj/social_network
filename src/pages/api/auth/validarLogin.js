import { dbConex } from "utils/mongoose";
import userModel from "models/User";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const bcrypt = require("bcrypt");

dbConex();
export default async function validator(req, res) {
  const { body } = req;
  const { user, pass } = body;

  await userModel.findOne({ "data.user": user }).then((val) => {
    if (val === null) {
      console.log("userNotFound");
      return res.status(404).json("UserNotFound");
    } else {
      const dbPass = val.data.pass;
      const role = val.data.role;
      bcrypt.compare(pass, dbPass, function (err, result) {
        if (result) {
          const token = sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15,
              user,
              role,
            },
            "sapoperrox"
          );
          const serialized = serialize("LoginToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 15,
            path: "/",
          });
          res.setHeader("Set-Cookie", serialized);
          res.status(200).json("access-done");
        } else {
          return res.status(401).json("passWrong");
        }
      });
    }
  });
}
