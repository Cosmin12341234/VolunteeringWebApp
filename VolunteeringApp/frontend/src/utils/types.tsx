export enum Type {
    Admin = 'ADMIN',
    Volunteer = 'VOLUNTEER',
}

export enum Gender {
    Male = 'MALE',
    Female = 'FEMALE',
}

export type LoginRequest = {
    username: string;
    password: string;
}

export type User = {
    id: number;
    username: string;
    name: string;
    password: string;
    type: Type;
    mail: string;
    phone: string;
    city: string;
    description: string;
    gender: Gender;
    events: number[];
};

export type UserResponse = {
    id: number;
    username: string;
    name: string;
    type: Type;
    mail: string;
    phone: string;
    city: string;
    description: string;
    gender: Gender;
};

export type UserRequest = {
    username: string;
    name: string;
    password: string;
    type: Type;
    mail: string;
    phone: string;
    city: string;
    description: string;
    gender: Gender;
};

export type Event = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    users: number[];
};

export type EventRequest = {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
};

export type EventResponse = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    users: number[];
};