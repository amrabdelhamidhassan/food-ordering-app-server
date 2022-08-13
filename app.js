const express=require("express")
const path=require("path")
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const compression=require('compression')
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const bodyParser = require('body-parser')

const productRouter=require("./routes/productRoutes")
const userRouter=require("./routes/userRoutes")
const categoryRouter=require("./routes/categoryRoutes")
const subcategoryRouter=require("./routes/subcategoryRoutes")
const orderRouter=require("./routes/orderRoutes")
const errorController=require('./controllers/errorController')
const AppError = require('./utils/AppError');


const app=express();
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  
// Set security HTTP headers
app.use(helmet());
module.exports=app;  

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,  //1 hour 
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);

  // Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use( hpp());

// 3) ROUTES
 app.use('/api/v1/categories', categoryRouter);
 app.use('/api/v1/subcategories', subcategoryRouter);
 app.use('/api/v1/products', productRouter);
 app.use('/api/v1/users', userRouter);
 app.use('/api/v1/orders', orderRouter);
app.use(errorController);
 app.use(compression())
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });