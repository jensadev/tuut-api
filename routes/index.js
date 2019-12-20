var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    success: 1, 
    message: "API up and running, use routes /users or /tuuts"
  })
});

module.exports = router;
