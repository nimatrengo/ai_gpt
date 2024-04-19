import { Router } from 'express';
import type { NextFunction, Response, Request } from 'express'
import { CreateMessageController } from '@/Domain/Bot/Presentation/Controller/CreateMessage';
import { basicAuth } from '@/Presentation/Middleware/authenticateToken';

const router = Router();
const createBotMessageController = new CreateMessageController();

function createBotMessage(
    req: Request,
    res: Response,
    next: NextFunction) {
    return basicAuth(req, res, next);
}

router.post('/create', createBotMessage, createBotMessageController.handler);

export default router;
