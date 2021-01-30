var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('tutorial/user', {
    'title': 'User',
    'insert_html': '<a href="#">Insert html</a>',
    'condition': true,
    'foods': ['apple', 'banana', 'mongo'],
  });
});

router.get('/details', (req, res) => {
  res.render('tutorial/user_details');
});

module.exports = router;
