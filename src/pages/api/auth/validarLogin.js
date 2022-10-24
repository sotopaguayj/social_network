import { dbConex } from "utils/mongoose";
import userModel from "models/User";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const bcrypt = require("bcrypt");

dbConex();
export default async function validator(req, res) {
  const { body } = req;
  const { user, pass } = body;

  try {
    const dataDB = await userModel.findOne({
      user: user,
    });
    if (dataDB) {
      const { role } = dataDB;
      const passDB = dataDB.pass;
      bcrypt.compare(passDB, pass, function (err) {
        if (err) {
          return res.status(401).json("errorPass");
        } else {
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
          switch (role) {
            case 100:
              return res.status(200).json("root");
            case 111:
              return res.status(200).json("mod");
            default:
              return res.status(200).json("user");
          }
        }
      });
    } else {
      return res.status(404).json("userNotFound");
    }
  } catch (error) {
    console.log("----ERROR------");
    console.log(error);
    console.log("---------------");
  }
}
