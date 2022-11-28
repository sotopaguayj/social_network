import newsModel from "models/News";
import Tmp from "models/Tmp";

export default async function saveNew(req, res) {
  const { body } = req;
  const news = new Tmp({ data: body.data, name: body.name, link: body.link });
  await news.save(function (err, result) {
    if (err) console.log(err);
    console.log("Imagen Added");
    res.status(201).json("ImageAdded");
  });
}
