import { Router } from 'express';
import { PurchasingRequestController } from '../controllers/PurchasingRequestController';

const router = Router();
const controller = new PurchasingRequestController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id/status', controller.updateStatus);
router.delete('/:id', controller.delete);

export default router;
