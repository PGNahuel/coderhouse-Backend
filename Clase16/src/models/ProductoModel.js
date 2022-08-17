const getListaProductos = () => {
  const {options} = require('../../options/mariadb');
  const knex = require('knex')(options);

  return knex.from('productos').select('*')
  .then((rows)=>{
    return rows;
  })
}

const addProducto = (producto) => {
  const {options} = require('../../options/mariadb');
  const knex = require('knex')(options);

    const p = {
      nombre: producto.nombre,
      precio: producto.precio,
      thumbnail: producto.thumbnail
    };

    return knex('productos').insert(p)
    .then(()=>{return true;})
    .catch((err)=>{console.log(err);throw err;})
    .finally(()=>{knex.destroy();});
}
  
module.exports = { getListaProductos, addProducto }