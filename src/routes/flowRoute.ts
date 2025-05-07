import { createFlow , deleteFlow ,getUserFlows, getFlowById } from "../controllers/flow/flowController";
import express from "express";
import { tryCatch } from "../lib/utils/tryCatch";
import verifyToken from "../middlewares/verifyToken";


const router = express.Router();
router
  .post("/create-flow", verifyToken, tryCatch(createFlow))
  .delete("/delete-flow/:id", verifyToken, tryCatch(deleteFlow))
  .get("/get-user-flows", verifyToken, tryCatch(getUserFlows))
  .get("/get-flow/:id", verifyToken, tryCatch(getFlowById));

export default router;