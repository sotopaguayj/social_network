import Tmp from "models/Tmp";

export default async function getNews(req, res) {
  await Tmp.find().then((result) => {
    res.status(200).json(result);
  });
}
