import { InferSchemaType, Schema, model } from "mongoose";

const rideRequestSchema = new Schema({
    pickup: { type: String, required: true },
    dest: { type: String, required: true },
    wheelchair: { type: String, required: true},
    passengers: { type: Number, required: true},
    additionalNotes: { type: String }
}, { timestamps: true });

type RideRequest = InferSchemaType<typeof rideRequestSchema>

export default model<RideRequest>("RideRequest", rideRequestSchema);