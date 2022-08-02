const lstProductos = [];
  
let id = 1;
  
const getListaProductos = () => { return lstProductos }
  
const getProducto = (id) => {
    let producto = lstProductos.find(p => p.id == parseInt(id));

    if(producto[0]){
        return producto[0];
    }else{
        return { error: 'Producto no encontrado' };
    }
}
  
const addProducto = (producto) => {
    const p = {
      id: id,
      nombre: producto.nombre,
      precio: producto.precio,
      thumbnail: producto.thumbnail
    };
    lstProductos.push(p);
    id++;
}
  
const updateProducto = (id, pNuevo) => {
    const product = getProduct(parseInt(id));
    if (product.id == id) {
      product.nombre = pNuevo.nombre;
      product.precio = pNuevo.precio;
      product.thumbnail = pNuevo.thumbnail;
      return product;
    } else {
      return { error: 'Producto no encontrado' };
    }
  }
  
const deleteProducto = (id) => {
    const product = getProduct(parseInt(id))
    if (product.id == id) {
        lstProductos.splice(lstProductos.indexOf(product), 1)
        return 'Producto eliminado';
    } else {
        return { error: 'Producto no encontrado' };
    }
  }
  
  /*
addProducto({
    "nombre": "Cuaderno","precio": 100,
    "thumbnail": "https://cdn2.iconfinder.com/data/icons/cooking-56/64/30-cook_book-recipe_book-recipe-ingredients-kitchen-book-128.png",
});

addProducto({
    "nombre": "Calculadora","precio": 250,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
});

addProducto({
    "nombre": "Lapiz","precio": 35,
    "thumbnail": "https://cdn0.iconfinder.com/data/icons/economico-a-business-icon-set/74/pencil-lapis-128.png",
});
*/
module.exports = { getListaProductos, getProducto, addProducto, updateProducto, deleteProducto }