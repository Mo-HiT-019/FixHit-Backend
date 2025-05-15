export interface User{
    id?:string;
    fullname:string;
    email:string;
    password:string;
    dob? : Date;
    mobile?: String
    profilePic?: String
    gender?: 'male' | 'female' | 'other';
    address?:String;
    wallet:number;
    isBlocked:boolean;
    createdAt?: Date;
    updatedAt?: Date;
}