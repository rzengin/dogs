import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, PawPrint, Edit2, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Calendar from '../components/Calendar';
import api from '../utils/api';
import './UserProfile.css';

export default function UserProfile() {
    const { user: authUser, isAuthenticated } = useAuth();
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        fetchUserData();
    }, [isAuthenticated, navigate]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const data = await api.users.getMe();
            setUserData(data);
            
            // Fetch user's bookings
            const bookingsData = await api.bookings.getAll();
            setBookings(bookingsData);
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError('Error al cargar el perfil');
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePet = async (petId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
            return;
        }

        try {
            await api.pets.delete(petId);
            // Refresh user data
            fetchUserData();
        } catch (err) {
            console.error('Error deleting pet:', err);
            alert('Error al eliminar mascota');
        }
    };

    if (loading) {
        return (
            <div className="user-profile-page">
                <div className="container">
                    <div className="loading-spinner">Cargando...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-profile-page">
                <div className="container">
                    <div className="error-message">{error}</div>
                </div>
            </div>
        );
    }

    if (!userData) {
        return null;
    }

    const getRoleBadge = (role) => {
        const badges = {
            USER: { text: 'Usuario', class: 'role-badge-user' },
            SITTER: { text: 'Cuidador', class: 'role-badge-sitter' },
            ADMIN: { text: 'Administrador', class: 'role-badge-admin' },
        };
        return badges[role] || badges.USER;
    };

    const roleBadge = getRoleBadge(userData.role);

    return (
        <div className="user-profile-page">
            <div className="profile-hero">
                <div className="container">
                    <h1 className="profile-title">Mi Perfil</h1>
                    <p className="profile-subtitle">Administra tu información y mascotas</p>
                </div>
            </div>

            <div className="container profile-content">
                <div className="profile-grid">
                    {/* User Information Card */}
                    <div className="profile-card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <User size={24} />
                                Información Personal
                            </h2>
                            <button className="btn-icon" title="Editar perfil">
                                <Edit2 size={18} />
                            </button>
                        </div>
                        <div className="card-content">
                            <div className="info-grid">
                                <div className="info-item">
                                    <div className="info-label">Nombre Completo</div>
                                    <div className="info-value">{userData.name}</div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">
                                        <Mail size={16} />
                                        Email
                                    </div>
                                    <div className="info-value">{userData.email}</div>
                                </div>
                                {userData.phone && (
                                    <div className="info-item">
                                        <div className="info-label">
                                            <Phone size={16} />
                                            Teléfono
                                        </div>
                                        <div className="info-value">{userData.phone}</div>
                                    </div>
                                )}
                                {userData.city && (
                                    <div className="info-item">
                                        <div className="info-label">
                                            <MapPin size={16} />
                                            Ciudad
                                        </div>
                                        <div className="info-value">{userData.city}</div>
                                    </div>
                                )}
                                <div className="info-item">
                                    <div className="info-label">Rol</div>
                                    <div className="info-value">
                                        <span className={`role-badge ${roleBadge.class}`}>
                                            {roleBadge.text}
                                        </span>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="info-label">Miembro desde</div>
                                    <div className="info-value">
                                        {new Date(userData.createdAt).toLocaleDateString('es-UY', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bookings Calendar Card */}
                    <div className="profile-card calendar-card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <CalendarIcon size={24} />
                                Mis Reservas
                            </h2>
                        </div>
                        <div className="card-content">
                            <Calendar 
                                bookings={bookings}
                                mode="view"
                            />
                            
                            {bookings.length > 0 && (
                                <div className="bookings-summary">
                                    <h4>Próximas Reservas</h4>
                                    {bookings
                                        .filter(b => new Date(b.startDate) >= new Date())
                                        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                                        .slice(0, 3)
                                        .map(booking => (
                                            <div key={booking.id} className="booking-summary-item">
                                                <div className="booking-date">
                                                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                                </div>
                                                <div className="booking-info">
                                                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                                        {booking.status}
                                                    </span>
                                                    {booking.serviceName && <span>{booking.serviceName}</span>}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pets Card */}
                    <div className="profile-card pets-card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <PawPrint size={24} />
                                Mis Mascotas
                                <span className="pets-count">{userData.pets?.length || 0}</span>
                            </h2>
                            <Link to="/add-pet" className="btn btn-primary btn-sm">
                                <Plus size={18} />
                                Agregar Mascota
                            </Link>
                        </div>
                        <div className="card-content">
                            {userData.pets && userData.pets.length > 0 ? (
                                <div className="pets-list">
                                    {userData.pets.map((pet) => (
                                        <div key={pet.id} className="pet-card">
                                            <div className="pet-avatar">🐕</div>
                                            <div className="pet-info">
                                                <h3 className="pet-name">{pet.petName}</h3>
                                                <div className="pet-details">
                                                    <span className="pet-detail">
                                                        <strong>Raza:</strong> {pet.petBreed}
                                                    </span>
                                                    <span className="pet-detail">
                                                        <strong>Edad:</strong> {pet.petAge}
                                                    </span>
                                                    {pet.petWeight && (
                                                        <span className="pet-detail">
                                                            <strong>Peso:</strong> {pet.petWeight}
                                                        </span>
                                                    )}
                                                    {pet.specialNeeds && (
                                                        <span className="pet-detail special-needs">
                                                            <strong>Necesidades especiales:</strong> {pet.specialNeeds}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="pet-actions">
                                                <button
                                                    className="btn-icon"
                                                    title="Editar mascota"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className="btn-icon btn-icon-danger"
                                                    title="Eliminar mascota"
                                                    onClick={() => handleDeletePet(pet.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">🐾</div>
                                    <h3>No tienes mascotas registradas</h3>
                                    <p>Agrega una mascota para empezar a reservar servicios</p>
                                    <Link to="/add-pet" className="btn btn-accent">
                                        <Plus size={20} />
                                        Agregar tu primera mascota
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
