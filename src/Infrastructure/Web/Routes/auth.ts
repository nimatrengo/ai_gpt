import { Request, Response, Router } from 'express';
import { RegisterController } from '@/Domain/Authentication/Presentation/Controller/RegisterController';

const router = Router();
const registerController = new RegisterController();

function registerControllee(req: Request, res: Response) {
  return registerController.handler(req, res);
}

router.post('/register', registerControllee);

export default router;
