
import express, { Router } from "express";
import { 
    deleteTournament,
    createNewTournament,
    getTournamentInfo,
    getConnectedUsers,
 } from '../controllers/tournament.controller.js';

import { inviteLimiter } from '../middleware/limiter/limiter.js';
import decodeToken from '../middleware/auth/decodeToken.js';
import passport from "passport";

const router = express.Router();
const requireAuth = passport.authenticate("jwt", { session: false }, null);

router.get("/:id/tournament-info", requireAuth, decodeToken, getTournamentInfo);
router.get("/:id/connected-friends", requireAuth, decodeToken, getConnectedUsers);


router.post("/:id/create-tournament", requireAuth, decodeToken, createNewTournament);

router.delete(deleteTournament);

router.use(inviteLimiter);

export default router;

// Admin / Routes (( Feature )) Public users to Join.