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


socket.on('reciveMessages', function (data) { 
    const html = data.map((elem, index) => {
        return (`<li>
                <strong class="autor"> ${elem.author}</strong>
                [<span class="fyh">${elem.time}</span>]:
                <span class="msg"> ${elem.text}</span> 
            </li>`)
        }).join(" ");

        document.getElementById('resultMsg').innerHTML = `<ul>${html}</ul>`;
        document.getElementById("resultMsg").scrollTop += 100;
});

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('txtEmail').value,
        text: document.getElementById('txtMsg').value
    };

    document.getElementById('txtMsg').value = '';
    document.getElementById("txtMsg").focus();

    socket.emit('new-message', mensaje);
    
    return false;
}