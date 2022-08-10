const {CarritoModel} = require('../model/carritoModel');

class CarritoController{
    constructor(){
        this.id = 0;
    }

    getAll(idCarrito){
        const carrito = CarritoModel.getCarrito(idCarrito);
        
        if(carrito){
            return carrito.productos;
        }else{
            return {error:-1, mensaje:'El ID del carrito indicado no existe.'}
        }
    }

    add(){
        const carritoNuevo = CarritoModel.createCarrito();

        return carritoNuevo.id;
    }

    delete(id){
        const rta = CarritoModel.deleteCarrito(id);

        return rta;
    }

    addProductos(idCarrito,productos){
        const rta = CarritoModel.addProductos(idCarrito,productos);

        return rta;
    }

    deleteProducto(idCarrito,idProducto){
        const rta = CarritoModel.deleteProducto(idCarrito,idProducto);

        return rta;
    }


}

module.exports = {CarritoController}