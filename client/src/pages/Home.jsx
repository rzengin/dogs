import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import { Dog, Home as HomeIcon, Calendar, Heart } from 'lucide-react';
import './Home.css';

export default function Home() {
    const services = [
        {
            icon: '🐕',
            title: 'Paseo de Perros',
            description: 'Paseadores confiables para ejercitar a tu perro mientras trabajas.',
            color: 'hsl(200, 70%, 50%)'
        },
        {
            icon: '🏠',
            title: 'Cuidado en Casa',
            description: 'Cuidadores que visitan tu hogar para alimentar y mimar a tu mascota.',
            color: 'hsl(150, 60%, 45%)'
        },
        {
            icon: '🏨',
            title: 'Hotel para Mascotas',
            description: 'Estadía en casas de cuidadores verificados para tus vacaciones.',
            color: 'hsl(30, 90%, 55%)'
        },
        {
            icon: '🎾',
            title: 'Guardería Canina',
            description: 'Diversión y socialización diurna en un ambiente seguro.',
            color: 'hsl(280, 60%, 55%)'
        }
    ];

    return (
        <div className="home-page">
            <Hero />

            <section className="services-section">
                <div className="container">
                    <div className="section-header fade-in">
                        <h2 className="section-title">Nuestros Servicios</h2>
                        <p className="section-subtitle">
                            Encuentra el cuidado perfecto para cada necesidad de tu mascota
                        </p>
                    </div>

                    <div className="services-grid">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                icon={service.icon}
                                title={service.title}
                                description={service.description}
                                color={service.color}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <div className="section-header fade-in">
                        <h2 className="section-title">¿Por qué elegir Rintintin?</h2>
                        <p className="section-subtitle">
                            Seguridad, confianza y calidad para tu mejor amigo
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card slide-in-left">
                            <div className="feature-icon">✅</div>
                            <h3>Cuidadores Verificados</h3>
                            <p>Todos nuestros cuidadores pasan por un riguroso proceso de verificación de antecedentes.</p>
                        </div>

                        <div className="feature-card slide-in-left">
                            <div className="feature-icon">🛡️</div>
                            <h3>Seguro de Garantía</h3>
                            <p>Protección incluida en todas las reservas para tu tranquilidad.</p>
                        </div>

                        <div className="feature-card slide-in-left">
                            <div className="feature-icon">💬</div>
                            <h3>Comunicación 24/7</h3>
                            <p>Mensajería directa con cuidadores y soporte al cliente siempre disponible.</p>
                        </div>

                        <div className="feature-card slide-in-left">
                            <div className="feature-icon">⭐</div>
                            <h3>Reseñas Reales</h3>
                            <p>Lee opiniones auténticas de otros dueños de mascotas en Uruguay.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <div className="cta-card fade-in">
                        <h2 className="cta-title">¿Listo para encontrar el cuidador perfecto?</h2>
                        <p className="cta-description">
                            Únete a miles de dueños felices en Uruguay que confían en nosotros
                        </p>
                        <div className="cta-buttons">
                            <a href="/search" className="btn btn-primary">
                                Buscar Ahora
                            </a>
                            <a href="/become-sitter" className="btn btn-outline">
                                Ser Cuidador
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
