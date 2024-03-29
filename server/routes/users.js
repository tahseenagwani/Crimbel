import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js"
//Read
const router =express.Router();
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);


//Update

router.patch("/:id/:frienId",verifyToken,addRemoveFriend);


export default router;
