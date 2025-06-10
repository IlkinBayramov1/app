import ProductModel from "../models/model.js";


const getPro = async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.json(products)
    } catch (error) {
        console.log(error);
    }
}

const postPro = async (req, res) => {
    try {
        const product = await ProductModel.create(req.body)
        res.json(product)
    } catch (error) {
        console.log(error);
    }
}


const deletePro = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)
        res.json(product)
    } catch (error) {
        console.log(error);
    }
}



export { getPro, postPro, deletePro }