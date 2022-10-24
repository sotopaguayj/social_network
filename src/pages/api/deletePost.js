import postModel from "models/Posts";

export default async function deletePost(req, res) {
  const { body } = req;

  try {
    const postDeleted = await postModel.deleteOne({ _id: body._id });
    if (postDeleted.deletedCount == 1) {
      return res.status(200).json("PostDeleted");
    }
  } catch (error) {
    console.log("-------ERROR--------");
    console.log(error);
    console.log("-----deletePost-------");
    res.status(400).json("error");
  }
}
