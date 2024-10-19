import express from "express";
import { getUser, updateUser } from '../controllers/UserController.js';

const router = express.Router();

router.get('/profile/:id', getUser);
router.post('/profile', updateUser);

export default router;
