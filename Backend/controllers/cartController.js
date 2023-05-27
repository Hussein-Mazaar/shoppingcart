const Cart = require('../models/cart');
const LineItem = require('../models/lineItem');
const Product = require('../models/product');

exports.cartInfo = (req, res, next) => {
    let cart = Cart.get(req.user.id, 'open');
    if (cart) {
        const items = LineItem.getAll(cart.id);
        res.status(200).json({ cart: cart, items: items });
    }
    else {
        let cart = new Cart(req.user.id);
        res.status(200).json({ cart: cart.save(), items: [] })
    }
};

exports.addItem = (req, res, next) => {

    let cart = Cart.get(req.user.id, 'open');
    let product = Product.get(+req.body.prodId);

    if (!cart) {
       cart = new Cart(req.user.id).save();
    }

    if (!product) {
       return res.status(404).json({ error: "Product not found" })
    }

    let lineItem = LineItem.get(cart.id, req.body.prodId);

    if(lineItem && (lineItem.quantity + req.body.quantity) > product.quantity )
    {
        return res.status(404).json({ error: "Out of stock" })
    }

     else if (+req.body.quantity > product.quantity) {
        return res.status(404).json({ error: "Out of stock" })
     }
    else {
    cart = cart.addItem(req.body.prodId, req.body.quantity);
    res.status(200).json({ cart: cart, items: LineItem.getAll(cart.id) });
    }
};


exports.setItemQuantity = (req, res, next) => {
    let cart = Cart.get(req.user.id, 'open');

    if (cart) {
        const item = LineItem.findById(req.body.itemId)
        let product = null;
        if (!item || item.cartId != cart.id) {
           return res.status(404).json({ error: "Item not found" })
        }
        product =  Product.get(item.prodId)
        if(!product){
            res.status(404).json({ error: "Product not found" })
        }
        else if (+req.body.quantity <= product.quantity) {

            cart.setItemQuantity(req.body.itemId, +req.body.quantity);
            res.status(200).json({ cart: cart, items: LineItem.getAll(cart.id) });

        } else if (+req.body.quantity > product.quantity) {
            res.status(404).json({ error: "Out of stock" })
        }
        else {
            res.status(404).json({ error: "Item not found" })
        }
    }
    else {
        res.status(404).json({ error: "Item not found" })
    }
}

exports.placeOrder = (req, res, next) => {
    let cart = Cart.get(req.user.id, 'open');
    if (cart) {
        cart = cart.placeOrder();
        res.status(200).json(cart);
    }
    else {
        res.status(404).json({ error: "Cart not found" })
    }
}
