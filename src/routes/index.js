var express = require('express');
var router = express.Router();

const fs = require("fs");
const path = require("path");

const routes = [
  "/",
  "/StableStatics",
  "/MonsterSkills",
  "/Menu",
];

routes.forEach(route => router.get(route, function(req, res, next) {
  res.render('index');
}))

router.post("/uploadJson", (req, res, next) => {
  try {
    const content = JSON.stringify(req.body, null, "\t");
    const appDir = path.dirname(require.main.filename);

    const filePath = path.join(appDir, "public", "json", "monster.json")
    fs.writeFileSync(filePath, content);

    const backpuFilePath = path.join(appDir, "public", "json", "backup", "monster_backup.json")
    fs.writeFileSync(backpuFilePath, content);

    res.send({
      "result": true,
    });
  } catch(error) {
    res.send({
      "result": false,
    });
  }
})

module.exports = router;
