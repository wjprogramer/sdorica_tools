var express = require('express');
var router = express.Router();

const routes = [
  "/",
  "/StableStatics",
  "/MonsterSkills",
  "/Menu",
];

routes.forEach(route => router.get(route, function(req, res, next) {
  res.render('index');
}))

module.exports = router;
