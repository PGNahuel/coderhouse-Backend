const {ProductoController} = require('../controller/productosController.js').ProductoController;
const express = require('express');
const {Router} = express;
const router = Router();

const productoController = new ProductoController();

router.get('/productos',(req,res)=>{
    console.log('Inicia la obtención de todos los productos - ' + (new Date().toLocaleString()));

    res.status(200).json(productoController.getAll());

    console.log('Finaliza la obtención de todos los productos - ' + (new Date().toLocaleString()));
});

router.get('/productos/:id',(req,res)=>{
    console.log('Inicia la obtención de un producto - ' + (new Date().toLocaleString()));

    const params = req.params;
    const prod = productoController.getByID(params.id);

    if(prod.length)
        res.status(200).json(prod);
    else   
        res.status(200).json({error:'producto no encontrado'});

    console.log('Finaliza la obtención de un producto - ' + (new Date().toLocaleString()));
});

router.post('/productos',(req,res)=>{
    console.log('Inicia el agregado de un producto - ' + (new Date().toLocaleString()));

    productoController.add(req.body);
    res.status(201).json('Producto Agregado');

    console.log('Finaliza el agregado de un producto - ' + (new Date().toLocaleString()));
});

router.put('/productos/:id',(req,res)=>{
    console.log('Inicia la actualización de un producto - ' + (new Date().toLocaleString()));

    productoController.update(req.body,req.params.id);
    res.status(200).json('Producto Actualizado');

    console.log('Finaliza la actualización de un producto - ' + (new Date().toLocaleString()));
});

router.delete('/productos/:id',(req,res)=>{
    console.log('Inicia la eliminación de un producto - ' + (new Date().toLocaleString()));

    productoController.delete(req.params.id);
    res.status(200).json('Producto eliminado');

    console.log('Finaliza la eliminación de un producto - ' + (new Date().toLocaleString()));
});


module.exports = router;
