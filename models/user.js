const mongoose=require('mongoose')
const User=mongoose.model('User',{
    username:{
        type:String
    },
    email:{
        type:String
    },
    age:{
        type:Number
    },
    height:{
        type:Number

    },
    neck:{
        type:Number
    },
    waist:{
        type:Number
    },
    gender:{
        type:String
    },
    activity:{
        type:Date

    },
    id:{
        type:Number
    },
    password:{
        type:String
    }

})



module.exports=User