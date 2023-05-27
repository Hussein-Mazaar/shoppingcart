const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const User = require('./models/user');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Swagger configuration options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shopping Cart API Documentation',
      version: '1.0.0',
      description: 'Shopping Cart API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],

  },
  apis: ['./routes/userRouter.js', './routes/productRouter.js', './routes/cartRouter.js']
};


  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// login request

app.use('/api/users', userRouter);

app.use((req, res, next) => {
    const auth = req.headers.authorization;
    if (auth) {
    const userId = auth.split('-')[0]
    const user = User.findById(userId);
    if (user) {
       req.user = user;
       next();
    } else {
        res.status(401).json({error: 'Invalid username and password!'});
    }
    } else {
        res.status(401).json({error: 'Invalid username and password!'});
    }
})


app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);


// app.use((error, req, res, next)=>{
//     res.status(500).json({error: 'Something went wrong'});
// })


app.listen(3000, () => console.log('listening to 3000...'));


