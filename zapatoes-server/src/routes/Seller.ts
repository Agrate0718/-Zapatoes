import  express  from "express";
import { isRegularExpressionLiteral } from "typescript";
import controller from '../controllers/Seller'

const router = express.Router();

router.post('/create', controller.createSeller);
router.post('/login', controller.sellerLogin)
router.get('/get/:sellerId', controller.readSeller);
router.get('/get/', controller.readAll);
router.patch('/update/:sellerId', controller.updateSeller);
router.delete('/delete/:sellerId', controller.deleteSeller);

export = router;