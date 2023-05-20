import RosterModel from "../models/roster";
import createHttpError from "http-errors";
import { RequestHandler } from "express";
import mongoose from "mongoose";


export const getRosters: RequestHandler = async (req, res, next) => {
    try {
        const rosters = await RosterModel.find().exec();
        res.status(200).json(rosters);
    } catch (error) {
        next(error);
    }
};

export const getRoster: RequestHandler = async (req, res, next) => {
    const rosterId = req.params.rosterId;

    try {
        if (!mongoose.isValidObjectId(rosterId)) {
            throw createHttpError(400, "Invalid ID");
        }

        const roster = await RosterModel.findById(rosterId).exec();

        if (!roster) {
            throw createHttpError(404, "Driver roster not found.");
        }

    } catch (error) {
        next(error);
    }
}

interface CreateRosterBody {
    date?: string,
    driverName?: string,
    vehiclePlate?: string,
    startTime?: string,
    finishTime?: string,
    availabilityTime?: string[],
    availabilityStatus?: string[],
}

export const createRoster: RequestHandler<unknown, unknown, CreateRosterBody, unknown> = async (req, res, next) => {
    const date = req.body.date;
    const driverName = req.body.driverName;
    const vehiclePlate = req.body.vehiclePlate;
    const startTime = req.body.startTime;
    const finishTime = req.body.finishTime;
    const availabilityTime = req.body.availabilityTime;
    const availabilityStatus = req.body.availabilityStatus;
    try {
        if (!driverName || !vehiclePlate || !startTime || !finishTime) {
            throw createHttpError(400, "Roster is missing required information.")
        }
        const newRoster = await RosterModel.create({
            date: date,
            driverName: driverName,
            vehiclePlate: vehiclePlate,
            startTime: startTime,
            finishTime: finishTime,
            availabilityTime: availabilityTime,
            availabilityStatus: availabilityStatus,
        })

        res.status(201).json(newRoster);
    } catch (error) {
        next(error);
    }
}

interface UpdateRosterParams {
    rosterId: string,
}

interface UpdateRosterBody {
    date?: string,
    driverName?: string,
    vehiclePlate?: string,
    startTime?: string,
    finishTime?: string,
    availabilityTime?: string[],
    availabilityStatus?: string[],
}

export const updateRoster: RequestHandler<UpdateRosterParams, unknown, UpdateRosterBody, unknown> = async(req, res, next) => {
    const rosterId = req.params.rosterId;
    const newDate = req.body.date;
    const newDriver = req.body.driverName;
    const newVehicle = req.body.vehiclePlate;
    const newStartTime = req.body.startTime;
    const newFinishTime = req.body.finishTime;
    const newAvailabilityTime = req.body.availabilityTime;
    const newAvailabilityStatus = req.body.availabilityStatus;

    try {
        if (!mongoose.isValidObjectId(rosterId)) {
            throw createHttpError(400, "Invalid roster ID.")
        }
        if (!newDate || !newDriver || !newVehicle || !newStartTime || !newFinishTime || !newAvailabilityTime || !newAvailabilityStatus) {
            throw createHttpError(400, "Required information missing.")
        }

        const roster = await RosterModel.findById(rosterId).exec();

        if (!roster) {
            throw createHttpError(404, "Roster not found");
        }

        roster.date = newDate;
        roster.driverName = newDriver;
        roster.vehiclePlate = newVehicle;
        roster.startTime = newStartTime;
        roster.finishTime = newFinishTime;
        roster.availabilityTime = newAvailabilityTime;
        roster.availabilityStatus = newAvailabilityStatus;

        const updatedRoster = await roster.save();

        res.status(200).json(updatedRoster);

    } catch (error) {
        next(error)
    }
}

export const deleteRoster: RequestHandler = async(req, res, next) => {
    const rosterId = req.params.rosterId;
    try {
        if (!mongoose.isValidObjectId(rosterId)) {
            throw createHttpError(400, "Invalid ID");
        }

        const roster = await RosterModel.findById(rosterId).exec();

        if (!roster){
            throw createHttpError(404, "Driver roster not found.")
        }

        await roster.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}