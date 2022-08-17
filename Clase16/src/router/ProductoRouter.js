const express = require("express");
const { Router } = express;
const router = Router();
const ProductoController = require("../Controller/ProductoController");

router.get("/", (req, res) => {
  const productos = [];

  ProductoController.getAll().then((prod)=>{
    console.log({
      prod:prod
    });
    
    res.render("lista", { datos: prod });
  })
  
});

/*router.get("/:id", (req, res) => {
  const {id} = req.params;
  res.send(ProductoController.getOne(id));
});*/

router.post("/", (req, res, ) => {
  ProductoController.add(req.body);
  console.log('Producto Agregado');
  res.redirect("/");
});

/*router.put("/:id", (req, res) => {
  const {id} = req.params;
  const body = req.body;
  res.send(ProductoController.update(id, body));
});

router.delete("/:id", (req, res) => {
  res.send(ProductoController.delete(req.params.id));
})*/


module.exports = router;