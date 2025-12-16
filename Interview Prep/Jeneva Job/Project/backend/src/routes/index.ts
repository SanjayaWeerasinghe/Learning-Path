import { Router } from 'express';
import unitOfMeasureRoutes from './unitOfMeasure.routes';
import categoryRoutes from './category.routes';
import warehouseRoutes from './warehouse.routes';
import supplierRoutes from './supplier.routes';
import materialRoutes from './material.routes';
import purchasingRequestRoutes from './purchasingRequest.routes';
import purchasingOrderRoutes from './purchasingOrder.routes';

const router = Router();

router.use('/unit-of-measures', unitOfMeasureRoutes);
router.use('/categories', categoryRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/materials', materialRoutes);
router.use('/purchasing-requests', purchasingRequestRoutes);
router.use('/purchasing-orders', purchasingOrderRoutes);

export default router;
