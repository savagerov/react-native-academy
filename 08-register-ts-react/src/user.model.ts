export enum Gender {
    MALE = 1, FEMALE
}

export enum UserRole {
    USER = 1, ADMIN
}

export enum UserStatus {
    ACTIVE = 1, SUSPENDED, DEACTIVATED
}

export class User {
    static nextId = 0;
    id = ++User.nextId;
    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public date = new Date(),
        public gender = Gender.MALE,
        public role = UserRole.USER,
        public userPicture = ``,
        public shortDescription?: string,
        public status = UserStatus.ACTIVE,
    ) {}
}