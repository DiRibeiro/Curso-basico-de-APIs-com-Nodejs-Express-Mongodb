const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
    const token_header = req.token_header.auth;
    if(!token_header) return res.status(401).send({ error: 'Token não enviado'});

    jwt.verify(token_header, config.jwt_pass, (err, decoded) => {
        if(err) return res.status(401).send({ error: "Token inválido!"});
        res.locals.auth_date = decoded;
        return next();
    });
}

module.exports = auth;