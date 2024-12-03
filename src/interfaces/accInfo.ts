export interface accInfo {
    email: string,
    password: string,
    message? : string
} 

export interface signup extends accInfo{
    name: string,
    passwordConfirm: string
}


export interface User  {
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