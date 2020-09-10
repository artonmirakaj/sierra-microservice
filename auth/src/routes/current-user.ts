import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../keys';
import { currentUser } from './../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null  });
});

export { router as currentUserRouter };