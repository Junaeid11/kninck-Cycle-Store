import { Router } from 'express';
import { UserController } from './user.controller';
import clientInfoParser from '../../middleware/clientInfoParser';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import { UserRole } from './user.interface';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middleware/bodyParser';

const router = Router();

router.get('/', auth(UserRole.ADMIN), UserController.getAllUser);

router.get('/profile', auth(UserRole.ADMIN, UserRole.USER), UserController.myProfile);

router.post(
   '/register',
   validateRequest(UserValidation.userValidationSchema),
   UserController.registerUser
);
router.put(
   '/profile',
   auth(UserRole.USER ,UserRole.ADMIN),
   multerUpload.single('profilePhoto'),
   parseBody,
   validateRequest(UserValidation.customerInfoValidationSchema),
   UserController.updateProfile
);


router.patch(
   '/:id/status',
   auth(UserRole.ADMIN),
   UserController.updateUserStatus
);

export const UserRoutes = router;
