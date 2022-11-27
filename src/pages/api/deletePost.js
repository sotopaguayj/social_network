import userModel from "models/User";

export default async function deletePost(req, res) {
  const { body } = req;
  await userModel
    .updateOne(
      {
        "data.user": body.user,
      },
      {
        $pull: {
          posts: {
            _id: body.id,
          },
        },
      }
    )
    .then((val) => {
      if (val.modifiedCount == 1) res.status(200).json("postDeleted");
    })
    .catch((err) => {
      console.log(err);
    });
}
