const {MensajeEntity} = require('../entity/MensajeEntity');

const getAll = () => { 
    const {optionsSQL} = require('../../options/sqllite');
    const knex = require('knex')(optionsSQL);

    return knex('mensajes').select('*'); 
}

  
const guardarMensaje = (text, author) => {
    const {optionsSQL} = require('../../options/sqllite');
    const knex = require('knex')(optionsSQL);

    const msg = new MensajeEntity(text, author);

    return knex('mensajes').insert({
        author: msg.author, 
        text: msg.text, 
        time: msg.time
    })
}
  
module.exports = { getAll, guardarMensaje }