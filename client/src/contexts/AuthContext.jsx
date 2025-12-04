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
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');
            console.log('🔍 Checking auth, token exists:', !!token);
            
            if (token) {
                try {
                    console.log('📡 Fetching current user...');
                    const userData = await api.auth.getCurrentUser();
                    console.log('✅ User authenticated:', userData);
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('❌ Failed to get current user:', error);
                    // Token is invalid, remove it
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('currentUser');
                    setUser(null);
                    setIsAuthenticated(false);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log('⚠️ No token found');
                setLoading(false);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            console.log('🔐 Attempting login with:', credentials.email);
            const data = await api.auth.login(credentials);
            console.log('✅ Login successful, received token:', data.token ? 'Yes' : 'No');
            console.log('✅ User data:', data.user);
            
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            setUser(data.user);
            setIsAuthenticated(true);
            
            console.log('✅ Auth state updated, isAuthenticated:', true);
            return data;
        } catch (error) {
            console.error('❌ Login failed:', error);
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            console.log('📝 Attempting signup with:', userData.email);
            const data = await api.auth.signup(userData);
            console.log('✅ Signup successful, received token:', data.token ? 'Yes' : 'No');
            console.log('✅ User data:', data.user);
            
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            setUser(data.user);
            setIsAuthenticated(true);
            
            console.log('✅ Auth state updated, isAuthenticated:', true);
            return data;
        } catch (error) {
            console.error('❌ Signup failed:', error);
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
