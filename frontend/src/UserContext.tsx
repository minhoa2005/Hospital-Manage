import React, { createContext, useContext, useEffect, useState } from "react";
import publicService from "./service/public.ts";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import type { loginData } from "../type/publicType.ts";

const UserContext = createContext<any>({
    user: {},
    setUser: () => { },
    loading: false,
    authen: false,
    login: async () => { },
    logout: async () => { },
    getCurrentUser: async () => { },
});

export default function UserProvider({ children }: any) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [authen, setAuthen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            console.log("Checking auth...");
            const check = await publicService.getCurrentUser();
            if (check.success) {
                setUser(check.user);
                setAuthen(true);
                setLoading(false);
            } else {
                setUser({});
                setAuthen(false);
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (data: loginData) => {
        setLoading(true);
        try {
            const result = await publicService.login(data);
            console.log("result: ", result)
            console.log(result);
            if (result.success) {
                setUser(result.user);
                setAuthen(true);
                setLoading(false);
                return result;
            } else {
                setLoading(false);
                setAuthen(false);
                setUser({});
                return {
                    success: false,
                    message: result.message,
                };
            }
        } catch (error) {
            setAuthen(false);
            setUser({});
            setLoading(false);
            return {
                success: false,
                message: "Error: " + error,
            };
        }
    };
    const logout = async () => {
        try {
            const result = await publicService.logout();
            console.log(result);
            if (result.success) {
                setUser({});
                setAuthen(false);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCurrentUser = async () => {
        setLoading(true);
        try {
            const result = await publicService.getCurrentUser();
            if (result.success) {
                setUser(result.user);
                setAuthen(true);
                setLoading(false);
                return result;
            } else {
                setUser({});
                setAuthen(false);
                setLoading(false);
                return {
                    success: false,
                    message: "Error",
                };
            }
        } catch (error) {
            setUser({});
            setAuthen(false);
            setLoading(false);
            navigate("/login");
            return {
                success: false,
                message: "Error",
            };
        }
    };
    return (
        <UserContext.Provider
            value={{ user, setUser, loading, authen, login, logout, getCurrentUser }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("No context");
    }
    return context;
};
