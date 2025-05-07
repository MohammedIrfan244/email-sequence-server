import { createList , deleteList , addLead , removeLead , getAllList , getListById } from "../controllers/flow/leadController";
import express from "express";
import { tryCatch } from "../lib/utils/tryCatch";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router 
.post("/create-list", verifyToken, tryCatch(createList))
.delete("/delete-list/:id", verifyToken, tryCatch(deleteList))
.post("/add-lead", verifyToken, tryCatch(addLead))
.delete("/remove-lead/:id", verifyToken, tryCatch(removeLead))
.get("/get-all-list", verifyToken, tryCatch(getAllList))
.get("/get-list/:id", verifyToken, tryCatch(getListById));

export default router;