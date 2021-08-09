const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({messagem : "Tudo ok com método get."});
})

router.post('/', (req, res) => {
    return res.send({messagem : "Tudo ok com método post."});
})

module.exports = router;