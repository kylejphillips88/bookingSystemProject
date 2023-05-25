import { RequestHandler } from "express";
import createHttpError from "http-errors";
import MemberModel from '../models/member';
import bcrypt from "bcrypt";
import env from '../util/validateEnv';

export const getAuthenticatedMember: RequestHandler = async (req, res, next) => {
    const authenticatedMemberId = req.session.memberId;

    try {
        if (!authenticatedMemberId) {
            throw createHttpError(401, "User not authenticated");
        }

        const member = await MemberModel.findById(authenticatedMemberId).select("+email").exec();
        res.status(200).json(member);
    } catch (error) {
        next(error)
    }
}

interface SignUpMemberBody {
    email?: string,
    password?: string,
    name?: string,
    dob?: string,
    phone?: string,
    altPhoneNumber?: string,
    gender?: string,
    ethnicity?: string,
    disability?: string,
    disabilityDetails?: string,
    otherHealthConditions?: string,
    emergencyName?: string,
    emergencyPhone?: string,
    emergencyRelationship?: string,
}

export const signUpMember: RequestHandler<unknown, unknown, SignUpMemberBody, unknown> = async (req, res, next) => {
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const name = req.body.name;
    const dob = req.body.dob;
    const phone = req.body.phone;
    const altPhoneNumber = req.body.altPhoneNumber;
    const gender = req.body.gender;
    const ethnicity = req.body.ethnicity;
    const disability = req.body.disability;
    const disabilityDetails = req.body.disabilityDetails;
    const otherHealthConditions = req.body.otherHealthConditions;
    const emergencyName = req.body.emergencyName;
    const emergencyPhone = req.body.emergencyPhone;
    const emergencyRelationship = req.body.emergencyRelationship;

    try {
        if (!email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingEmail = await MemberModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "Account already existing with this email address.")
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, env.HASH_LENGTH);

        const newMember = await MemberModel.create({
            email: email,
            password: passwordHashed,
            name: name,
            dob: dob,
            phone: phone,
            altPhoneNumber: altPhoneNumber,
            gender: gender,
            ethnicity: ethnicity,
            disability: disability,
            disabilityDetails: disabilityDetails,
            otherHealthConditions: otherHealthConditions,
            emergencyName: emergencyName,
            emergencyPhone: emergencyPhone,
            emergencyRelationship: emergencyRelationship,
        });

        req.session.memberId = newMember._id;
        
        res.status(201).json(newMember);
    } catch (error) {
        next(error);
    }
};

interface MemberLoginBody {
    email?: string,
    password?: string,
}

export const memberLogin: RequestHandler<unknown, unknown, MemberLoginBody, unknown> = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!email || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const member = await MemberModel.findOne({email: email}).select("+password +email").exec();

        if (!member) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, member.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.memberId = member._id;
        res.status(201).json(member);
    } catch (error) {
        next(error)
    }
};

export const memberLogout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else{
            res.sendStatus(200);
        }
        
    })
}