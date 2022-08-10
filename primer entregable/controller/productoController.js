const {Producto} = require('../entitys/productoEntity');
const {ProductoModel} = require('../model/productoModel');

class ProductoController{
    constructor(){}

    static getByID(id){
        const rta = ProductoModel.getByID(id);

        return rta;
    }

    static add(producto){
        const id = ProductoModel.add(new Producto(producto));
        return id;
    }

    static update(producto,id){
        const rta = ProductoModel.update(id, producto);
        console.log('Controller:');
        console.log(rta);
        return rta;
    }

    static delete(id){
        return ProductoModel.delete(id);
    }
}

// Exporto la clase
module.exports = {ProductoController};