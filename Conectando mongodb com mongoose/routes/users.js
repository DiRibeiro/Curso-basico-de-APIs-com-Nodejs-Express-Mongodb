const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    return res.send({messagem : "Tudo ok com método get."});
})

router.post('/users', (req, res) => {
    return res.send({messagem : "Tudo ok com método post."});
})

router.post ('/create', (req, res) => {
    return res.send({messagem : "Seu usuário foi criado."});
})

module.exports = router;