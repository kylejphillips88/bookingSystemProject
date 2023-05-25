import { RequestHandler } from "express";
import RideRequestModel from "../models/ride_request";
import mongoose from "mongoose";
import createHttpError from "http-errors";

//Retrieves all logged ride requests. Function to be used to display all member's ride requests clickable on page. 
export const getRideRequests: RequestHandler = async (req, res, next) => {
    try {
        const rideRequests = await RideRequestModel.find().exec();
        res.status(200).json(rideRequests);
    } catch (error) {
        next(error);
    }
    
};

//Retrieves one specific ride request. Can be used to view and cancel a booking.
export const getRideRequest: RequestHandler = async (req, res, next) => {
    const rideRequestId = req.params.rideRequestId;
    try {
        if (!mongoose.isValidObjectId(rideRequestId)) {
            throw createHttpError(400, "Invalid ID");
        }

        const rideRequest = await RideRequestModel.findById(rideRequestId).exec();

        if (!rideRequest) {
            throw createHttpError(404, "Ride Request not found.");
        }

        res.status(200).json(rideRequest);        
    } catch (error) {
        next(error);
    }
};

interface createRideRequestBody {
    pickup?: string,
    dest?: string,
    wheelchair?: string,
    passengers?: number,
    additionalNotes?: string
}

export const createRideRequest: RequestHandler<unknown, unknown, createRideRequestBody, unknown> = async (req, res, next) => {
    const pickup = req.body.pickup;
    const dest = req.body.dest;
    const wheelchair = req.body.wheelchair;
    const passengers = req.body.passengers;
    const additionalNotes = req.body.additionalNotes;

    try {
        if(!pickup) {
            throw createHttpError(400, "Ride request must have pickup address.");
        } else if(!dest) {
            throw createHttpError(400, "Ride request must have destination address.");
        } else if(!wheelchair) {
            throw createHttpError(400, "Ride request must have wheelchair question answered.");
        }  else if(!passengers) {
            throw createHttpError(400, "Ride request must state number of passengers.");
        }

        const newRideRequest = await RideRequestModel.create({
            pickup: pickup,
            dest: dest,
            wheelchair: wheelchair,
            passengers: passengers,
            additionalNotes: additionalNotes
        });

        res.status(201).json(newRideRequest);
    } catch (error) {
        next(error);
    }
};

export const deleteRideRequest: RequestHandler = async(req, res, next) => {
    const rideRequestId = req.params.rideRequestId;

    try {
        if (!mongoose.isValidObjectId(rideRequestId)) {
            throw createHttpError(400, "Invalid ID")
        }
        const rideRequest = await RideRequestModel.findById(rideRequestId).exec();

        if (!rideRequest){
            throw createHttpError(404, "Ride request not found.")
        }

        await rideRequest.deleteOne();
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}