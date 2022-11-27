import newsModel from "models/News";

export default async function getNews(req, res) {
  await newsModel.find({}).then((result) => {
    res.status(200).json(result);
  });
}
