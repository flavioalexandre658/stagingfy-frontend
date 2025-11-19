import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

import { Plan, UserSubscription } from "@/interfaces/plan.interface";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    userName?: string;
    mobileNumber?: string;
    access_token?: string;
    plan?: Plan;
    subscription?: UserSubscription;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      userName?: string;
      mobileNumber?: string;
      access_token?: string;
      plan?: Plan;
      subscription?: UserSubscription;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    userName?: string;
    mobileNumber?: string;
    access_token?: string;
    plan?: Plan;
    subscription?: UserSubscription;
    expired?: boolean;
  }
}
