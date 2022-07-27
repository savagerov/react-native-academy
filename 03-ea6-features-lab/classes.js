const READER = 0;
const AUTHOR = 1;
const ADMIN = 2;

const Role = ['READER','AUTHOR','ADMIN'];

class Person {
    static nextID = 0;
    id = ++ Person.nextID;
    constructor(fName, lName, adress ) {
        this.fName = fName;
        this.lName = lName;
        this.adress = adress;
    }
    getFullName()  {
        return `${this.fName} ${this.lName}`
    }

    toString() {
        return `ID: ${this.id}, Name: ${this.getFullName()}, Address: ${this.adress} `;
    }

}

class User extends Person {
    constructor(fName, lName, adress, username, password, role = READER) {
        super(fName, lName, adress);
        this.username = username;
        this.password = password;
        this.role = role;
    }
    toString() { //overriding
        return `${super.toString()},Username: ${this.username}, Password: ${this.password}, Role: ${Role[this.role]}`;
    }
    
}

const changePassword = function(newPassword) {
    this.password = newPassword;
}

// the func toString have to be in the SUPER_ADMIN ... to work 
// const toString = function() { //overriding
//     return `SUPERUSER: ${super.toString()}`
// }

const SUPER_ADMIN = { 
    __proto__: User.prototype,
    id:0,
    fName: 'Default',
    lName: 'Admin',
    adress: 'BG', 
    username: 'admin', 
    password: 'admin', 
    role: READER,
    toString() { //overriding
        return `SUPERUSER: ${super.toString()}`
    },
    changePassword
}

const p1 = new Person('John', 'Doe','London');
const p2 = new Person('Jane', 'Doe','New York');
const u1 = new User('Ivan','Petkov','Sofia-1000','ivan','ivan123');
const u2 = new User('Hristina','Petkova','Sofia-1000','hrisi','hrisi1123',ADMIN);
const u3 = new User('Georgi','Hristov','Plovdiv','gosho','gosho123',AUTHOR);
const persons = [p1,p2,u1,u2,u3];
persons.forEach(p => console.log(p.toString()))
console.log(SUPER_ADMIN.toString())
SUPER_ADMIN.changePassword('pass123');
console.log(SUPER_ADMIN.toString())