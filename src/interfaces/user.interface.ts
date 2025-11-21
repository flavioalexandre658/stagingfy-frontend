import { Agent } from "./agent.interface";
import { Plan, UserSubscription } from "./plan.interface";

export interface User {
  id: string;
  userName: string;
  email: string;
  mobileNumber?: string;
  access_token: string;
  created_at: string;
  updated_at: string;
  plan?: Plan;
  subscription?: UserSubscription;
}
