import path from "path";
let slugify = require("slugify");
const fs = require("fs");
const formidable = require("formidable-serverless");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  fs.mkdir(`./public/uploads/`, { recursive: true }, function (err) {
    if (err) res.status(500).json("error 500 cole");
  });

  const data = await new Promise((resolve, reject) => {
    const form = formidable({
      multiple: true,
      uploadDir: `.public/uploads/`,
    });

    form.keepExtensions = true;
    form.keepFileName = true;

    form.on("fileBegin", function (req, file) {
      file.path = path.join(`public/uploads/`, slugify(file.name));
    });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });

  res.json({ data, msg: "gg" });
};
