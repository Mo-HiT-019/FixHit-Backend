
export interface Address {
  residential?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
}


export interface Technician {
    _id?: string;
    fullname: string;
    email: string;
    mobile: string;
    password: string;
    profilePic?: string;
    dob?: Date;
    gender?: string;
    address?: Address;
    experience?:number;
    certification?:string;
    services?: string[];
    documents?: string[];
    verificationId?: string[];
    profileCompleted?:boolean;
    isVerified?: boolean;
    verificationRequested?:boolean;
    isListed?: boolean;
    wallet?: number;
  }
  