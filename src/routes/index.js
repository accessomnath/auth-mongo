import { Router } from 'express';
import localAuthRoutes from './localAuth.js';
import googleAuthRoutes from './googleAuth.js';
import facebookAuthRoutes from './facebookAuth.js';
const router = Router();

router.use('/auth', localAuthRoutes);
router.use('/auth', googleAuthRoutes);
router.use('/auth', facebookAuthRoutes);


export default router;

