/*
Para realizar la prueba de funcionalidad hay dos opciones:

a. Probar con postman cada uno de los endpoints (productos y carrito) y su operación en
conjunto.

3. En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto
de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}

4. La estructura de programación será ECMAScript, separada tres en módulos básicos (router,
lógica de negocio/api y persistencia ). Más adelante implementaremos el desarrollo en capas.
Utilizar preferentemente clases, constructores de variables let y const y arrow function.

5. Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080) y en glitch.com

*/

/*
    2. El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:
*/

const express = require('express');
const productoRouter = require('./router/productosRouter');
const carritoRouter = require('./router/carritoRouter');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos',productoRouter);
app.use('/api/carrito',carritoRouter);

//app.use(express.static('public',null));

app.get('/',(req,res)=>{
    res.status(200).json({message:"usar API"});
})

app.listen(port,(err,ok)=>{
    if(err){
        console.error('Error al iniciar el servidor')
        return false;
    }
    console.log('Server ON');
});