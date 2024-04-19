import { Router } from 'express';
import type { NextFunction, Response, Request } from 'express'
import { basicAuth } from '@/Presentation/Middleware/authenticateToken';
import { CreateRoomController } from '@/Domain/ChatRoom/Presentation/Controller/CreateRoom';

const router = Router();
const createRoomController = new CreateRoomController();

function createRoom(
    req: Request,
    res: Response,
    next: NextFunction) {
    return basicAuth(req, res, next);
}

router.post('/create', createRoom, createRoomController.handler);

export default router;
