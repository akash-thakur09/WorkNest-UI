// AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import type { User } from '../types/userType';
import type { AuthContextType } from '../types/authContextType';
import { useNavigate } from 'react-router-dom';

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
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            try {
                const parsedUser: User = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }

        setLoading(false); // ✅ done checking
    }, []);

    // 4️⃣ Sync user state to localStorag
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [user]);

    // 5️⃣ Auth actions
    const login = (user: User) => {
        setUser(user);
        setIsAuthenticated(true);
        setLoading(false); // just in case
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.clear();
        navigate('/');
    };

    // 6️⃣ Provide context value
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
