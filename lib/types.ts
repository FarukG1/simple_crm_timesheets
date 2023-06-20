export type Address = {
    street: string;
    nr: number;
    zip: number;
    city: string;
}

export type TableType = {
    customer: boolean;
    caregiver: boolean;
    appointment: boolean;
}
export class Table {
    public Caregiver: TableType = {
        customer: false,
        caregiver: true,
        appointment: false,
    }
    public Customer: TableType = {
        customer: true,
        caregiver: false,
        appointment: false,
    }
    public Appointment: TableType = {
        customer: false,
        caregiver: false,
        appointment: true,
    }
}