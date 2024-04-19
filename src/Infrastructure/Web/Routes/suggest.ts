import { Router } from 'express';
import type { NextFunction, Response, Request } from 'express'
import { basicAuth } from '@/Presentation/Middleware/authenticateToken';
import { CreateSuggestionController } from '@/Domain/Suggestion/Presentation/Controller/CreateSuggestion';

const router = Router();
const createSuggestionController = new CreateSuggestionController();

function createSuggestion(
    req: Request,
    res: Response,
    next: NextFunction) {
    return basicAuth(req, res, next);
}

router.post('/create', createSuggestion, createSuggestionController.handler);

export default router;
