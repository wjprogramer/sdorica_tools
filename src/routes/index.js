var express = require('express');
var router = express.Router();

const fs = require("fs");
const path = require("path");
const { isArray } = require('util');

const TimeUtility = require('../utilities/TimeUtility');

const routes = [
  "/",
  "/StableStatics",
  "/MonsterSkills",
  "/Menu",
  "/History",
];

const appDir = path.dirname(require.main.filename);
const monsterJsonPath = path.join(appDir, "public", "json", "monster.json");
const monsterBackupJsonPath = path.join(appDir, "public", "json", "backup", "monster_backup.json");

routes.forEach(route => router.get(route, function(req, res, next) {
  res.render('index');
}))

router.post("/uploadJson", (req, res, next) => {
  try {
    const { star, monsterId, diff } = req.body;

    // read file
    let content = fs.readFileSync(monsterJsonPath, "utf-8");
    const root = JSON.parse(content);

    // update monster
    const monster = root.monsters.filter((e) => e.id === monsterId)[0];
    if (!monster) {
      throw Error();
    }
    monster.numberOfStar[star] += diff;

    // add event
    if (!Array.isArray(root.events)) {
      root.events = [];
    }
    const newEventId = root.events.length;
    root.events.push({
      id: newEventId,
      type: "directly_change_number",
      monsterId,
      diff,
      star,
      time: TimeUtility.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"),
      isRecovered: false,
    });

    // write
    const result = JSON.stringify(root, null, "\t");
    fs.writeFileSync(monsterJsonPath, result);
    fs.writeFileSync(monsterBackupJsonPath, result);

    // response
    res.send({
      "result": true,
    });
  } catch(error) {
    console.log("error!");
    res.send({
      "result": false,
    });
  }
});

// TODO
router.post("/toggleEvent", (req, res, next) => {
  try {
    const { eventId } = req.body;
  } catch(error) {
    console.log("error!");
    res.send({
      "result": false,
    });
  }
});

router.post("/removeEvent", (req, res, next) => {
  try {
    let { eventId } = req.body;
    eventId = parseInt(eventId);

    // read file
    let content = fs.readFileSync(monsterJsonPath, "utf-8");
    const root = JSON.parse(content);

    if (!Array.isArray(root.events)) {
      throw Error();
    }

    root.events = root.events.filter(
      event => event.id !== eventId);
    
    const result = JSON.stringify(root, null, "\t");
    fs.writeFileSync(monsterJsonPath, result);
    fs.writeFileSync(monsterBackupJsonPath, result);
    
    res.send({
      "result": true,
    });
  } catch(error) {
    console.log("error!");
    res.send({
      "result": false,
    });
  }
});

// TODO
router.post("/clearEventList", (req, res, next) => {
  try {

  } catch(error) {
    console.log("error!");
    res.send({
      "result": false,
    });
  }
});


module.exports = router;
