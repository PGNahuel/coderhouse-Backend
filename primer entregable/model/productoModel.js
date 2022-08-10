/*
El carrito de compras tendrá la siguiente estructura:

7. El timestamp puede implementarse con Date.now()
8. Realizar la persistencia de productos y del carrito de compras en el filesystem.
*/
const fs = require('fs');
const {Producto} = require('../entitys/productoEntity');

class ProductoModel{
    constructor(){
        
    }

    static archivo = '../productos.txt';

    static add(producto){
        try{
            if(fs.existsSync(this.archivo)){
                const productos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'));

                producto.id = (productos.length > 0) ? (parseInt(productos[productos.length-1].id) + 1) : 1;

                productos.push(producto);

                fs.writeFileSync(this.archivo,JSON.stringify(productos));
            }else{
                producto.id = 1;
                const productos = [];
                productos.push(producto);

                fs.writeFileSync(this.archivo,JSON.stringify(productos));

                return producto.id;
            }
        }catch(e){
            console.error(`Se ha producido un error. ${e.stackTrace}`)
        }
    }

    static getByID(id){
        try{
            if(fs.existsSync(this.archivo)){
                const productos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'));
                
                if(id){
                    return productos.filter(p => {return  p.id == id});
                }else{
                    return productos;
                }
            }else{
                return null;
            }
        }catch(e){
            console.error(`Se ha producido un error - ERROR - ${e.stackTrace}`);
        }
    }

    static delete(id){
        const rta = {error: true, descripcion:''};
        if(id > 0){
            try{
                if(fs.existsSync(this.archivo)){
                    const productos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'));

                    if(productos.filter(p=>{return p.id == id}).length > 0){
                        fs.writeFileSync(this.archivo,JSON.stringify(productos.filter(pf => {return pf.id != id})));
                        rta.error = false;
                        rta.descripcion = `Producto ${id} eliminado`;
                    }else{
                        rta.descripcion = `El producto ${id} no se encuentra en el listado`;
                    }
                }else{
                    rta.descripcion = 'No se pudieron obtener los productos';
                }
            }catch(e){
                console.error(`Se ha producido un error - ERROR - ${e.stackTrace}`);
                rta.descripcion = e.stackTrace;
            }
        }else{
            rta.descripcion = 'No se introdujo un ID correcto';
        }

        return rta;
    }

    static update(id,producto){
        const rta = {error: true, descripcion:''};

        if(id > 0){
            try{
                if(fs.existsSync(this.archivo)){
                    const productos = JSON.parse(fs.readFileSync(this.archivo,'utf-8'));

                    if(productos.filter(p=>{return p.id == id}).length > 0){
                        const idxProd = productos.findIndex(prod =>{
                            return prod.id == id;
                        });

                        producto.id = id;
                        productos[idxProd] = producto;

                        fs.writeFileSync(this.archivo,JSON.stringify(productos));

                        rta.error = false;
                        rta.descripcion = `Producto ${id} actualizado`;
                    }else{
                        rta.descripcion = `El producto ${id} no se encuentra en el listado`;
                    }
                }else{
                    rta.descripcion = 'No se encontraron productos para actualizar';
                }
            }catch(e){
                rta.descripcion = `Hubo un error al actualizar el producto ${e.stackTrace}`;
            }
        }else{
            rta.descripcion = 'No se indicó un ID de actualización completa';
        }

        return rta;
    }
}

module.exports = {ProductoModel}