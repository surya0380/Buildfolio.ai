import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/api';

const AppContext = createContext();

export function AppContextProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loadUser, setLoadUser] = useState(true);


    const checkUserSession = async () => {
        try {
            const { data } = await api.get("/api/auth/me");
            // setUser(data.user)
        } catch (error) {
            setUser(null)
        } finally{
            setLoadUser(false)
        }
    }

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession])
    


    return (
        <AppContext.Provider value={{user, loadUser}}>
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