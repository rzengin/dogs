import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        if (loginError) {
            setLoginError('');
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await login(formData);
                navigate('/search');
            } catch (error) {
                setLoginError(error.message || 'Error al iniciar sesión');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card fade-in">
                    <div className="login-header">
                        <div className="logo-circle">🐾</div>
                        <h1>Bienvenido de Vuelta</h1>
                        <p>Inicia sesión en tu cuenta de Rintintin</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {loginError && (
                            <div className="login-error">
                                {loginError}
                            </div>
                        )}

                        {/* Email */}
                        <div className="form-group">
                            <label className="form-label">
                                <Mail size={16} />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                placeholder="tu@email.com"
                                autoComplete="email"
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label className="form-label">
                                <Lock size={16} />
                                Contraseña
                            </label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`form-input ${errors.password ? 'error' : ''}`}
                                    placeholder="Tu contraseña"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        {/* Remember & Forgot */}
                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                <span>Recordarme</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary btn-block">
                            Iniciar Sesión
                        </button>

                        {/* Divider */}


                        {/* Social Login - Optional */}


                        {/* Signup Link */}
                        <div className="auth-footer">
                            <p>
                                ¿No tienes cuenta?{' '}
                                <Link to="/signup" className="auth-link">Crear Cuenta</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
