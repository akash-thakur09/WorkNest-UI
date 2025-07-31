import type { User } from "./userType";

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    login: (user: User) => void;
    logout: () => void;
    loading: boolean;
}

export type { AuthContextType };