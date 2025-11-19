"use client"
import { createContext, useContext, useState } from "react";

import { User } from "@/interfaces/user.interface";


const defaultUser: User = {
    id: "",
    userName: "",
    email: "",
    mobileNumber: "",
    access_token: "",
    created_at: "",
    updated_at: "",
    agents: [],

};

type UserContextType = {
    user: User;
    setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
    user: defaultUser,
    setUser: () => { }
});

export const UserProvider = ({ children/*, initialUser*/ }: { children: React.ReactNode/*, initialUser: User*/ }) => {
    const [user, setUser] = useState<User>(/*initialUser ||*/ defaultUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
