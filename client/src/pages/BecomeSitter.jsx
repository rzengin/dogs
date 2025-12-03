import { useState } from 'react';
import { CheckCircle, Upload, MapPin, Briefcase, Home, Calendar, User } from 'lucide-react';
import './BecomeSitter.css';

export default function BecomeSitter() {
    const [formData, setFormData] = useState({
        // Personal Info
        firstName: '',
        lastName: '',
        email: '',
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

        // Availability
        availability: [],

        // About
        bio: '',
        skills: '',
        certifications: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

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

        if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
        if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
        if (!formData.email.trim()) newErrors.email = 'El email es requerido';
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';
        if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
        if (!formData.experience) newErrors.experience = 'La experiencia es requerida';
        if (formData.services.length === 0) newErrors.services = 'Selecciona al menos un servicio';
        if (formData.petTypes.length === 0) newErrors.petTypes = 'Selecciona al menos un tipo de mascota';
        if (!formData.propertyType) newErrors.propertyType = 'El tipo de propiedad es requerido';
        if (!formData.bio.trim()) newErrors.bio = 'La descripción es requerida';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted:', formData);
            setSubmitted(true);
            // In a real app, this would send data to an API
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
                            <a href="/" className="btn btn-primary">Volver al Inicio</a>
                            <a href="/search" className="btn btn-outline">Buscar Cuidadores</a>
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

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Nombre *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
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
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    placeholder="tu@email.com"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

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
                        <button type="submit" className="btn btn-primary btn-lg">
                            Enviar Solicitud
                        </button>
                        <p className="form-note">* Campos requeridos</p>
                    </div>
                </form>
            </div>
        </div>
    );
}
