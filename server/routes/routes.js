import express from 'express';
import { login, register, getPlayerInfo } from '../controller/controller.js';
import { getPlayerStatus, getPlayerMatchStart } from '../controller/playerStatus.js';
import { config } from 'dotenv';
config();

const routes = express.Router();

routes.route('/login').post(login);
routes.route('/register').post(register);
routes.route('/Info').post(getPlayerInfo);
routes.route('/status').post(getPlayerStatus);
routes.route('/start').post(getPlayerMatchStart);

export default routes;