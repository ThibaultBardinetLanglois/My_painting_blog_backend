import { Router } from 'express';
import { UserController } from '../controllers/user.controller'; 
import { verifyToken } from '../middlewares/security/authentication.middleware';

const usersRouter = Router();

usersRouter.get(
  '/',  
  verifyToken,
  UserController.getAll
);  

export default usersRouter;