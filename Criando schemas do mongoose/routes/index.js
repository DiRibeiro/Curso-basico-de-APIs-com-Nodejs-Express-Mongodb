const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({messagem : "Tudo ok com método get."});
})

router.post('/', (req, res) => {
    return res.send({messagem : "Tudo ok com método post."});
})

module.exports = router;