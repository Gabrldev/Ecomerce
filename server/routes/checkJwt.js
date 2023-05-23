import express from "express";

import { checkJwt } from "../controllers/auth.js";

const router = express.Router();

router.post('/checkjwt', checkJwt)

export default router;