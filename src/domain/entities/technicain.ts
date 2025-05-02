export interface Technician {
    id: string;
    username: string;
    email: string;
    mobile: string;
    password: string;
    profilePic?: string;
    dob?: Date;
    gender?: string;
    address?: string;
    categoryId: string;
    isVerified: boolean;
    isBlocked: boolean;
    walletBalance: number;
  }
  