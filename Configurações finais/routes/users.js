const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Função auxiliar
const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, '12345678', { expiresIn: '7d' });
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (err) {
        return res.status(500).send({ error: "Erro na consulta de usuários!" });
    };
    // Users.find({}, (err, data) => {
    //     if (err) return res.send({ error: "Erro na consulta de usuários!" });
    //     return res.send(data);
    // });
});

router.post ('/create', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).send({ error: "Dados insuficientes!" });

    try {
        if (await Users.findOne({ email })) return res.status(400).send({ error: "Usuário já registrado!" });

        const user = await Users.create( req.body );
        user.password = undefined; //Para não visualizar a senha
        return res.status(201).send({user, token: createUserToken(user.id)});

    } catch (err) {
        return res.status(500).send({ error: "Erro na busca do usuário!" });
    };
});

router.delete ('/delete', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Users.deleteOne(req.body);
        return res.send(user);

    } catch (err) {
        return res.status(500).send({ error: "Erro na busca do usuário!" });
    };
});

router.post ('/auth', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) return res.status(400).send({ error: "Dados insuficientes!"});

    try {
        const user = Users.findOne({ email }).select("+password");
        if (!user) return res.status(400).send({ error: "Usuário não registrado!" });

        const pwd = await bcrypt.compare(password, user.password);
        if (!pwd) return res.status(401).send({ error: "Erro ao autenticar usuário!" });
        user.password = undefined; //Para não vizualizar a senha

        return res.send({user, token: createUserToken(user.id)});

    } catch (err) {
        return res.status(500).send({ error: "Erro ao buscar usuário!" });
    };
});

module.exports = router;

/*
* 200 - OK
* 201 - Created
* 202 - Accepted
*
* 400 - Bad request
* 401 - Unauthorized - Autenticação, carater temporario
* 403 - Forbidden - Autorização, carater permanente
* 404 - Not found
*
* 500 - Internal server error
* 501 - Not implemented - API não suporta essa funcionalidade.
* 503 - Service unavailabel - API executa a operação, mas no momento está indisponível.
*
*/