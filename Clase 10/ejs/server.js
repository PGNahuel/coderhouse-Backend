const express = require('express');
const router = require('./src/router/ProductoRouter');
const app = express();

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', router);

let datos = require("./src/controller/ProductoController").getAll();
app.get('/', (req, res) => { res.render('form',{datos}); });

const server = app.listen(8080, () => console.log(`Inició el servidor.`))
server.on("error", (err) => { console.log( `Error en el servidor - ${err}`) });
