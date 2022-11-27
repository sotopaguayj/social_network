import { dbConex } from "utils/mongoose";
import userModel from "models/User";

dbConex();
export default async function setComentary(req, res) {
  const { body } = req;
  await userModel
    .updateOne(
      {
        "data.user": body.userName,
      },
      {
        $push: {
          "posts.$[elemX].comments": body,
        },
      },
      {
        arrayFilters: [
          {
            "elemX._id": body.postId,
          },
        ],
      }
    )
    .then((val) => {
      if (val.modifiedCount == 1) return res.status(201).json("commentCreated");
      console.log("Algo salio mal, contacte al encargado");
    })
    .catch((err) => {
      console.error(err);
    });
}
