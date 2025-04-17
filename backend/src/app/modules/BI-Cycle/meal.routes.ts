import { Router } from 'express';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middleware/bodyParser';
import {  MealController } from './meal.controller';
import validateRequest from '../../middleware/validateRequest';
import { productValidation } from './meal.validation';

const router = Router();

router.get('/products', MealController.getAllMeal);


router.get('/products/:mealId', MealController.getSingleMeal);


router.post(
   '/products',
   multerUpload.fields([{ name: 'images' }]),
   parseBody,
   MealController.CreateMeal
);

router.patch(
   '/:mealId',
   auth(UserRole.ADMIN),
   multerUpload.fields([{ name: 'images' }]),
   parseBody,
   MealController.updateProduct
);

router.delete(
   '/:mealId',
   auth(UserRole.ADMIN),
   MealController.deleteProduct
);

export const MealRoutes = router;
