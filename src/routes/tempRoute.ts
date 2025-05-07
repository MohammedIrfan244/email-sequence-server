import express from "express";
import { tryCatch } from "../lib/utils/tryCatch";
import verifyToken from "../middlewares/verifyToken";
import {
  createTemplate,
  deleteTemplate,
  editTemplate,
  getTemplate,
  getTemplates,
} from "../controllers/flow/templateController";

const router = express.Router();
router
  .post("/create-template", verifyToken, tryCatch(createTemplate))
  .delete("/delete-template/:id", verifyToken, tryCatch(deleteTemplate))
  .put("/edit-template/:id", verifyToken, tryCatch(editTemplate))
  .get("/get-template/:id", verifyToken, tryCatch(getTemplate))
  .get("/get-templates", verifyToken, tryCatch(getTemplates));

export default router;
