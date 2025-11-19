"use client"
import { useEffect } from "react";

import { useUser } from "@/providers/user";
const UserProviderWrapper = ({ user, children }: { user: any, children: React.ReactNode }) => {
  const { setUser } = useUser();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
};
export default UserProviderWrapper;