import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    price:Number,
    image:String,
    title:String
})

const ProductModel = mongoose.model("product", productSchema);
export default ProductModel