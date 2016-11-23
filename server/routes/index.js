var express = require('express');
var router = express.Router();
var debug = require('debug')('save-me-server:applog');
var db = require('diskdb');
var path = require('path');
var dbPath = path.join(__dirname, '../data')
// db.connect('../data/')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   debug(req.query);
//   res.send({success:true});
// });

router.get('/saveData',function(req, res){
    
  const {textContent,articleUrl,imageUrl,savedDate} = req.query
  const article = {textContent,articleUrl,imageUrl,savedDate}

  db.connect(dbPath,['articleContent'])
  db.articleContent.save(article)
  res.send({success: true})

});

router.get('/getData',function(req, res){
  
  db.connect(dbPath,['articleContent'])
  const articles = db.articleContent.find()
  res.send({articles})
});

module.exports = router
