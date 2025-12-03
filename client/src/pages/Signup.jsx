import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff } from 'lucide-react';
import './Signup.css';

export default function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        password: '',
        confirmPassword: '',
        userType: 'owner' // 'owner' or 'sitter'
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
        if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
        if (!formData.city) newErrors.city = 'La ciudad es requerida';

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Simulate user creation - in real app, this would call an API
            const user = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString()
            };

            // Store user in localStorage (mock authentication)
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');

            // Navigate based on user type
            if (formData.userType === 'sitter') {
                navigate('/become-sitter');
            } else {
                navigate('/search');
            }
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-card fade-in">
                    <div className="signup-header">
                        <h1>Crear Cuenta</h1>
                        <p>Únete a la comunidad de amantes de mascotas</p>
                    </div>

                    <form onSubmit={handleSubmit} className="signup-form">
                        {/* User Type Selection */}
                        <div className="user-type-selector">
                            <button
                                type="button"
                                className={`type-btn ${formData.userType === 'owner' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, userType: 'owner' })}
                            >
                                <span className="type-icon">🐕</span>
                                <span>Dueño de Mascota</span>
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${formData.userType === 'sitter' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, userType: 'sitter' })}
                            >
                                <span className="type-icon">👤</span>
                                <span>Cuidador</span>
                            </button>
                        </div>

                        {/* Name Fields */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">
                                    <User size={16} />
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                                    placeholder="Juan"
                                />
                                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <User size={16} />
                                    Apellido *
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                                    placeholder="Pérez"
                                />
                                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="form-group">
                            <label className="form-label">
                                <Mail size={16} />
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                placeholder="tu@email.com"
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        {/* Phone and City */}
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">
                                    <Phone size={16} />
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`form-input ${errors.phone ? 'error' : ''}`}
                                    placeholder="099 123 456"
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <MapPin size={16} />
                                    Ciudad *
                                </label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`form-input ${errors.city ? 'error' : ''}`}
                                >
                                    <option value="">Selecciona tu ciudad</option>
                                    <option value="Montevideo">Montevideo</option>
                                    <option value="Canelones">Canelones</option>
                                    <option value="Maldonado">Maldonado</option>
                                    <option value="Punta del Este">Punta del Este</option>
                                    <option value="Salto">Salto</option>
                                    <option value="Paysandú">Paysandú</option>
                                    <option value="Colonia">Colonia</option>
                                </select>
                                {errors.city && <span className="error-message">{errors.city}</span>}
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-group">
                            <label className="form-label">
                                <Lock size={16} />
                                Contraseña *
                            </label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`form-input ${errors.password ? 'error' : ''}`}
                                    placeholder="Mínimo 6 caracteres"
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

                        {/* Confirm Password */}
                        <div className="form-group">
                            <label className="form-label">
                                <Lock size={16} />
                                Confirmar Contraseña *
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                                placeholder="Repite tu contraseña"
                            />
                            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-primary btn-block">
                            Crear Cuenta
                        </button>

                        {/* Login Link */}
                        <div className="auth-footer">
                            <p>
                                ¿Ya tienes cuenta?{' '}
                                <Link to="/login" className="auth-link">Iniciar Sesión</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
