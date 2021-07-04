const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET login page. */
router.get('/', (req, res, next) => {
    if (req.query.fail)
        res.render('../Super_merc_frontend/public/views/login', { message: 'Usuário e/ou senha incorretos!' });
    else
        res.render('../Super_merc_frontend/public/views/login', { message: null });
});

/* POST login page */
router.post('/',
    passport.authenticate('local', { 
        successRedirect: '/adm', 
        failureRedirect: '/login?fail=true' 
    })
);

module.exports = router;











