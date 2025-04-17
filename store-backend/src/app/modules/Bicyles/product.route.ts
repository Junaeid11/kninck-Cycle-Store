import { Router } from "express";
import { productController } from "./product.controller";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";
const ProductRouter = Router()


ProductRouter.post('/',  multerUpload.fields([{ name: 'images' }]),
parseBody, productController.createProduct)
ProductRouter.get('/', productController.getAllProducts)
ProductRouter.get('/:productId', productController.getProductById)
ProductRouter.put('/:productId', productController.updateProducts)
ProductRouter.delete('/:productId', productController.deleteProducts)
 export default ProductRouter