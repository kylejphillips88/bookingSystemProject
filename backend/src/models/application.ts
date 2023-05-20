import { InferSchemaType, Schema, model } from "mongoose";

const applicationSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    dob: { type: String, required: true },
    address: { type: String, required: true },
    town: { type: String, required: true },
    postcode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    altPhoneNumber: { type: String },
    emailAddress: { type: String, required: true },
    gender: { type: String, required: true},
    ethnicity: { type: String, required: true},
    disability: { type: String, required: true},
    disabilityDetails: { type: String },
    otherHealthConditions: { type: String },
    emergencyName: { type: String, required: true},
    emergencyPhone: { type: String, required: true},
    emergencyRelationship: { type: String, required: true}
},{ timestamps: true });

type Application = InferSchemaType<typeof applicationSchema>;

export default model<Application>("Application", applicationSchema);