var express = require ('express');
var router = express.Router();

router.get('/' , function(req , res)
{
    res.render('index.html'); // we must specify the file extension as we specified the view engine as ejs
});

module.exports = router;