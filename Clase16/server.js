const express = require('express');
const ejs = require('ejs');
const app = express();
const fs = require('fs');
const router = require('./src/router/ProductoRouter');
const datos = require("./src/controller/ProductoController");
const mensajes = require('./src/controller/MensajesController');

// EJs
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// ProductoRouter
app.use('/productos', router);
app.use(express.static('public'));
app.get('/', (req, res) => {  res.render('form',{datos:datos.getAll()}); });


//Socket Messages
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(8080,()=>{ console.log('Server ON port 8080'); });
httpServer.on("error", (err) => {  console.log( `Error en el servidor - ${err}`)  });

io.on('connection',socket => {
    console.log('Un cliente se ha conectado');

    datos.getAll().then((rows)=>{
        socket.emit('productos', rows);
    });
    
    
    socket.on('new-product',data => {
        const rta = datos.add(data);
        rta.then(()=>{
            datos.getAll().then((rows)=>{
                socket.emit('productos', rows);
            });
        }).catch((err)=>{
            console.log(err);
        });        
    });

    socket.on('new-message',data => {
        mensajes.guardarMensaje(data).then(()=>{
            mensajes.getAll().then(rows=>{
                io.sockets.emit('reciveMessages', rows);
            });
        });
    });

    mensajes.getAll().then(rows=>{
        io.sockets.emit('reciveMessages', rows);
    });
});





