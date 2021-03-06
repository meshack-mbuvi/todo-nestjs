import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, UserLogin, } from './dto';

import { Response } from 'express';
import { UserEntity } from '../entity/user';
import { getRepository } from 'typeorm';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  static async getAll(): Promise<User[]> {
    return await getRepository(UserEntity).find();
  }

  static async signUp(body: User, res: Response) {
    try {
      const {
        firstName, lastName, email, password,
      } = body;

      if (!firstName || !lastName || !email || !password) {
        return res.status(HttpStatus.BAD_REQUEST)
          .send({
            error: 'firstName, lastName, email and password fields are required',
            status: HttpStatus.BAD_REQUEST,
          });
      }

      const userExists = await getRepository(UserEntity).findOne({ email });

      if (userExists) {
        throw new HttpException(
          {
            error: 'An account with similar email address exists',
            status: HttpStatus.CONFLICT,
          }, 409);
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      const user = await new UserEntity();
      user.password = passwordHash;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;

      const results = await getRepository(UserEntity).save(user);

      // remove password hash from object before sending the object
      delete user.password;

      return res.status(201).send(results);
    } catch (error) {
      return res.status(409).send(error.message);
    }
  }

  static async login(body: UserLogin, res: Response): Promise <any> {
    const { password, email } = body;

    if (!email || !password) {
      return res.status(HttpStatus.BAD_REQUEST)
        .send({
          error: 'email and password fields are required',
          status: HttpStatus.BAD_REQUEST,
        });
    }

    const user = await getRepository(UserEntity).findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

      const { firstName, lastName } = user;

      return res.status(200).send({ firstName, lastName, token });
    } else {
      return res.status(401).send({ message: 'Wrong password or email!' });
    }
  }
}
