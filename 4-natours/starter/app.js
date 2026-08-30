
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utilis/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp= require('hpp');
const reviewRouter =require('./Routes/reviewRoutes');


const app = express();

//1)Global Middlewares
//security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP,please try again in an hour!'
});
app.use('/api', limiter);

//Body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));


//Data sanitization against NoSql query injection 
app.use(mongoSanitize());


//Data sanitixation against XSS

app.use(xss());
//Prevent parameter pollution
app.use(hpp({
  whitelist:[
    'duration',
    'ratingsQuantity',
    'ratingAverage',
    'maxGroupSize',
    'difficulty',
    'price'
  ]
})
);


//Serving static files
app.use(express.static(`${__dirname}/public`));


//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
