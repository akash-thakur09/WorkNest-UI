// AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import type { User } from '../types/userType';
import type { AuthContextType } from '../types/authContextType';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS, ROUTES } from '../constants';

// 1️⃣ Create context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2️⃣ Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // set true initially
    const navigate = useNavigate();

    // 🌟 Debug log
    console.log("user in AuthContext:", user);

    // 3️⃣ On initial load: check localStorage
    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

        if (token && storedUser) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem(STORAGE_KEYS.USER);
                localStorage.removeItem(STORAGE_KEYS.TOKEN);
            }
        }

        setLoading(false);
    }, []);

    // 5️⃣ Auth actions
    const login = (user: User, token: string) => {
        setUser(user);
        setIsAuthenticated(true);
        setLoading(false);
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        navigate(ROUTES.LOGIN);
    };

    // 6️⃣ Provide context value
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
