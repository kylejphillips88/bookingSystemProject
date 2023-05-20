import { Application } from "../models/application";
import { Member } from "../models/member";
import { RideRequest } from "../models/ride_request";
import { Staff } from "../models/staff";
import { Roster } from "../models/roster";


async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function getLoggedInMember(): Promise<Member> {
    const response = await fetchData("/api/members", { method: "GET" });
    return response.json();
}

export interface SignUpMemberCredentials {
    email: string,
    password: string,
    name: string,
    dob: string,
    phone: string,
    altPhoneNumber?: string,
    gender: string,
    ethnicity: string,
    disability: string,
    disabilityDetails?: string,
    otherHealthConditions?: string,
    emergencyName: string,
    emergencyPhone: string,
    emergencyRelationship: string,
}

export async function signUpMember(credentials: SignUpMemberCredentials): Promise<Member> {
    const response = await fetchData("/api/members/signupmember",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface MemberLoginCredentials {
    email: string,
    password: string,
}

export async function memberLogin(credentials: MemberLoginCredentials): Promise<Member> {
    const response = await fetchData("/api/members/memberlogin", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function memberLogout() {
    await fetchData("api/members/memberlogout", { method: "POST" });
}

export async function getLoggedInStaff(): Promise<Staff> {
    const response = await fetchData("/api/staff", { method: "GET" });
    return response.json();
}

export interface StaffLoginCredentials {
    email: string,
    password: string,
}

export async function staffLogin(credentials: StaffLoginCredentials): Promise<Staff> {
    const response = await fetchData("/api/staff/stafflogin", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function staffLogout() {
    await fetchData("api/staff/stafflogout", { method: "POST" });
}

export async function fetchApplications(): Promise<Application[]> {
    const response = await fetchData("/api/applications", { method: "GET" });
    return response.json();
}

export async function fetchRideRequests(): Promise<RideRequest[]> {
    const response = await fetchData("/api/riderequests", { method: "GET" });
    return response.json();
}

export async function fetchRosters(): Promise<Roster[]> {
    const response = await fetchData("/api/rosters", { method: "GET" });
    return response.json();
}

export interface RosterInput {
    date: string,
    driverName: string,
    vehiclePlate: string,
    startTime: string,
    finishTime: string,
    availabilityTime: string[],
    availabilityStatus: string[]
}

export async function createRoster(roster: RosterInput): Promise<Roster> {
    const response = await fetchData("/api/rosters",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(roster),
    });
    return response.json();
}

export async function updateRoster(rosterId: string, roster: RosterInput): Promise<Roster> {
    const response = await fetchData("/api/rosters/" + rosterId,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(roster),
    });
    return response.json();
}

export interface ApplicationInput {
    firstName: string,
    lastName: string,
    dob: string,
    address: string,
    town: string,
    postcode: string,
    phoneNumber: string,
    altPhoneNumber?: string,
    emailAddress: string,
    gender: string,
    ethnicity: string,
    disability: string,
    disabilityDetails?: string,
    otherHealthConditions?: string,
    emergencyName: string,
    emergencyPhone: string,
    emergencyRelationship: string,
}

export async function createApplication(application: ApplicationInput): Promise<Application> {
    const response = await fetchData("/api/applications",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
    });
    return response.json();
}

export interface RideRequestInput {
    pickup: string,
    dest: string,
    wheelchair: boolean,
    passengers: number,
    additionalNotes?: string,
}

export async function createRideRequest(rideRequest: RideRequestInput): Promise<RideRequest> {
    const response = await fetchData("/api/riderequests", 
    {
        method: "POST",
        headers: { //this application/json is not related to any of my code named application 
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rideRequest),
    });
    return response.json();    
}

export async function deleteRideRequest(rideRequestId: string) {
    await fetchData("/api/riderequests/" + rideRequestId, { method: "DELETE"});
}

export async function deleteApplication(applicationId:string) {
    await fetchData("/api/applications/" + applicationId, { method: "DELETE"});
}

