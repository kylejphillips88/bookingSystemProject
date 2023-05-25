import { RequestHandler } from "express";
import createHttpError from "http-errors";
import StaffModel from '../models/staff';
import bcrypt from "bcrypt";
import env from '../util/validateEnv';

export const getAuthenticatedStaff: RequestHandler = async (req, res, next) => {
    const authenticatedStaffId = req.session.staffId;

    try {
        if (!authenticatedStaffId) {
            throw createHttpError(401, "User not authenticated.");
        }

        const staff = await StaffModel.findById(authenticatedStaffId).select("+email").exec();
        res.status(200).json(staff);
    } catch (error) {
        next(error)
    }
};

interface SignUpStaffBody {
    email?: string,
    password?: string,
}

export const signUpStaff: RequestHandler<unknown, unknown, SignUpStaffBody, unknown> = async (req, res, next) => {
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingEmail = await StaffModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "Account already existing with this email address.")
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, env.HASH_LENGTH);

        const newStaff = await StaffModel.create({
            email: email,
            password: passwordHashed,
        });
        
        res.status(201).json(newStaff);
    } catch (error) {
        next(error);
    }

};

interface StaffLoginBody {
    email?: string,
    password?: string,
}

export const staffLogin: RequestHandler<unknown, unknown, StaffLoginBody, unknown> = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!email || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const staff = await StaffModel.findOne({email: email}).select("+password +email").exec();

        if (!staff) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, staff.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.staffId = staff._id;
        res.status(201).json(staff);
    } catch (error) {
        next(error);
    }

}

export const staffLogout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else{
            res.sendStatus(200);
        }
        
    })
}

/*interface ForgotPasswordBody {
    email?: string,
}

export const forgotPassword: RequestHandler<unknown, unknown, ForgotPasswordBody, unknown> = async (req,res,next) => {
    const email = req.body.email;
    try {       
        if (!email) {
            throw createHttpError(400, "Enter email address");
        }
        const existingEmail = await StaffModel.findOne({ email: email }).exec();
        if (!existingEmail) {
            throw createHttpError(409, "No account associated with this email.")
        }


    } catch (error) {
        next(error);
    }
}*/
