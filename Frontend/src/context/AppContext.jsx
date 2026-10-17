import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

export function AppContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadUser, setLoadUser] = useState(true);

    const navigate = useNavigate()

    const checkUserSession = async () => {
        try {
            const { data } = await api.get("/api/auth/me");
            setUser(data.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoadUser(false)
        }
    }

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession])


    const login = async (email, password) => {
        try {
            const { data } = await api.post("/api/auth/login", { email, password });
            setUser(data.user);
            toast.success("Welcome back!");
            navigate("/")
        } catch (error) {
            console.error("login failed with: ", error);
            const errMsg = error?.response?.data?.error || "Invalid credentials"
            toast.error(errMsg);
            throw new Error(errMsg)
        }
    }

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post("/api/auth/register", { name, email, password });
            setUser(data.user);
            toast.success("Account created successfully!");
            navigate("/")
        } catch (error) {
            console.error("Registration failed: ", error);
            const errMsg = error?.response?.data?.error || "Registration failed"
            toast.error(errMsg);
            throw new Error(errMsg)
        }
    }

    return (
        <AppContext.Provider value={{ user, loadUser, login, register }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppContextProvider")
    }

    return context;
}