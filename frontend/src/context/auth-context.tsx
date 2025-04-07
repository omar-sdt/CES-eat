import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    error: string | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setAccessToken(token);
        }
    }, [localStorage]);

    const login = async (email: string, password: string) => {
        try {
            setError(null);
            const data = await loginUser(email, password);
            const { token } = data;

            if (token) {
                setAccessToken(token);
                localStorage.setItem("accessToken", token);
                navigate("/home");
            }
        } catch (error) {
            setError("Identifiants incorrects. Veuillez réessayer.");
        }
    };

    const logout = () => {
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const loginUser = async (email: string, password: string) => {
    return new Promise<{ token: string }>((resolve, reject) => {
        setTimeout(() => {
            const fakeUser = {
                email: "admin@admin.com",
                password: "admin",
                token: "fake-jwt-token",
            };

            if (email === fakeUser.email && password === fakeUser.password) {
                resolve({ token: fakeUser.token });
            } else {
                reject(new Error("Identifiants incorrects"));
            }
        }, 1000);
    });
};
