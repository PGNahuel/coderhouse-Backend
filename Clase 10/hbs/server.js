const express = require('express');
const router = require('./src/router/ProductoRouter');
const app = express();
const handlebars = require('express-handlebars');

app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts"
}));

app.set('view engine', 'hbs');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', router)
app.get('/', (req, res) => { res.render('main'); });

const server = app.listen(8080, () => console.log(`Inició el servidor.`))
server.on("error", (err) => { console.log( `Error en el servidor - ${err}`) });
