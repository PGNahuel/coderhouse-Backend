 /*
    Aspectos a incluir en el entregable:
    - El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id 
    del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
    - Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
    - Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con 
    async/await y manejo de errores.
    - Probar el módulo creando un contenedor de productos, que se guarde en el archivo: 
    “productos.txt”
    - Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para 
    verificar el correcto funcionamiento del módulo construído. 
*/

const { Console } = require('console');

class Contenedor{
    constructor(){
        this.fs = require('fs');
        this.productos = [];
        this.archivo = './productos.txt';
    }

    // Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(obj){
        let id = -1;

        try{
            if(this.fs.existsSync(this.archivo)){
                // Leo el archivo
                const archivo = await this.fs.promises.readFile(this.archivo,'utf-8')
                .then(cont => {
                    // Parseo el contenido
                    this.productos = JSON.parse(cont);
                })
                .catch(err =>{
                    console.error('Hubo un error al leer el archivo - ERROR - ' + err.Message)
                })

                
                // Busco el ID más alto que exista en el archivo
                this.productos.forEach((p)=>{ id = (p.id > id) ? p.id : id; });

                // Si no tenia archivos queda en -1, lo cambio a 1. Sino le sumo 1 al más alto.
                if (id == -1) { id = 1 } else { id++ };

                // Pusheo el producto a la lista de productos.
                this.productos.push({
                    id: id
                    , title: obj.title
                    , price: obj.price
                    , thumbail: obj.thumbail
                });
                
                // Sobreescribo el archivo con los productos
                let escritura = await this.fs.writeFile(this.archivo,JSON.stringify(this.productos,null,2),(err)=>{
                    if(err) console.error('Hubo un error al escribir el archivo');
                    else console.log('Archivo actualizado');
                });
            
                return id;
            }
            else
            {
                id = 1;
                // Pusheo el producto a la lista de productos.
                this.productos.push({
                    id: id
                    , title: obj.title
                    , price: obj.price
                    , thumbail: obj.thumbail
                });

                const guardado = await this.fs.promises.writeFile(this.archivo,JSON.stringify(this.productos,null,2))
                .then(()=>{
                    console.log('Archivo creado');
                })
                .catch(err =>{
                    console.error('Hubo un error al crear el archivo');
                    console.error(err);
                });

                return id;
            }
        }catch(e){
            console.error(`Hubo un error al intentar guardar el archivo ${e.Message}`)
        }
    }

    // Object - Recibe un id y devuelve el objeto con ese id, o null si no está
    async getById(id){
        let obj = null;

        try{
            if(this.fs.existsSync(this.archivo)){
                const archivo = await this.fs.promises.readFile(this.archivo,'utf-8')
                .then(cont => {
                    this.productos = JSON.parse(cont);

                    obj = this.productos.filter(x=>x.id == id);
                    
                    if(obj.length > 0){
                        obj = obj[0];
                    }else{
                        obj = null;
                    }
                })
                .catch(err => console.error(`Hubo un error al querer leer el archivo por ID- ERROR - ${err.Message}`));
            }
        }catch(e){
            console.error(`Hubo un error al intentar obtener el objeto ${id} del archivo de productos.`);
        }

        return obj;
    }

    // Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAll(){
        let objs = null;

        try{
            if(this.fs.existsSync(this.archivo)){
                const archivo = await this.fs.promises.readFile(this.archivo,'utf-8')
                .then(cont => {
                    this.productos = JSON.parse(cont);
                })
                .catch(err => console.error(`Hubo un error al querer obtener los datos del archivo - ERROR - ${err.Message}`));
            }
        }catch(e){
            console.error(`Hubo un error al intentar obtener el objeto ${id} del archivo de productos.`);
        }

        return this.productos;
    }

    // void - Elimina del archivo el objeto con el id buscado.
    async deleteById(id){
        try{
            let objs = [];

            if(this.fs.existsSync(this.archivo)){
                var archivo = await this.fs.promises.readFile(this.archivo,'utf-8')
                .then(cont =>{
                    this.productos = JSON.parse(cont);

                    objs = this.productos.filter(x=>{ return x.id != id; });

                    // Sobreescribo el archivo con los productos
                    const escritura = this.fs.promises.writeFile(this.archivo, JSON.stringify(objs,null,2))
                    .catch(e=>{
                        console.log(e);
                    });

                    console.log(`El producto ${id} ya no se encuentra en el archivo de productos.`)

                })
                .catch(er =>{
                    console.error(`Hubo un error al leer el archivo - ERROR - ${er.Message}`)
                    console.log(er);
                });

                /*                     
                     */
            }
        }catch(e){
            console.error(`No se pudo eliminar el producto ${id} - ERROR - ${e.Message}`)
        }
    }
    
    // void - Elimina todos los objetos presentes en el archivo
    async deleteAll(){
        if(this.fs.existsSync(this.archivo)){
            const borrado = await this.fs.promises.unlink(this.archivo)
            .then(x=>console.log('Archivo borrado'))
            .catch(e=>console.error('Hubo un error al eliminar el archivo'))
        }
    }
}

/* Ejecuciones de prueba */
const cont = new Contenedor();


module.exports = cont;