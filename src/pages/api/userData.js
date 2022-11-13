import userModel from "models/User";

export default async function userData(req, res) {
  const { body } = req;
  console.log(body);
  // await userModel.findOne({ user: body.user }, function (err, result) {
  //   if (result) console.log(result);
  //   if (err) console.log(err);
  // });
}
