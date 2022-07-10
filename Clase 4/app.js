/* Instancia del servidor */
const express = require('express');
const app = express();

const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log('El server está activo');
})

server.on("error",error=>{console.log(`Error en el servidor ${error}`)});
/* Cerramos declaración de instancia del servidor */

// Declaramos el objeto Contenedor
const contenedor = require('./index.js');

// Metodos
app.get('/',(req,res)=>{
    res.send({mensaje:'Probado server'});
})

app.get('/productos',(req,res)=>{
    let rta = [];
    contenedor.getAll().then(x=>{
        rta = x;

        res.send(rta);
    })
    .catch(err=>{
        res.send({msgError:`Error al obtener los productos - ERROR - ${err}`,errorNumber:1});
    });
})

app.get('/productoRandom',(req,res)=>{
    contenedor.getAll().then(lstProductos=>{
        if(lstProductos.length){
            const prodAlAzar = lstProductos[Math.floor(Math.random() * lstProductos.length + 0)]

            res.send(prodAlAzar);
        }else{
            res.send({msgError:'No hay ningún producto en el archivo',errorNumber:2});
        }
    })
    .catch(err=>{
        res.send({msgError:`Error al obtener el producto al azar - ERROR - ${err}`,errorNumber:3});
    });
})




