const productoModel = require("../models/productoModel");

class ProductoController {
  static getAll(){
    return productoModel.getListaProductos();
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

