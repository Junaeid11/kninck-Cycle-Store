import QueryBuilder from "../../../builder/QueryBuilder";
import { productSearchable } from "./product.constant";
import { BiCycle } from "./product.interface";
import Product from "./product.model";


const createProductIntoDb = async (data: BiCycle): Promise<BiCycle> => {
    const result = await Product.create(data);
    return result;

}
const getProductFromDb = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(Product.find(), query).search(productSearchable).filter().sort().fields().paginate()


    const result =await productQuery.modelQuery
    const meta =await productQuery.countTotal()
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
