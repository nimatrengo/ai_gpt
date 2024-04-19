import { Router } from 'express';
import userAuth from './auth';
import room from './room';
import bot from './bot';
import suggest from './suggest';

const router = Router();

router.use('/auth', userAuth);
router.use('/bot', bot);
router.use('/suggestion', suggest);
router.use('/room', room);

export default router;
