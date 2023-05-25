export interface RideRequest {
    _id: string,
    pickup: string,
    dest: string,
    wheelchair: string,
    passengers: number,
    additionalNotes?: string,
    createdAt: string,
}