let db = [
    {id: 1, name: 'iPhone 11', image: 'http://localhost:3000/images/p1.webp', quantity: 10, price: 1000},
    {id: 2, name: 'iPhone 11 Pro', image: 'http://localhost:3000/images/p2.webp', quantity: 10, price: 1200},
    {id: 5, name: 'Samsung Galaxy S10', image: 'http://localhost:3000/images/p5.webp', quantity: 10, price: 900},
    {id: 8, name: 'Samsung Galaxy Note 10', image: 'http://localhost:3000/images/p8.webp', quantity: 10, price: 1100},
    {id: 9, name: 'HP 250 G7', image: 'http://localhost:3000/images/p9.webp', quantity: 10, price: 800},
    {id: 10, name: 'Lenovo IdeaPad S145', image: 'http://localhost:3000/images/p10.webp', quantity: 10, price: 700},
];
let counter = 0;

module.exports = class Product {
    constructor(id, name, image, quantity, price) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.quantity = quantity;
        this.price = price;
    }

    save(){
        this.id = ++counter; //start with 1
        db.push(this);
        return this;
    }
    static reduceQuantity(prodId, quantity){

        let productIndex = db.findIndex(product => product.id === prodId);
        db[productIndex].quantity -= quantity;
        return db[productIndex];

    }

    static getAll(){
        return db;
    }

    static get(prodId){
        return db.find(prod => prod.id == +prodId);
    }

}
