import { Router } from 'express';
import { UnitOfMeasureController } from '../controllers/UnitOfMeasureController';

const router = Router();
const controller = new UnitOfMeasureController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
