import  express  from 'express';
import controller from '../controllers/Inquiry';

const router = express.Router();

router.post('/create', controller.createInquiry);
router.get('/get/:inquiryId', controller.readInquiry);
router.get('/get/', controller.readAll);
router.patch('/update/:inquiryId', controller.updateInquiry);
router.delete('/delete/:inquiryId', controller.deleteInquiry);

export = router;