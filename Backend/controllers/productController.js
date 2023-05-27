const Product = require('../models/product');

exports.getAll = (req, res, next) => {
    res.status(200).json(Product.getAll());
}

exports.getOne = (req, res, next) => {
    res.status(200).json(Product.get(+req.params.productId));
}
