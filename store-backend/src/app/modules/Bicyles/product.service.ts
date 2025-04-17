import { StatusCodes } from 'http-status-codes';
import QueryBuilder from "../../../builder/QueryBuilder";
import { IImageFiles } from "../../../interface/IImageFile";
import { APPerror } from "../../errors/AppError";
import { productSearchable } from "./product.constant";
import { BiCycle } from "./product.interface";
import Product from "./product.model";




const createProductIntoDb = async (productData: Partial<BiCycle>,
    productImages: IImageFiles,) => {
        const { images } = productImages;

        if (!images || images.length === 0) {
           throw new APPerror(
            StatusCodes.BAD_REQUEST,
              'Meal images are required.'
           );
        }
        productData.image = images.map((image) => image.path);

        const newProduct = new Product({
           ...productData,
        });
        const result = await newProduct.save();
     
        return {
           result,
        };

}
const getProductFromDb = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(Product.find(), query).search(productSearchable).filter().sort().fields().paginate()


    const result = await productQuery.modelQuery
    const meta = await productQuery.countTotal()
    return {
        result,
        meta
    }
}
const getProductByIdFromDb = async (_id: string) => {
    const result = await Product.findById({ _id })
    return result
}
const updateProductFromDb = async (id: string, data: BiCycle) => {
    const result = await Product.findByIdAndUpdate(id, data, {
        new: true
    })
    return result

}
const deleteProductFromDb = async (id: string) => {
    const result = await Product.findByIdAndDelete(id)
    return result

}

export const productServices = {
    createProductIntoDb,
    getProductFromDb,
    getProductByIdFromDb,
    updateProductFromDb,
    deleteProductFromDb
}
