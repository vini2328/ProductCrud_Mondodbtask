import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    product_name:{type:String,required:true,trim:true},
    product_price:{type:Number,required:true},
    product_material:{type:String,required:true,trim:true},
    product_color:{type:String,required:true,trim:true},




})

const productModel =mongoose.model('Productsdata',ProductsSchema)

export default productModel