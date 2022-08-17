const productoModel = require("../models/productoModel");

class ProductoController {
  static getAll(){
    const productos = productoModel.getListaProductos();
  
    console.log(productos);
    return productos;
  }

  static get(id){
    return productoModel.getProducto(id);
  }

  static add(product){
    return productoModel.addProducto(product);
  }

  static update(id, newContent){
    return productoModel.updateProducto(id, newContent);
  }

  static delete(id){
    return productoModel.deleteProducto(id);
  }
}

module.exports = ProductoController;

