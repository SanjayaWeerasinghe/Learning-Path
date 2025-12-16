import { Router } from 'express';
import { PurchasingOrderController } from '../controllers/PurchasingOrderController';

const router = Router();
const controller = new PurchasingOrderController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id/status', controller.updateStatus);
router.delete('/:id', controller.delete);

export default router;
