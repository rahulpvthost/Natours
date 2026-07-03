const Tour= require('../models/tourModel');

exports.getAllTours =  async (req, res) => {
  try{
    //Buid query
    //1.Filtering 
    const queryObj =  {...req.query};
    const excludeFields =['page','sort','limit','fields'];
    excludeFields.forEach(el => delete queryObj[el]);
     //2.Advance Filtering
  let querystr = JSON.stringify(queryObj);
  querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);
  console.log(JSON.parse(querystr));

  const query = Tour.find(JSON.parse(querystr));



       //{difficulty:'easy',duration:{$gte:5}}
       //{difficulty:'easy',duration:{gte:5}}
       //gte,gt,lte,lt
  

//Excute query
   const tours = await query;
      
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}catch(err){
  res.status(404).json({
    status:'fail',
    message:err
  })
}
};

exports.getTour = async (req, res) => {
 try{
 const tour =  await Tour.findById(req.params.id);
 res.status(200).json({
    status: 'success',

    data: {
      tour,
    }
  });

 }catch(err){
  res.status(404).json({
    status:'fail',
    message:err
  })
 }
};

exports.createTour = async (req, res) => {
  try{
    //const newTour = new Tour({})
    // newTour.save()
     const newTour = await Tour.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,

        },
      });

  }catch(err){
    res.status(400).json({
      status:'fail',
      message:'err'
    })
  }
//  const newTours =new Tour({})
//  newTours.save()

    
};
  
exports.updateTour = async (req, res) => {
  try{
    const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    });
     res.status(200).json({
    status: 'success',
    data: {
      tour,
    }
  });

  }
catch(err){
  res.status(404).json({
    status:'fail',
    message:err
  });
}
};

exports.deleteTour = async  (req, res) => {
  try{
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
}catch (err){
  res.status(404).json({
    status:'fail',
    message:err
  });
}
};


