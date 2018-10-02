var express = require('express');
var router = express.Router();
const User = require('../models/user');

// GET /register
router.get('/register', (req, res, next) => {
  return res.render("register", { title: 'Sign Up'});
})

// POST /register
router.post('/register', (req, res, next) => {
  if (req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword) {

      // confirm user typed same password twice
      if (req.body.password !== req.body.confirmPassword) {
        const err = new Error('Passwords do not match');
        err.status = 400;
        return next(err);
      }

      // create object with form input
      const userData = {
        email: req.body.email,
        name: req.body.name,
        favoriteBook: req.body.favoriteBook,
        password: req.body.password
      };

      User.create(userData, (err, user) => {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/profile');
        }
      })
    } else {
      const err = new Error('All fields required');
      err.status = 400;
      return next(err);
    }
})

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
