const express = require('express');
const productosRouter = require('./router/productosRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',productosRouter);

app.use(express.static('public',null));
app.get('/',(req,res)=>{
    res.status(200).json({message:"usar API"});
})

app.listen(8080,(err,ok)=>{
    if(err){
        console.error('Error al iniciar el servidor')
        return false;
    }
    console.log('Server ON');
});