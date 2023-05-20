import express from "express";
import * as RideRequestsController from "../controllers/ride_requests";

const router = express.Router();

router.get("/", RideRequestsController.getRideRequests);

router.get("/:rideRequestId", RideRequestsController.getRideRequest);

router.post("/", RideRequestsController.createRideRequest);

router.delete("/:rideRequestId", RideRequestsController.deleteRideRequest);

export default router;