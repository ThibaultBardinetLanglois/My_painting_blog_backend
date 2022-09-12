import { Router } from 'express';
import { ArtistController } from '../controllers/artist.controller';

const artistsRouter = Router();

artistsRouter.get('/', ArtistController.getAll);

artistsRouter.get('/:id', ArtistController.getById);

export default artistsRouter;

