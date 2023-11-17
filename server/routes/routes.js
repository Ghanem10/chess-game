import express from 'express';
import { login, register } from '../controller/users/authUser.js';
import { config } from 'dotenv';
import { deleteUser, getUserData } from '../controller/users/userData.js';
config();

const routes = express.Router();

routes.route('/login').post(login);
routes.route('/register').post(register);
routes.route('/userInfo/:id').delete(deleteUser).get(getUserData);

export default routes;