module.exports = fn => (req,res,next )=>{
       Promise.resolve(fn(req,res,next)).catch(next);
    };


//     When a request arrives Express calls the wrapper. 
// The wrapper calls fn(req,res,next) which returns a Promise because fn is async.
// If the Promise rejects, .catch(next) runs and calls next(err).
//  That triggers your global error-handling middleware.