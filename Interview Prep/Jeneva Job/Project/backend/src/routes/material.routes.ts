import { Router } from 'express';
import { MaterialController } from '../controllers/MaterialController';

const router = Router();
const controller = new MaterialController();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/category/:categoryId', controller.getByCategory);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
