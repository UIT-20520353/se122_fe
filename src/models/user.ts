export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  age: number;
  overall: number;
  target: number;
  description: string;
  avatar: string;
  status: "ACTIVE" | "BLOCKED";
  role: "ADMIN" | "USER";
}

export interface UserProfileModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  gender: string;
  age: number;
  overall: number;
  target: number;
  description: string;
  avatar: string;
  token: string;
}
