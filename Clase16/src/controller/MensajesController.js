const mensajesModel = require("../models/MensajesModel");

class MensajesController {
  static async getAll(){
    //console.log('Se intenta obtener todo');
    return await mensajesModel.getAll();
  }

  static async guardarMensaje(data){
    return await mensajesModel.guardarMensaje(data.text,data.author);
  }
}

module.exports = MensajesController;

