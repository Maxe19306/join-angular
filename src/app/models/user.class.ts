export class User {
    firstName : string;
    lastName : string;
    mail: string;
    department : string;
    uid : string;
    Admin: boolean;

    constructor(obj: any){
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.mail = obj ? obj.mail : '';
        this.department = obj ? obj.department : '';
        this.uid = obj ? obj.uid : '';
        this.Admin = obj ? obj.Admin : false;
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            mail: this.mail,
            department: this.department,
            uid: this.uid,
            Admin: this.Admin
        }
    }

}