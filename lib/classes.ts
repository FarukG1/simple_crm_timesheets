import { Address } from "./types";
import { ObjectId } from "mongodb";

export class Customer {
    id: ObjectId;
    name: string;
    lastname: string;
    birthdate: Date;
    address: Address;
    phonenumber: string;
    email: string;
    inhouse: boolean;
}
export class Caregiver {
    id: ObjectId;
    name: string;
    lastname: string;
    birthdate: Date;
    address: Address;
    phonenumber: string;
    email: string;
    inhouse: boolean;
}
export class Appointment {
    id: ObjectId;
    customer: Customer;
    caregiver: Caregiver;
    location: Address
    date: Date;
}