import { Router } from "express";
import { productController } from "./product.controller";
const ProductRouter = Router()


ProductRouter.post('/', productController.createProduct)
ProductRouter.get('/', productController.getAllProducts)
ProductRouter.get('/:productId', productController.getProductById)
ProductRouter.put('/:productId', productController.updateProducts)
ProductRouter.delete('/:productId', productController.deleteProducts)
 export default ProductRouter