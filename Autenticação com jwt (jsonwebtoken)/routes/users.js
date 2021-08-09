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
        return res.send({ error: "Erro na consulta de usuários!" });
    };
    // Users.find({}, (err, data) => {
    //     if (err) return res.send({ error: "Erro na consulta de usuários!" });
    //     return res.send(data);
    // });
});

router.post ('/create', async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) return res.send({ error: "Dados insuficientes!" });

    try {
        if (await Users.findOne({ email })) return res.send({ error: "Usuário já registrado!" });

        const user = await Users.create( req.body );
        user.password = undefined; //Para não visualizar a senha
        return res.send({user, token: createUserToken(user.id)});

    } catch (err) {
        return res.send({ error: "Erro na busca do usuário!" });
    };
});

router.delete ('/delete', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Users.deleteOne(req.body);
        return res.send(user);

    } catch (err) {
        return res.send({ error: "Erro na busca do usuário!" });
    };
});

router.post ('/auth', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) return res.send({ error: "Dados insuficientes!"});

    try {
        const user = Users.findOne({ email }).select("+password");
        if (!user) return res.send({ error: "Usuário não registrado!" });

        const pwd = await bcrypt.compare(password, user.password);
        if (!pwd) return res.send({ error: "Erro ao autenticar usuário!" });
        user.password = undefined; //Para não vizualizar a senha

        return res.send({user, token: createUserToken(user.id)});

    } catch (err) {
        return res.send({ error: "Erro ao buscar usuário!" });
    };
});

module.exports = router;