export interface RideRequest {
    _id: string,
    pickup: string,
    dest: string,
    wheelchair: boolean,
    passengers: number,
    additionalNotes?: string,
    createdAt: string,
}