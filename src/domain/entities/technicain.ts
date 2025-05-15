export interface Technician {
    id?: string;
    fullname: string;
    email: string;
    mobile: string;
    password: string;
    profilePic?: string;
    dob?: Date;
    gender?: string;
    address?: string;
    experience?:number;
    certification?:string;
    categories?: string[];
    profileCompleted?:boolean;
    isVerified?: boolean;
    isListed?: boolean;
    wallet?: number;
  }
  