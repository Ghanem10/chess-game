
import express, { Router } from 'express';
import passport from 'passport';

import {
    signin,
    addUser,
    getUser,
    refreshToken,
    logout,
} from '../controllers/user.controller.js';

import {
    getPublicFriends,
    getUsersFriends,
    getPublicFriendById,
    addFriend,
    removeFriend,
    updatePlayerStatus,
} from '../controllers/profile.controller.js';

import {
    addUserValidator,
    addUserValidatorHandler
} from '../middleware/user/validateUsers.js';

import { avatarUpload } from '../middleware/user/avatarUpload.js';

import {
    inviteLimiter,
    signUpAndSignInLimiter
} from '../middleware/limiter/limiter.js';

import decodeToken from '../middleware/auth/decodeToken.js';


const router = express.Router();
const requireAuth = passport.authenticate("jwt", { session: false }, null);

router.get("/connected-friends", requireAuth, decodeToken, getUsersFriends);
router.get("/public-friend/:id", requireAuth,decodeToken, getPublicFriendById);
router.get("/public-friends", requireAuth, decodeToken, getPublicFriends);
router.get("/:id", requireAuth, getUser);

router.post(
    "/signup",
    signUpAndSignInLimiter,
    addUserValidatorHandler,
    addUserValidator,
    avatarUpload,
    addUser,
);

router.post(
    "/signIn",
    signUpAndSignInLimiter,
    signin
);

router.use(inviteLimiter);

router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

router.patch("/:id/add-friend", requireAuth, decodeToken, addFriend);
router.patch("/:id/remove-friend", requireAuth, decodeToken, removeFriend);

router.put("/:id/update-status", requireAuth, decodeToken, updatePlayerStatus);

export default router;