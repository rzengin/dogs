import { Link } from 'react-router-dom';
import { Dog, Home as HomeIcon, Hotel, Gamepad2, Clock, Shield, Heart, CheckCircle, ArrowRight, Calendar, DollarSign } from 'lucide-react';
import './Services.css';

export default function Services() {
    const services = [
        {
            id: 'paseo',
            icon: Dog,
            emoji: '🐕',
            title: 'Paseo de Perros',
            description: 'Paseadores confiables para ejercitar a tu perro mientras trabajas.',
            longDescription: 'Nuestros paseadores profesionales llevarán a tu perro a dar paseos energizantes y seguros. Perfectos para dueños ocupados que quieren asegurar que sus mascotas reciban el ejercicio diario que necesitan.',
            features: [
                'Paseos de 30, 45 o 60 minutos',
                'Actualizaciones con fotos durante el paseo',
                'Paseadores verificados y con experiencia',
                'Rutas seguras en parques y zonas verdes',
                'Seguimiento GPS en tiempo real'
            ],
            priceRange: '$300 - $500',
            color: 'hsl(200, 70%, 50%)'
        },
        {
            id: 'casa',
            icon: HomeIcon,
            emoji: '🏠',
            title: 'Cuidado en Casa',
            description: 'Cuidadores que visitan tu hogar para alimentar y mimar a tu mascota.',
            longDescription: 'Tu mascota se queda cómoda en su propio hogar mientras un cuidador verificado la visita para alimentarla, jugar con ella y darle todo el amor que necesita.',
            features: [
                'Visitas de 30 o 60 minutos',
                'Alimentación según tus instrucciones',
                'Juego y tiempo de calidad',
                'Administración de medicamentos',
                'Riego de plantas y recolección de correo'
            ],
            priceRange: '$400 - $600',
            color: 'hsl(150, 60%, 45%)'
        },
        {
            id: 'hotel',
            icon: Hotel,
            emoji: '🏨',
            title: 'Hotel para Mascotas',
            description: 'Estadía en casas de cuidadores verificados para tus vacaciones.',
            longDescription: 'Cuando te vas de viaje, tu mascota se queda en la casa de un cuidador amoroso donde recibirá atención personalizada las 24 horas del día.',
            features: [
                'Alojamiento en hogares verificados',
                'Atención personalizada 24/7',
                'Actualizaciones diarias con fotos y videos',
                'Sin jaulas, ambiente hogareño',
                'Máximo 2-3 mascotas por cuidador'
            ],
            priceRange: '$600 - $1000',
            color: 'hsl(30, 90%, 55%)'
        },
        {
            id: 'guarderia',
            icon: Gamepad2,
            emoji: '🎾',
            title: 'Guardería Canina',
            description: 'Diversión y socialización diurna en un ambiente seguro.',
            longDescription: 'Un día completo de diversión, juegos y socialización con otros perros en un ambiente supervisado y seguro.',
            features: [
                'Supervisión constante por profesionales',
                'Grupos pequeños según tamaño y temperamento',
                'Actividades y juegos durante todo el día',
                'Descansos y siestas programadas',
                'Fotos y videos del día'
            ],
            priceRange: '$500 - $800',
            color: 'hsl(280, 60%, 55%)'
        }
    ];

    const howItWorks = [
        {
            step: '1',
            title: 'Busca y Compara',
            description: 'Explora perfiles de cuidadores verificados en tu zona. Lee reseñas y compara servicios.',
            icon: '🔍'
        },
        {
            step: '2',
            title: 'Contacta y Conoce',
            description: 'Envía mensajes a los cuidadores que te gusten. Programa una reunión previa sin compromiso.',
            icon: '💬'
        },
        {
            step: '3',
            title: 'Reserva con Confianza',
            description: 'Elige las fechas, confirma el servicio y paga de forma segura a través de la plataforma.',
            icon: '✅'
        },
        {
            step: '4',
            title: 'Relájate y Disfruta',
            description: 'Recibe actualizaciones regulares mientras tu mascota disfruta del mejor cuidado.',
            icon: '😊'
        }
    ];

    const benefits = [
        {
            icon: Shield,
            title: 'Cuidadores Verificados',
            description: 'Todos pasan por verificación de antecedentes y entrevistas'
        },
        {
            icon: Heart,
            title: 'Atención Personalizada',
            description: 'Cada mascota recibe cuidado individualizado según sus necesidades'
        },
        {
            icon: Clock,
            title: 'Disponibilidad Flexible',
            description: 'Encuentra cuidadores disponibles cuando los necesites'
        },
        {
            icon: DollarSign,
            title: 'Precios Transparentes',
            description: 'Sin costos ocultos, paga solo por el servicio que necesitas'
        }
    ];

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="container">
                    <div className="services-hero-content">
                        <h1 className="services-hero-title">
                            Servicios de Cuidado para tu Mascota
                        </h1>
                        <p className="services-hero-subtitle">
                            Desde paseos diarios hasta estadías prolongadas, encuentra el cuidado perfecto para cada necesidad de tu mejor amigo
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="services-detailed-section">
                <div className="container">
                    <div className="services-detailed-grid">
                        {services.map((service, index) => (
                            <div key={service.id} className="service-detailed-card" style={{ '--service-color': service.color }}>
                                <div className="service-detailed-header">
                                    <div className="service-detailed-icon">
                                        <span className="service-emoji">{service.emoji}</span>
                                    </div>
                                    <div className="service-detailed-title-section">
                                        <h3 className="service-detailed-title">{service.title}</h3>
                                        <p className="service-price-range">{service.priceRange} / día</p>
                                    </div>
                                </div>
                                <p className="service-detailed-description">{service.longDescription}</p>
                                <div className="service-features">
                                    <h4 className="features-title">Incluye:</h4>
                                    <ul className="features-list">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="feature-item">
                                                <CheckCircle size={16} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Link to="/search" className="service-cta-btn">
                                    Buscar Cuidadores
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">¿Cómo Funciona?</h2>
                        <p className="section-subtitle">
                            Encontrar el cuidador perfecto es fácil y rápido
                        </p>
                    </div>
                    <div className="how-it-works-grid">
                        {howItWorks.map((step, index) => (
                            <div key={index} className="how-it-works-card">
                                <div className="step-number">{step.step}</div>
                                <div className="step-icon">{step.icon}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">¿Por qué elegir Rintintin?</h2>
                        <p className="section-subtitle">
                            Seguridad, confianza y calidad en cada servicio
                        </p>
                    </div>
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="benefit-card">
                                <div className="benefit-icon">
                                    <benefit.icon size={32} />
                                </div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                                <p className="benefit-description">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="services-cta-section">
                <div className="container">
                    <div className="services-cta-card">
                        <h2 className="cta-title">¿Listo para encontrar el cuidador perfecto?</h2>
                        <p className="cta-description">
                            Miles de dueños en Uruguay ya confían en nosotros para el cuidado de sus mascotas
                        </p>
                        <div className="cta-buttons">
                            <Link to="/search" className="btn btn-primary btn-large">
                                <Calendar size={20} />
                                Buscar Cuidadores
                            </Link>
                            <Link to="/become-sitter" className="btn btn-outline btn-large">
                                Ser Cuidador
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
