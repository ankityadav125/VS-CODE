var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

const globalpath = path.join(__dirname, "../", "public", "uploads");

router.get("/", function (req, res, next) {
  const files = fs.readdirSync(globalpath);
  res.render("index", { files: files, filedata: "", filename: "" });
});

router.get("/file/:filename", function (req, res, next) {
  const filedata = fs.readFileSync(
    path.join(globalpath, req.params.filename),
    "utf-8"
  );   
  const files = fs.readdirSync(globalpath);
  res.render("index", {
    files: files,
    filedata: filedata,
    filename: req.params.filename,
  });
});

router.post("/createfile", function (req, res, next) {
  // const filename = req.body.filename;
  const { filename } = req.body;
  fs.writeFileSync(path.join(globalpath, filename), "");
  res.redirect(`/file/${filename}`);
});

router.get("/delete/:filename", function (req, res, next) {
  fs.unlinkSync(path.join(globalpath, req.params.filename));
  res.redirect("/");
});

router.post("/update/:filename", function (req, res, next) {
  fs.writeFileSync(
    path.join(globalpath, req.params.filename),
    req.body.filedata
  );
  res.redirect(`/file/${req.params.filename}`);
});

module.exports = router;
