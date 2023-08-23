import express from 'express';
import { login, register, getInfoUser } from './controller.js';

const routes = express.Router();

routes.route('/login').post(login);
routes.route('/register').post(register);
routes.route('/Info').get(getInfoUser);

export default routes;