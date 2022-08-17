{
    const {optionsSQL} = require('./options/sqllite');
    const knexSQL = require('knex')(optionsSQL);

    try{
        console.log('Se intenta crear la tabla de mensajes');
        
        knexSQL.schema.createTable('mensajes', table=>{
            table.increments('id');
            table.string('text');
            table.string('author');
            table.string('time');
        }).then(()=> { console.log('Tabla de mensajes creada'); })
        .catch((err) => { 
            console.log(err);
        })
        .finally(()=>{ knexSQL.destroy(); });
    }catch(e){
        console.log(e);
    }

}

{
    const {options} = require('./options/mariadb');
    const knex = require('knex')(options);

    try{
        knex.schema.createTable('productos',table =>{
            table.increments('id').primary();
            table.string('nombre');
            table.string('thumbnail');
            table.integer('precio');
        }).then(()=> { console.log('Tabla creada'); })
        .catch((err) => { console.log(err); throw err;} )
        .finally(()=>{knex.destroy();});
    }catch(e){
        console.log(e);
    }

}