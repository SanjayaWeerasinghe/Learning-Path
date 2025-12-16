import { Router } from 'express';
import { WarehouseController } from '../controllers/WarehouseController';

const router = Router();
const controller = new WarehouseController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
