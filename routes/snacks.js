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
  var name = req.body.name;
  // var review = req.body.review_description;
  // var rating = parseInt(req.body.rating);
  var snack = {
    name: req.body.name,
    review_description: req.body.review_description,
    rating: req.body.rating,
    image_url: req.body.image_url
  }
  if (!name) {
  res.render('snacks/new', { error: 'Name is blank', snack })
  }
  // if (!review) {
  // res.render('snacks/new', { error: 'Review is blank', snack })
  // }
  // if (!rating) {
  // res.render('snacks/new', { error: 'RAting is blank', snack })
  // }
  else {
    db('snacks').insert(snack, '*').then(newSnack => {
      var id = newSnack[0].id;
      res.redirect(`/snacks/${id}/`)
    }).catch(err => {
      console.log(err);
    })
  }
});

router.delete('/:id', (req, res, next) => {
  var id = req.params.id
  db('snacks').del().where({ id }).then(() => {
    res.redirect('/snacks')
  })
});

router.put('/:id', (req, res, next) => {
  var id = req.params.id
  var name = req.body.name
  var snack = {
    name: req.body.name,
    review_description: req.body.review_description,
    rating: req.body.rating,
    image_url: req.body.image_url
  }
  if (!name) {
  res.render('snacks/new', { error: 'Name is blank', snack })
  } else {
    db('snacks').update(snack, '*').where({ id }).then(updatedSnack => {
      var id = updatedSnack[0].id;
      res.redirect(`/snacks/${id}/`)
    }).catch(err => {
      console.log(err);
    })
  }
});

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id
  db('snacks').select('*').where({ id }).first().then(snack => {
  res.render('snacks/edit', { snack })
  })
});

module.exports = router;
