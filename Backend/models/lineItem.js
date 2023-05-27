const Product = require('../models/product');

let counter = 0;
let db = [];

module.exports = class LineItem {
    constructor(cartId, prodId, quantity) {
        this.id = null;
        this.cartId = cartId;
        this.prodId = prodId;
        this.quantity = quantity;
        const product = Product.get(prodId);
        this.price = product.price;
        this.name = product.name;
        this.totalPrice = this.price * quantity;
    }

    save(){
        this.id = ++counter; //start with 1;
        db.push(this);
        return this;
    }

    static getAll(cartId){
        return db.filter(item => item.cartId == +cartId);
    }

    static get(cartId, prodId){
        return db.find(item => item.prodId == +prodId && item.cartId == +cartId);
    }

    static findById(id){
        return db.find(item => item.id == +id);
    }

    static findById(id){
        return db.find(item => item.id == +id);
    }

    static removeItem(itemId){
        const index = db.findIndex(item => item.id == +itemId);
        const deletedItem = db[index];
        db.splice(index, 1);
        return deletedItem;
    }


}
