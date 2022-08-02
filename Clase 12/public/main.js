const socket = io.connect();

socket.on('productos', function (data) { 
    console.log(data);
    datos = data;

    let response = fetch('datos.ejs').then(r => {
        r.text().then(f =>{
            const html = ejs.render(f,{datos:data});

            document.getElementById("divProductos").innerHTML = html;
        });
    });
});

function agregarProducto(producto){
    const p = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-product', p);

    return false;
}

console.log('Cliente escuchando');
