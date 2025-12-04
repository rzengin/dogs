import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on mount
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // Verify token and get user data
            api.auth.getCurrentUser()
                .then((userData) => {
                    setUser(userData);
                    setIsAuthenticated(true);
                })
                .catch((error) => {
                    console.error('Failed to get current user:', error);
                    // Token is invalid, remove it
                    localStorage.removeItem('authToken');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        try {
            const data = await api.auth.login(credentials);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            setUser(data.user);
            setIsAuthenticated(true);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            const data = await api.auth.signup(userData);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            setUser(data.user);
            setIsAuthenticated(true);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
