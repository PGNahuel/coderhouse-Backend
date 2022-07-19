const { ProductoModel } = require('../model/productoModel.js').ProductoModel;

class ProductoController{
    constructor(){
        this.productos = [];
    }

    // Devuelvo todos los productos
    getAll(){
        return this.productos;
    }

    // Devuelvo solo el producto del ID.
    getByID(id){
        return this.productos.filter(p=>{
            return p.id == id;
        });
    }

    // Agrego un producto
    add(producto){
        const agregar = new ProductoModel(
            producto.title,
            producto.price,
            producto.thumbnail
        );

        if(this.productos.length > 0) 
            agregar.setId(this.productos[this.productos.length-1].id + 1);
        else 
            agregar.setId(1);

        this.productos.push(agregar);
    }

    // Actualizo un producto
    update(producto, id){
        // Pregunto si vino bien el id y si tengo un objeto para ese ID.
        if(id > 0 && this.productos.filter(p =>{ return p.id == id; }).length > 0 ){

            // Busco la posición en el array
            const idArray = this.productos.findIndex(x=>{return x.id == id});

            // Creo un objeto que modificará el que existe
            const p = new ProductoModel(producto.title, producto.price, producto.thumbnail);
            p.setId(id);
            
            // Lo modifico
            this.productos[idArray] = p;
        }
    }

    // Elimina un producto de la lista de productos
    delete(id){
        // Reemplazo la lista de productos por una que no tenga el objeto con el ID mandado.
        this.productos = this.productos.filter(p=>{
            return p.id != id;
        });
    }
}

// Exporto la clase
module.exports.ProductoController = {ProductoController};