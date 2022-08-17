const { json } = require("express");

class MensajeEntity{
    constructor(text, author, time){
        this.text = text ? text : '';
        this.author = author ? author : '';
        this.time = time ? JSON.stringify(time) : JSON.stringify(new Date());
    }
}

module.exports = {MensajeEntity}