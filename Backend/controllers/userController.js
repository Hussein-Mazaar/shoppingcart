const User = require('../models/user');

exports.save = (req, res, next) => {
    const addedProd = new Product(null, req.body.title, req.body.description, req.body.price).save();
    res.status(201).json(addedProd);
}



exports.login =  (req, res, next)=> {
    const user = User.find(req.body.username , req.body.password);
    if(user){
        res.json({accessToken: `${user.id}-${user.username}-${Date.now().toString()}`})
    } else {
        res.json({error: 'Invalid username and password!'});
    }
};
