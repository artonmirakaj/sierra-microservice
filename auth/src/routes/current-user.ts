import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../keys';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      JWT_KEY
    );
    console.log('current user jwt: ', req.session.jwt);
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };