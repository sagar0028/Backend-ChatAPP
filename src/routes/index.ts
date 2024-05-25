import {Router} from 'express';
import {sendMessage} from '../controllers/chatController';
import {userSignup,userLogin} from "../controllers/loginConroller/registerController";
const router = Router();

router.post('/chat', sendMessage);


router.post('/register', userSignup)
router.post('/login', userLogin)

export default router;
