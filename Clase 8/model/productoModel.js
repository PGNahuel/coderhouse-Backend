class ProductoModel{
    constructor(title, price, thumbnail){
        this.title = title ? title : '';
        this.price = price > 0 ? price : 0;
        this.thumbnail = thumbnail ? thumbnail : '';
        this.id = 0;
    }

    setId(id){
        this.id = id;
    }
}

module.exports.ProductoModel = {ProductoModel};