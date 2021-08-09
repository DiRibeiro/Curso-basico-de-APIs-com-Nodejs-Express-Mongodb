const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token_header = req.token_header.auth;
    if(!token_header) return res.send({ error: 'Token não enviado'});

    jwt.verify(token_header, '12345678', (err, decoded) => {
        if(err) return res.send({ error: "Token inválido!"});
        res.locals.auth_date = decoded;
        
        return next();
    });
}

module.exports = auth;