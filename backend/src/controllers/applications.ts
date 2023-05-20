import { RequestHandler } from "express";
import ApplicationModel from "../models/application";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getApplications: RequestHandler = async (req, res, next) => {
    try {
        const applications = await ApplicationModel.find().exec();
        res.status(200).json(applications);
    } catch (error) {
        next(error);
    }
};

export const getApplication: RequestHandler = async (req,res,next) => {
    const applicationId = req.params.applicationId;

    try {
        if (!mongoose.isValidObjectId(applicationId)) {
            throw createHttpError(400, "Invalid ID");
        }

        const application = await ApplicationModel.findById(applicationId).exec();

        if (!application) {
            throw createHttpError(404, "Member application form not found.");
        }

        res.status(200).json(application);
    } catch (error) {
        next(error);
    }
}

interface CreateApplicationBody {
    firstName?: string,
    lastName?: string,
    dob?: string,
    address?: string,
    town?: string,
    postcode?: string,
    phoneNumber?: string,
    altPhoneNumber?: string,
    emailAddress?: string,
    gender?: string,
    ethnicity?: string,
    disability?: string,
    disabilityDetails?: string,
    otherHealthConditions?: string,
    emergencyName?: string,
    emergencyPhone?: string,
    emergencyRelationship?: string,
}

export const createApplication: RequestHandler<unknown, unknown, CreateApplicationBody, unknown> = async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dob = req.body.dob;
    const address = req.body.address;
    const town = req.body.town;
    const postcode = req.body.postcode;
    const phoneNumber = req.body.phoneNumber;
    const altPhoneNumber = req.body.altPhoneNumber;
    const emailAddress = req.body.emailAddress;
    const gender = req.body.gender;
    const ethnicity = req.body.ethnicity
    const disability = req.body.disability
    const disabilityDetails = req.body.disabilityDetails
    const otherHealthConditions = req.body.otherHealthConditions
    const emergencyName = req.body.emergencyName
    const emergencyPhone = req.body.emergencyPhone
    const emergencyRelationship = req.body.emergencyRelationship
    try {
        if (!firstName || !lastName || !dob || !address || !town || !postcode || !phoneNumber || !emailAddress || !gender || !ethnicity || !disability || !emergencyName || !emergencyPhone || !emergencyRelationship) {
            throw createHttpError(400, "Application form is missing required information.")
        }
        const newApplication = await ApplicationModel.create({
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            address: address,
            town: town,
            postcode: postcode,
            phoneNumber: phoneNumber,
            altPhoneNumber: altPhoneNumber,
            emailAddress: emailAddress,
            gender: gender,
            ethnicity: ethnicity,
            disability: disability,
            disabilityDetails: disabilityDetails,
            otherHealthConditions: otherHealthConditions,
            emergencyName: emergencyName,
            emergencyPhone: emergencyPhone,
            emergencyRelationship: emergencyRelationship
        })

        res.status(201).json(newApplication)
    } catch (error){
        next(error);
    }
};

export const deleteApplication: RequestHandler = async(req, res, next) => {
    const applicationId = req.params.applicationId;
    try {
        if (!mongoose.isValidObjectId(applicationId)) {
            throw createHttpError(400, "Invalid ID");
        }

        const application = await ApplicationModel.findById(applicationId).exec();

        if (!application){
            throw createHttpError(404, "Member application form not found.")
        }

        await application.deleteOne();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}