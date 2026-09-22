const mongoose = require('mongoose');
const dotenv = require('dotenv');
//this is uncaught error handle for example if we access undefine variable such as console.log(x);
process.on('uncaughtException',err=>{
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name,err.message);
  process.exit(1);
});



dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex:true,
    // useFindAndModify:false
}).then(() =>{
 console.log("DB connection successfull");
})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
//this error handler for the problem rise in database connection
process.on('unhandledRejection',err=>{
  console.log('UNHANDLER REJECTION! SHUTTING DOWN...');
  console.log(err.name,err.message);
  server.close(()=>{
  process.exit(1);
  });
});
///////////////////////////

process.on('SIGTERM',()=>{
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(()=>{
    console.log(' Process terminated!');
  });
});

// Heroku frequently restarts your app's "dynos" — for routine maintenance, scaling, deploys, or every ~24 hours (a mandatory daily cycling). When it does this, it sends your app a SIGTERM signal to say "please shut down."

// Without this handler, Node would abruptly kill the process — potentially cutting off requests mid-response, leaving users with errors or incomplete data.



