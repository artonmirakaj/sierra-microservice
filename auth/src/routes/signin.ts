import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from './../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from './../errors/bad-request-error';
import { Password } from './../services/password';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../keys';

const router = express.Router();

router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if(!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if(!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }

    await existingUser.save();

    const userJwt = jwt.sign({
      id: existingUser.id,
      email: existingUser.email
    }, JWT_KEY);

    req.session = {
      jwt: userJwt
    };

    console.log('sign in jwt: ', req.session.jwt);

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };