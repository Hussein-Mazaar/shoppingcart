const LineItem = require('./lineItem');
const Product = require('./product');


let db = [];
let counter = 0;

module.exports = class Cart {
    constructor(userId) {
        this.id = null;
        this.userId = userId;
        this.totalPrice = 0;
        this.status = 'open'
    }

    save() {
        this.id = ++counter;
        db.push(this);
        return this;
    }

    addItem(prodId, quantity) {
        let item =  LineItem.get(this.id, prodId);
        if (item) {
            item.quantity += quantity;
            item.totalPrice = item.price * item.quantity;
            this.totalPrice += item.price * quantity;
            return this;
        }
        else {
          item = new LineItem(this.id, prodId, quantity)
          item.save();
          this.totalPrice += item.totalPrice;
          return this;
        }
    }

    setItemQuantity(itemId, quantity) {
        let item = LineItem.findById(itemId);

        this.totalPrice -= item.totalPrice;
        item.quantity = quantity;
        // if the new quantity equal 0 or less remove the item
        if (quantity <= 0) {
            LineItem.removeItem(itemId);
            return this;
        } else {
            item.totalPrice = item.price * quantity;
            this.totalPrice += item.totalPrice;
            return this;
        }
    }

    static get(userId, status) {
            return db.find(cart => cart.userId == userId && cart.status == status);
    }

    placeOrder() {
        let items = LineItem.getAll(this.id);
        items.forEach(item => {
           Product.reduceQuantity(item.prodId, item.quantity);
        })
        this.status = 'closed';
        return this;
    }

}
