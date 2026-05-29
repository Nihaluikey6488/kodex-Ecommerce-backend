import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{
    type:String,
    trim:true,
    required:[true,"Product name is required"]
    },
    description:{
    type:String
    },
    price:{
        type:Number,
         required:[true,"Product Price is required"]
    },
    category:{
        type:String,
        trim :true
    },
    images:[
        {
            type:String
        }

    ]



},{
    timestamps:true
})


const productModel=mongoose.model("product",productSchema)


export default productModel;