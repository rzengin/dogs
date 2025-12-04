import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Upload, MapPin, Briefcase, Home, Calendar, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import './BecomeSitter.css';

export default function BecomeSitter() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isExistingUser, setIsExistingUser] = useState(false);
    const [formData, setFormData] = useState({
        // Personal Info (for new users)
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        city: '',
        neighborhood: '',

        // Experience & Services
        experience: '',
        services: [],
        petTypes: [],

        // Home Details
        propertyType: '',
        hasOutdoorSpace: false,
        allowsPets: false,
        maxPets: '1',

        // Pricing
        price: '',

        // Availability
        availability: [],

        // About
        bio: '',
        skills: '',
        certifications: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user) {
            setIsExistingUser(true);
            setFormData(prev => ({
                ...prev,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                city: user.city || '',
            }));
        }
    }, [isAuthenticated, user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleMultiSelect = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: prev[name].includes(value)
                ? prev[name].filter(item => item !== value)
                : [...prev[name], value]
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Only validate personal info if new user
        if (!isExistingUser) {
            if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
            if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
            if (!formData.email.trim()) newErrors.email = 'El email es requerido';
            if (!formData.password || formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
        if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
        if (!formData.experience) newErrors.experience = 'La experiencia es requerida';
        if (formData.services.length === 0) newErrors.services = 'Selecciona al menos un servicio';
        if (formData.petTypes.length === 0) newErrors.petTypes = 'Selecciona al menos un tipo de mascota';
        if (!formData.propertyType) newErrors.propertyType = 'El tipo de propiedad es requerido';
        if (!formData.bio.trim()) newErrors.bio = 'La descripción es requerida';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'El precio es requerido';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setLoading(true);

        try {
            // If new user, create account first
            if (!isExistingUser) {
                await api.auth.signup({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    city: formData.city,
                    userType: 'sitter'
                });
            } else {
                // Update existing user info if needed
                if (user.phone !== formData.phone || user.city !== formData.city) {
                    await api.users.update(user.id, {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        phone: formData.phone,
                        city: formData.city
                    });
                }
            }

            // Create sitter profile
            await api.sitters.createProfile({
                bio: formData.bio,
                price: parseFloat(formData.price),
                location: formData.city,
                neighborhood: formData.neighborhood,
                experience: formData.experience,
                services: formData.services,
                petTypes: formData.petTypes,
                propertyType: formData.propertyType,
                hasOutdoorSpace: formData.hasOutdoorSpace,
                allowsPets: formData.allowsPets,
                maxPets: formData.maxPets,
                skills: formData.skills,
                certifications: formData.certifications
            });

            setSubmitted(true);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: error.message || 'Error al enviar el formulario' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="become-sitter-page">
                <div className="success-container">
                    <div className="success-card fade-in">
                        <div className="success-icon">
                            <CheckCircle size={64} />
                        </div>
                        <h1>¡Solicitud Enviada!</h1>
                        <p>Gracias por tu interés en ser parte de Rintintin. Revisaremos tu aplicación y te contactaremos pronto.</p>
                        <div className="success-actions">
                            <button onClick={() => navigate('/sitter-dashboard')} className="btn btn-primary">
                                Ir a mi Dashboard
                            </button>
                            <button onClick={() => navigate('/')} className="btn btn-outline">
                                Volver al Inicio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="become-sitter-page">
            <div className="sitter-hero">
                <div className="container">
                    <div className="hero-content fade-in">
                        <h1 className="hero-title">Conviértete en Cuidador</h1>
                        <p className="hero-subtitle">
                            Gana dinero haciendo lo que amas: cuidar mascotas
                        </p>
                        <div className="hero-benefits">
                            <div className="benefit-item">
                                <span className="benefit-icon">💰</span>
                                <span>Ingresos flexibles</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">🏠</span>
                                <span>Trabaja desde casa</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">❤️</span>
                                <span>Haz nuevos amigos peludos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container sitter-content">
                <form onSubmit={handleSubmit} className="sitter-form">
                    {/* Personal Information */}
                    <section className="form-section card slide-in-left">
                        <div className="section-header">
                            <User size={24} />
                            <h2>Información Personal</h2>
                        </div>

                        {errors.submit && (
                            <div className="error-banner">{errors.submit}</div>
                        )}

                        {!isExistingUser && (
                            <div className="info-banner">
                                Crea tu cuenta para convertirte en cuidador
                            </div>
                        )}

                        {isExistingUser && (
                            <div className="info-banner">
                                Hola {user?.name}, completa tu perfil de cuidador
                            </div>
                        )}

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Nombre *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    disabled={isExistingUser}
                                    className={`form-input ${errors.firstName ? 'error' : ''}`}
                                    placeholder="Tu nombre"
                                />
                                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Apellido *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    disabled={isExistingUser}
                                    className={`form-input ${errors.lastName ? 'error' : ''}`}
                                    placeholder="Tu apellido"
                                />
                                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isExistingUser}
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    placeholder="tu@email.com"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            {!isExistingUser && (
                                <div className="form-group">
                                    <label className="form-label">Contraseña *</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`form-input ${errors.password ? 'error' : ''}`}
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                    {errors.password && <span className="error-message">{errors.password}</span>}
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label">Teléfono *</label>
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
                                <label className="form-label">Ciudad *</label>
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

                            <div className="form-group">
                                <label className="form-label">Barrio</label>
                                <input
                                    type="text"
                                    name="neighborhood"
                                    value={formData.neighborhood}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Ej: Pocitos, Carrasco..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Experience & Services */}
                    <section className="form-section card slide-in-left">
                        <div className="section-header">
                            <Briefcase size={24} />
                            <h2>Experiencia y Servicios</h2>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Años de experiencia con mascotas *</label>
                            <select
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                className={`form-input ${errors.experience ? 'error' : ''}`}
                            >
                                <option value="">Selecciona tu experiencia</option>
                                <option value="0-1">Menos de 1 año</option>
                                <option value="1-3">1-3 años</option>
                                <option value="3-5">3-5 años</option>
                                <option value="5+">Más de 5 años</option>
                            </select>
                            {errors.experience && <span className="error-message">{errors.experience}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Servicios que ofreces *</label>
                            <div className="checkbox-group">
                                {['Paseo de Perros', 'Cuidado en Casa', 'Hotel para Mascotas', 'Guardería Canina'].map(service => (
                                    <label key={service} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.services.includes(service)}
                                            onChange={() => handleMultiSelect('services', service)}
                                        />
                                        <span>{service}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.services && <span className="error-message">{errors.services}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Tipos de mascotas que puedes cuidar *</label>
                            <div className="checkbox-group">
                                {['Perros Pequeños', 'Perros Medianos', 'Perros Grandes', 'Gatos', 'Otras'].map(type => (
                                    <label key={type} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.petTypes.includes(type)}
                                            onChange={() => handleMultiSelect('petTypes', type)}
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.petTypes && <span className="error-message">{errors.petTypes}</span>}
                        </div>
                    </section>

                    {/* Home Details */}
                    <section className="form-section card slide-in-left">
                        <div className="section-header">
                            <Home size={24} />
                            <h2>Detalles de tu Hogar</h2>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Tipo de propiedad *</label>
                            <select
                                name="propertyType"
                                value={formData.propertyType}
                                onChange={handleChange}
                                className={`form-input ${errors.propertyType ? 'error' : ''}`}
                            >
                                <option value="">Selecciona el tipo</option>
                                <option value="Casa">Casa</option>
                                <option value="Apartamento">Apartamento</option>
                                <option value="Casa con Patio">Casa con Patio</option>
                            </select>
                            {errors.propertyType && <span className="error-message">{errors.propertyType}</span>}
                        </div>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="hasOutdoorSpace"
                                    checked={formData.hasOutdoorSpace}
                                    onChange={handleChange}
                                />
                                <span>Tengo espacio al aire libre (patio, jardín)</span>
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="allowsPets"
                                    checked={formData.allowsPets}
                                    onChange={handleChange}
                                />
                                <span>Tengo mis propias mascotas</span>
                            </label>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Número máximo de mascotas que puedes cuidar a la vez</label>
                            <select
                                name="maxPets"
                                value={formData.maxPets}
                                onChange={handleChange}
                                className="form-input"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4+">4 o más</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Precio por día (UYU) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={`form-input ${errors.price ? 'error' : ''}`}
                                placeholder="Ej: 500"
                                min="0"
                                step="50"
                            />
                            {errors.price && <span className="error-message">{errors.price}</span>}
                        </div>
                    </section>

                    {/* Availability */}
                    <section className="form-section card slide-in-left">
                        <div className="section-header">
                            <Calendar size={24} />
                            <h2>Disponibilidad</h2>
                        </div>

                        <div className="form-group">
                            <label className="form-label">¿Cuándo estás disponible?</label>
                            <div className="checkbox-group">
                                {['Lunes-Viernes', 'Fin de Semana', 'Noches', 'Feriados'].map(slot => (
                                    <label key={slot} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.availability.includes(slot)}
                                            onChange={() => handleMultiSelect('availability', slot)}
                                        />
                                        <span>{slot}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* About Me */}
                    <section className="form-section card slide-in-left">
                        <div className="section-header">
                            <h2>Sobre Ti</h2>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Cuéntanos sobre ti y tu experiencia con mascotas *</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className={`form-textarea ${errors.bio ? 'error' : ''}`}
                                rows="5"
                                placeholder="Describe tu experiencia, por qué quieres ser cuidador, qué te apasiona de los animales..."
                            />
                            {errors.bio && <span className="error-message">{errors.bio}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Habilidades especiales</label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Ej: Primeros auxilios, entrenamiento, administración de medicamentos..."
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Certificaciones</label>
                            <input
                                type="text"
                                name="certifications"
                                value={formData.certifications}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Ej: Certificado de veterinaria, curso de adiestramiento..."
                            />
                        </div>
                    </section>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                            {loading ? 'Enviando...' : (isExistingUser ? 'Actualizar Perfil' : 'Crear Cuenta y Perfil')}
                        </button>
                        <p className="form-note">* Campos requeridos</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
