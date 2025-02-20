export type LoginFields = {
    email: string;
    password: string;
}

export type RegisterFields = {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export type User = {
    _id: string,
    email: string,
    password: string,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
    role?: "user" | "admin",
    active?: boolean,
    __v?: number
}