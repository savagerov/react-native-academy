import { Repository, RepositoryInMemoryImpl } from './repository.js';
import { IdType, userRole } from "./shared-types.js";

export interface UserReg {
    firstName: string,
    lastName:string,
    username:string,
    password:string,
    gender: string,
    userRoles: userRole,
    shortDescription: string,
    pictureUrl: string,
}

// export class PostCreateDto {
//     constructor(
//         public title: string,
//         public content: string,
//         public tags: string[],
//         public imageUrl: string,
//         public authorId: IdType
//     ) { }
// }

export interface User {
        tags: any;
        authorId: number;
        firstName: string,
        lastName: string,
        username: string,
        password: string,
        gender: string,
        userRoles: userRole,
        shortDescription: string,
        pictureUrl: string,
        id: IdType,
}

export interface UserRepository extends Repository<IdType, User> {
    findByTags(searachTags: string[]): User[];
    findByTitlePart(titlePart: string): User[];
    findByAuthorId(authorId: IdType): User[];
}

export class UserRepositoryImpl extends RepositoryInMemoryImpl<IdType, User> implements UserRepository {
    findByTags(searachTags: string[]): User[] {
        return this.findAll().filter(user => user.tags.some((tag: string) => searachTags.includes(tag)));
    }
    findByTitlePart(titlePart: string): User[] {
        return this.findAll().filter(user => user.firstName.includes(titlePart));
    }
    findByAuthorId(authorId: number): User[] {
        return this.findAll().filter(user => user.authorId === authorId);
    }
}
