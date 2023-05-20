import { InferSchemaType, model, Schema } from "mongoose";

const memberSchema = new Schema({
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true, select: false },
    address: { type: String, required: true, select: false },
    dob: { type: String, required: true, select: false },
    phone: { type: String, required: true, select: false },
    altPhoneNumber: { type: String, select: false },
    gender: { type: String, required: true, select: false },
    ethnicity: { type: String, required: true, select: false },
    disability: { type: String, required: true, select: false},
    disabilityDetails: { type: String, select: false },
    otherHealthConditions: { type: String, select: false },
    emergencyName: { type: String, required: true, select: false},
    emergencyPhone: { type: String, required: true, select: false},
    emergencyRelationship: { type: String, required: true, select: false},
})

type Member = InferSchemaType<typeof memberSchema>;

export default model<Member>("Member", memberSchema);