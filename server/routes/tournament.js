import express from 'express';
import { config } from 'dotenv';
import { 
    createTournament, 
    deleteTournament, 
    getTournament, 
    updateTournament 
} from '../controller/tournaments/struc.js';
config();

const tournamenetRoute = express.Router();

tournamenetRoute.route("/getTournament/:id").get(getTournament);
tournamenetRoute.route("/updateTournament/:id").post(updateTournament);
tournamenetRoute.route("/deleteTournament/:id").delete(deleteTournament);
tournamenetRoute.route("/createTournament/:id").put(createTournament);

export default tournamenetRoute;