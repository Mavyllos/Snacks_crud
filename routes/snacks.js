var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

/* GET home page. */
router.get('/', (req, res, next) => {
  db('snacks').select('*').then(snacks => {
    res.render('snacks/index', { snacks });
  }).catch(err => {
    console.log(err);
  })
});

router.get('/new', (req, res, next) => {
  res.render('snacks/new');
});

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  db('snacks').where({ id }).first().then(snack => {
    res.render('snacks/show', { snack });
  }).catch(err => {
    console.log(err);
  })
});

router.post('/', (req, res, next) => {
  var snack = {
    name: req.body.name,
    review_description: req.body.review_description,
    rating: req.body.rating,
    image_url: req.body.image_url
  }
  db('snacks').insert(snack, '*').then(newSnack => {
    // console.log(newsnack);
    var id = newSnack[0].id;
    res.redirect(`/snacks/${id}/`)
  }).catch(err => {
    console.log(err);
  })
});

router.delete('/:id', (req, res, next) => {
  var id = req.params.id
  db('snacks').del().where({ id }).then(() => {
    res.redirect('/snacks')
  })
});

module.exports = router;
