import  express  from 'express';
import controller from '../controllers/Shoe';

const router = express.Router();

router.post('/create', controller.createShoe);
router.get('/get/:shoeId', controller.readShoe);
router.get('/get/', controller.readAll);
router.patch('/update/:shoeId', controller.updateShoe);
router.delete('/delete/:shoeId', controller.deleteShoe);

export = router;