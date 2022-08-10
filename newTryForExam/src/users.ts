
export type idType = number | undefined;

export enum Role {
    USER, ADMIN
}

export enum Gender {
    MALE, FEMALE
} 

export enum Status {
    DEACTIVATED, ACTIVE, SUSPENDED
}

export class User {
    constructor (
        public id: idType,
        public email: string, 
        public  password: string,
        public  firstName: string,
        public  lastName: string,
        public  username: string,
        public  role: Role,
        public  gender: Gender,
        public  picUrl: string,
        public  description: string,
        public  status: Status,
        public  regTime: Date,
        public  modifTime: Date,
    ){}
}