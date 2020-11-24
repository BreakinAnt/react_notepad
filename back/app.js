const express = require('express');
const sequelize = require('./util/database');
const bodyParser = require('body-parser')
const routes = require('./routes/router');
const cfg = require('./util/cfg.json');

const Note = require('./models/note');

const app = express();

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
});
//

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

sequelize.sync()
    .then(res => {
        app.listen(process.env.PORT || cfg.serverPort);
        console.log(`Server listening on port ${process.env.PORT || cfg.serverPort}`)
    })
    .catch(err => console.log(err));