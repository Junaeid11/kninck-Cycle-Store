import { Router } from 'express';
import { OrderController } from './order.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../user/user.interface';

const router = Router();

router.get(
    '/admin/order',
    OrderController.getProvidersOrder
);

router.get(
    '/customers/orders',
    auth(UserRole.USER),
    OrderController.getMyOrders
);

router.get(
    '/:orderId',
    auth(UserRole.USER),
    OrderController.getOrderDetails
);

router.post(
    '/customers/order',
    auth(UserRole.USER),
    OrderController.createOrder
)

router.patch(
    '/providers/response/:orderId',
    auth(UserRole.ADMIN),
    OrderController.changeOrderStatus
)
router.put(
    '/providers/response/:orderId',
    auth(UserRole.ADMIN),
    OrderController.changeStatus
)

export const OrderRoutes = router;
