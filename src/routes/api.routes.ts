import { Router } from 'express';

import authenticationRouter from './authentication.routes';
import usersRouter from './user.routes';
import artistsRouter from './artist.routes';


const apiRouter = Router();

apiRouter.use('/auth', authenticationRouter)
  .use('/users', usersRouter)
  .use('/artists', artistsRouter);


export default apiRouter;