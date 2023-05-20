import express from "express";
import * as ApplicationsController from "../controllers/applications";

const router = express.Router();

router.get("/", ApplicationsController.getApplications);

router.get("/:applicationId", ApplicationsController.getApplication);

router.post("/", ApplicationsController.createApplication);

router.delete("/:applicationId", ApplicationsController.deleteApplication);

export default router;