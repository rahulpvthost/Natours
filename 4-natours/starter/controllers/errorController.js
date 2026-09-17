 
const AppError = require('../utilis/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate field value entered for ${value}. Please use another value!`;
  return new AppError(message, 400);
}

const handlevalidationErrorDB = err =>{
  const errors = Object.values(err.errors).map(el => el.message);
  const message =`Invalid input data.${errors.join('. ')}`;
  return new AppError(message,400);
}

const handleJWTError = () =>
   new AppError('Invalid token. Please log in again!',401);

const handleJWTExpiredError = () =>
   new AppError('Your token has expired! Please log in again.',401);


  const sendErrorDev = (err,req,res) =>{ 
    //API
    if(req.originalUrl.startsWith('./api')){
      res.status(err.statusCode).json({
     status: err.status,
     message: err.message ,
     stack: err.stack,
     error: err
 });

    }else{
      //RENDERED WEBSITE
      res.status(err.statusCode).render('error',{
        title: 'Something went wrong',
        msg:err.message
      })
    }       
  
  }

  const sendErrorProd = (err,req,res) =>{
    //A) API
    if(req.originalUrl.startsWith('./api')){
      if(err.isOperational){
      res.status(err.statusCode).json({
      status: err.status,
      message: err.message ,
  });

    }else{
      //1) Log error
      // 2) Send generic message
       console.error('ERROR 💥', err);
        res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
  });
    }  
    }else
      //B)RENDERED WEBSITE
      
      if(err.isOperational){
     res.status(err.statusCode).render('error',{
        title: 'Something went wrong',
        msg:err.message
  });

    }else{
      //1) Log error
      // 2) Send generic message
        res.status(err.statusCode).render('error',{
        title: 'Something went wrong',
        msg: 'Please try again later.'
  });
    }
  };
  

 module.exports =(err, req, res, next) => {
err.statusCode = err.statusCode || 500;
err.status = err.status || 'error';

 if(process.env.NODE_ENV === 'development'){
 sendErrorDev(err,req, res);
 }else if(process.env.NODE_ENV === 'production'){    
   
  let error = { ...err};
  error.message = err.message;
  error.name = err.name;  


  if(error.name === 'CastError') error = handleCastErrorDB(error);
  if(error.code === 11000) error = handleDuplicateFieldsDB(error);
  if(err.name === 'ValidationError') 
  error =handlevalidationErrorDB(error);

  if(error.name === 'JsonWebTokenError') error = handleJWTError();
  if(error.name === 'TokenExpiredError') error = handleJWTExpiredError();


  sendErrorProd(error,req, res);
 }
 };
