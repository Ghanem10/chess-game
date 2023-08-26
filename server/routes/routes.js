import express from 'express';
import { login, register, getInfoUser } from '../controller/controller.js';
import { config } from 'dotenv';
config();

const routes = express.Router();

routes.route('/login').post(login);
routes.route('/register').post(register);
routes.route('/Info').post(getInfoUser);

export default routes;