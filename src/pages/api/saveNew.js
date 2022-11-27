import newsModel from "models/News";

export default async function saveNew(req, res) {
  const { body } = req;

  try {
    const news = new newsModel(body);
    await news.save();
    return res.status(201).json("NewCreated");
  } catch (err) {
    console.log(err);
  }
}
