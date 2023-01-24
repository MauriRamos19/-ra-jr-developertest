import { Router } from 'express';
import vehiclesController from '../controllers/vehicles.controller';

const router = Router();


router.route('/vehicle/register-entry').patch(vehiclesController.entryCase)
router.route('/vehicle/register-exit').patch(vehiclesController.exitCase)

router.get('/vehicle/all', vehiclesController.getAllVehicles)
router.put('/vehicle', vehiclesController.addVehicle)

router.get('/vehicles/logs', vehiclesController.getLogs)
router.get('/vehicle/:id', vehiclesController.getVehicle)

router.route('/vehicle/:id')
  .put(vehiclesController.editVehicle)
  .delete(vehiclesController.deleteVehicle)

export default router;
