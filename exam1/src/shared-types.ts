export type IdType = number | undefined

export type FormFieldDict<Value> = {
    [field: string]: Value
};

export type Optinal<V> = V | undefined

export enum userRole{
    user1 = "USER",
    user2 = "ADMIN"
}

