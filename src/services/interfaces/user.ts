import { Call } from "./calls";

export interface User {
  name: string;
  email: string;
  admin: boolean;
  created_at: Date;
  call: Call[];
}

