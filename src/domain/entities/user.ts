export interface Address {
  residential?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
}

export interface User{
    _id?:string;
    fullname:string;
    email:string;
    password:string;
    dob? : Date;
    mobile?: String
    profilePic?: String
    gender?: 'male' | 'female' | 'other';
    address?: Address;
    wallet:number;
    isBlocked:boolean;
    createdAt?: Date;
    updatedAt?: Date;
}