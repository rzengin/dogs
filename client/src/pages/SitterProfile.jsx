import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Shield, MessageCircle, Calendar, DollarSign, Award, Clock } from 'lucide-react';
import { useState } from 'react';
import './SitterProfile.css';

// Mock data (would come from Search page or API)
const mockSitter = {
    id: 1,
    name: 'María González',
    location: 'Pocitos, Montevideo',
    rating: 4.9,
    reviews: 127,
    image: '👩',
    services: [
        { name: 'Paseo de Perros', price: 400 },
        { name: 'Cuidado en Casa', price: 500 },
        { name: 'Guardería Canina', price: 600 }
    ],
    badge: 'Super Cuidadora',
    verified: true,
    responseTime: '2 horas',
    experience: '5 años',
    about: 'Amante de los animales desde siempre. Tengo experiencia cuidando perros de todos los tamaños y temperamentos. Mi casa tiene un patio grande y vivo cerca de varios parques. ¡Tu mascota estará en excelentes manos!',
    photos: ['🐕', '🏡', '🌳', '🎾'],
    skills: ['Primeros Auxilios', 'Entrenamiento Básico', 'Administración de Medicamentos'],
    availability: ['Lun-Vie', 'Fin de Semana']
};

const mockReviews = [
    {
        id: 1,
        author: 'Juan Pérez',
        rating: 5,
        date: 'Hace 1 semana',
        text: '¡Excelente cuidadora! Mi perro Max estuvo súper feliz. María es muy atenta y me mandaba fotos todos los días.',
        avatar: '👨'
    },
    {
        id: 2,
        author: 'Sofía López',
        rating: 5,
        date: 'Hace 2 semanas',
        text: 'Muy recomendable. Luna volvió cansada y feliz después de cada paseo. Definitivamente volveré a contratar.',
        avatar: '👩'
    },
    {
        id: 3,
        author: 'Ricardo Méndez',
        rating: 4,
        date: 'Hace 1 mes',
        text: 'Buen servicio. Mi gato estuvo bien cuidado mientras estaba de viaje. Solo mejoraría la comunicación.',
        avatar: '🧑'
    }
];

export default function SitterProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState(mockSitter.services[0]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const handleBooking = () => {
        navigate(`/booking/${id}`, {
            state: {
                sitter: mockSitter,
                selectedService,
                startDate,
                endDate
            }
        });
    };

    return (
        <div className="profile-page">
            <div className="profile-hero">
                <div className="container">
                    <div className="profile-header">
                        <div className="profile-avatar-large">{mockSitter.image}</div>
                        <div className="profile-header-info">
                            <div className="profile-name-section">
                                <h1 className="profile-name">{mockSitter.name}</h1>
                                {mockSitter.badge && (
                                    <span className="profile-badge">{mockSitter.badge}</span>
                                )}
                            </div>
                            <div className="profile-meta">
                                <div className="meta-item">
                                    <MapPin size={16} />
                                    {mockSitter.location}
                                </div>
                                <div className="meta-item">
                                    <Star size={16} fill="currentColor" />
                                    {mockSitter.rating} ({mockSitter.reviews} reseñas)
                                </div>
                                {mockSitter.verified && (
                                    <div className="meta-item verified">
                                        <Shield size={16} />
                                        Verificado
                                    </div>
                                )}
                            </div>
                            <div className="profile-stats">
                                <div className="stat">
                                    <Clock size={16} />
                                    <span>Responde en {mockSitter.responseTime}</span>
                                </div>
                                <div className="stat">
                                    <Award size={16} />
                                    <span>{mockSitter.experience} de experiencia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container profile-content">
                <main className="profile-main">
                    <section className="profile-section">
                        <h2 className="section-title">Sobre mí</h2>
                        <p className="about-text">{mockSitter.about}</p>
                    </section>

                    <section className="profile-section">
                        <h2 className="section-title">Servicios y Tarifas</h2>
                        <div className="services-list">
                            {mockSitter.services.map((service, idx) => (
                                <div key={idx} className="service-item">
                                    <div className="service-details">
                                        <h3>{service.name}</h3>
                                    </div>
                                    <div className="service-pricing">
                                        <span className="service-price">${service.price}</span>
                                        <span className="service-unit">/ día</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="profile-section">
                        <h2 className="section-title">Habilidades</h2>
                        <div className="skills-list">
                            {mockSitter.skills.map((skill, idx) => (
                                <span key={idx} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </section>

                    <section className="profile-section">
                        <h2 className="section-title">Fotos</h2>
                        <div className="photos-grid">
                            {mockSitter.photos.map((photo, idx) => (
                                <div key={idx} className="photo-item">{photo}</div>
                            ))}
                        </div>
                    </section>

                    <section className="profile-section">
                        <h2 className="section-title">Reseñas ({mockSitter.reviews})</h2>
                        <div className="reviews-list">
                            {mockReviews.map(review => (
                                <div key={review.id} className="review-item">
                                    <div className="review-header">
                                        <div className="review-avatar">{review.avatar}</div>
                                        <div className="review-meta">
                                            <h4 className="review-author">{review.author}</h4>
                                            <div className="review-rating">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} size={12} fill="currentColor" />
                                                ))}
                                            </div>
                                            <span className="review-date">{review.date}</span>
                                        </div>
                                    </div>
                                    <p className="review-text">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="profile-sidebar">
                    <div className="booking-card">
                        <h3 className="booking-title">Reservar Servicio</h3>

                        <div className="booking-form">
                            <div className="form-group">
                                <label>Servicio</label>
                                <select
                                    className="form-select"
                                    value={selectedService.name}
                                    onChange={(e) => setSelectedService(mockSitter.services.find(s => s.name === e.target.value))}
                                >
                                    {mockSitter.services.map((service, idx) => (
                                        <option key={idx} value={service.name}>{service.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Fecha de inicio</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="form-group">
                                <label>Fecha de fin</label>
                                <input
                                    type="date"
                                    className="form-input"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate || new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className="price-summary">
                                <div className="price-row">
                                    <span>Precio por día</span>
                                    <span>${selectedService.price}</span>
                                </div>
                                <div className="price-row total">
                                    <span>Total estimado</span>
                                    <span>${selectedService.price}</span>
                                </div>
                            </div>

                            <button
                                className="btn btn-accent booking-btn"
                                onClick={handleBooking}
                            >
                                <Calendar size={20} />
                                Solicitar Reserva
                            </button>

                            <button className="btn btn-outline">
                                <MessageCircle size={20} />
                                Enviar Mensaje
                            </button>
                        </div>
                    </div>

                    <div className="availability-card">
                        <h4>Disponibilidad</h4>
                        <div className="availability-tags">
                            {mockSitter.availability.map((slot, idx) => (
                                <span key={idx} className="availability-tag">{slot}</span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
