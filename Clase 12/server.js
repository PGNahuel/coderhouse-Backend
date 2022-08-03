const express = require('express');
const ejs = require('ejs');
const router = require('./src/router/ProductoRouter');
const app = express();
const fs = require('fs');

// EJs
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/productos', router);
app.use(express.static('public'));

let datos = require("./src/controller/ProductoController");

app.get('/', (req, res) => { 
    res.render('form',{datos:datos.getAll()}); 
});


//Socket
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(8080,()=>{
    console.log('Server ON port 8080');
});

httpServer.on("error", (err) => { 
    console.log( `Error en el servidor - ${err}`) 
});

/**************** BORRAR ***************/
const now = +
new Date().getDate()+'/'
+(new Date().getMonth()+1)+'/'
+new Date().getFullYear()+' '
+new Date().getHours()+':'
+new Date().getMinutes()+':'
+new Date().getSeconds();

const messages = [];
 /**************** BORRAR ***************/

const saveMessageFile = function(msj){
    const msjAgregar = {
        time : new Date().getDate()+'/'
        +(new Date().getMonth()+1)+'/'
        +new Date().getFullYear()+' '
        +new Date().getHours()+':'
        +new Date().getMinutes()+':'
        +new Date().getSeconds()
        , author : msj.author
        , text : msj.text
    }

    messages.push(msjAgregar);

    fs.writeFile("./centrodemsg.txt"
        ,JSON.stringify(messages,null,2)
        ,(error)=>{
            if(error)
                console.log(error);
        });
}

var archivoMsg = fs.readFile('./centrodemsg.txt','utf-8',(err,contenido)=>{
    if(contenido){
        let contentJS= JSON.parse(contenido);
        contentJS.forEach(element => {
            messages.push(element);
        }); 
    }
})

io.on('connection',socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('productos', 
        datos.getAll()
    );
    
    socket.on('new-product',data => {
        datos.add(data);

        io.sockets.emit('productos', datos.getAll());
    });

    socket.on('new-message',data => {
        saveMessageFile(data);
        io.sockets.emit('reciveMessages', messages);
    });

    io.sockets.emit('reciveMessages', messages);
});





