import { createFlow , deleteFlow } from "../controllers/flow/flowController";
import express from "express";
import { tryCatch } from "../lib/utils/tryCatch";
import verifyToken from "../middlewares/verifyToken";
import route from "./authRoute";


const router = express.Router();
router
  .post("/create-flow", verifyToken, tryCatch(createFlow))
  .delete("/delete-flow/:id", verifyToken, tryCatch(deleteFlow));

export default router;