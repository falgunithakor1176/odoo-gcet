import express from "express";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyFirebaseToken, (req, res) => {
  res.json({
    message: "User authenticated",
    uid: req.user.uid,
    email: req.user.email,
  });
});

export default router;
