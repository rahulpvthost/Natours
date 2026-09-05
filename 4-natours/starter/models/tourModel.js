const mongoose = require('mongoose');
// const User =require('./userModel');
const slugify = require('slugify');
//const validator = require('validator');

const tourSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true,'A tour must have a name'],
    unique:true,
    trim:true,
    maxlength:[40,'A tour name must have less or equal then 40 character'],
    minlength:[10,'A tour name must have more or equal then 10 character']
    // validate: {
    //   validator: validator.isAlpha,
    //   message: 'Tour name must only contain characters'
    // }
  },
  slug:String,
  duration: {
    type:Number,
    required: [true,'A tour must have a duration']  
  },
  maxGroupSize: {
    type:Number,
    required: [true,'A tour must have a group size']
  },
  ratingAverage: {
    type:Number,
    default:4.5,
    min: [1,'Rating must be above 1.0'],
    max: [5,'Rating must be below 5.0']
  },
  ratingQuntity: {
    type:Number,
    default:0
  },
  difficulty:{
    type:String,
    required: [true,'A tour must have a difficulty'],
    enum: {
         values: ['easy','medium','difficult'],
         message: 'Difficulty is either: easy, medium, difficult'
    } 
  },
  price: {
    type:Number,
    required: [true,'a tour must have a price']
  },
  priceDiscount:{
    type:Number,
    validate:{
      // this only points to current doc on NEW document creation not on update
      validator: function(val){
      return val <this.price;  // user built validator;
    },
      message:'Discount price should be below the regular price'
    }
    
   
  } ,
  summary: {
    type:String,
    trim:true,  
    required: [true,'A tour must have a summary']
  },
  description: {
    type:String,
    trim:true,
  },
  imageCover: {
    type:String,
    required: [true,'A tour must have a cover image']
  },
  images: [String],
  createdAt: { 
    type:Date,
    default:Date.now(),
    select:false  
  },
  startDates: [Date],   
   secretTour:{
    type:Boolean,
    default:false
   }
,
   startLocation: {
    //GeoJSON
    type:{
      type:String,
      default:'Point',
      enum: ['Point']
    },
    coordinates:[Number],
    address:String,
    description:String
   },
   locations:[
    {
      type:{ 
        type:String,
        default:'Point',
        enum:['Point']
      },
      coordinates:[Number],
      address:String,
      description:String,
      day:Number
    }
   ],
   guides:[
       {
        type:mongoose.Schema.ObjectId,
        ref:'User'
      }
   ]
  },{
  toJSON:{virtuals:true},
  toObject:{virtuals:true},
});

tourSchema.index({price:1,ratingAverage:-1});
tourSchema.index({slug:1});

tourSchema.virtual('durationWeeks').get(function(){
  return this.duration/7;
})
//The main reason to use a virtual 
// property is to avoid storing data that can be calculated from other data.



//Virtual populate
tourSchema.virtual('reviews',{
  ref:'Review',
  foreignField:'tour',
  localField:'_id'
});



//Document middleware:runs before save() and.create()
tourSchema.pre('save',function(){
  this.slug = slugify(this.name,{lower:true});

});



// Below this code is for embedding in input it takes id of user in guides field add in schema guides:Array for this to work
// tourSchema.pre('save', async function(next){
//   const guidesPromises = this.guides.map( async id=>  await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });



// tourSchema.pre('save',function(next){
//   console.log('will save document');
//   next();
// });

// tourSchema.post('save',function(doc,next){
// console.log(doc);
// next();
// });

//Query middleware

// this middleware hide data in postman which have secretTour :true,
// if we use find method it didnt show or in database we can see the secret tour


// tourSchema.pre('find',function(next){
tourSchema.pre(/^find/,function(){
  this.find({secretTour:{$ne:true}});

  this.start = Date.now();

});






tourSchema.post(/^find/,function(docs){
  console.log(`Query took ${Date.now()-this.start}milliseconds`)
 
  
})

tourSchema.pre(/^find/,function(){

this.populate({
  path:'guides',
  select: '-__v -passwordChangedAt'
});

  
})

//in this populate in select option see there is - sign which represent that it will not show the __v and passwordChangedAt field in the output of the query.
//It excludes Mongoose's internal __v version key and the sensitive passwordChangedAt timestamp from the populated user data, so they aren't exposed in the API response. 




//AGGREGATION MIDDLEWARE
// this middleware hide the scretTour from aggreation file 
tourSchema.pre('aggregate',function(){
  this.pipeline().unshift({$match:{secretTour : {$ne:true}}});
 // console.log(this.pipeline());
  
})

const Tour = mongoose.model('Tour',tourSchema);
module.exports =Tour;
