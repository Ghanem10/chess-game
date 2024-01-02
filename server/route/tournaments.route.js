
import express, { Router } from "express";
import { 
    deleteTournament,
    createNewTournament,
    getTournamentById,
    getPublicTournaments
 } from '../controllers/tournament.controller.js';

import decodeToken from '../middleware/auth/decodeToken.js';
import passport from "passport";

const router = express.Router();
const requireAuth = passport.authenticate("jwt", { session: false }, null);

/**
 * @route tournament/:id
 * @route tournament/public-tournaments
 * @route tournament/:id/create-tournament
 * @route tournament/:id/remove-tournament
*/

router.post("/:id/create-tournament", requireAuth, decodeToken, createNewTournament);
router.get("/public-tournaments", requireAuth, decodeToken, getPublicTournaments);
router.get("/:id", requireAuth, decodeToken, getTournamentById);


router.delete("/:id/remove-tournament", requireAuth, decodeToken, deleteTournament);

export default router;

// Admin / Routes (( Feature )) Public users to Join.