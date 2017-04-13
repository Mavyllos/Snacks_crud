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
  // res.render('snacks/new', { error: 'Rating is blank', snack })
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

// The put route is being used to update the selected id
router.put('/:id', (req, res, next) => {
  //req is the req, params is an object with a key/value pair for the route/id
  var id = req.params.id
  console.log(req.params);
  // body is object containing all of parameters from the parsed request body in key value/pairs
  var name = req.body.name
  console.log(req.body);
  // sting value for specified k/v pair(s)
  var snack = {
    name: req.body.name,
    review_description: req.body.review_description,
    rating: req.body.rating,
    image_url: req.body.image_url
  }
  // an if/else statement looking for form validation
  if (!name) {
    // this triggers a render (rather than a redirect) with an errror message if the condition above was true
  res.render('snacks/edit', { error: 'Name is blank', snack })
  // this code runs if the above condition was false
  } else {
    // this triggers a redirect back to the  id (string interpolation) with the changes that were made to the updatedSnacks var
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
