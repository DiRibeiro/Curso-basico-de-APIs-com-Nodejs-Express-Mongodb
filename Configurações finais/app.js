const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/config');

//const bodyParser = require('body-parser'); //DEPRECATED

const url = config.bd_string; 

//Opções padrão
const options = {
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 500,
    poolSize: 5,
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(url, options);

mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log("Erro na conexão com o banco de dados." + err);
})

mongoose.connection.off('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados!');
})

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada do banco de dados!');
})

//BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;

//String de conexão
//mongodb+srv://user-admin:<password>@clusternodejsbasiccours.gioks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority