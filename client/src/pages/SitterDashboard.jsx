import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Users, Dog, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Calendar from '../components/Calendar';
import api from '../utils/api';
import './SitterDashboard.css';

export default function SitterDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('agenda');
    const [bookings, setBookings] = useState([]);
    const [clients, setClients] = useState([]);
    const [pets, setPets] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availabilityModal, setAvailabilityModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch bookings
                const bookingsData = await api.bookings.getSitterBookings();
                setBookings(bookingsData);

                // Fetch clients
                const clientsData = await api.bookings.getSitterClients();
                setClients(clientsData);

                // Fetch pets
                const petsData = await api.bookings.getSitterPets();
                setPets(petsData);

            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    if (loading) return <div className="loading-spinner">Cargando...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    const renderServices = () => {
        const upcoming = bookings.filter(b => new Date(b.startDate) >= new Date());
        const past = bookings.filter(b => new Date(b.startDate) < new Date());

        return (
            <div className="dashboard-section fade-in">
                <h3>Próximos Servicios</h3>
                {upcoming.length === 0 ? (
                    <p className="empty-state">No tienes servicios próximos.</p>
                ) : (
                    <div className="bookings-list">
                        {upcoming.map(booking => (
                            <div key={booking.id} className="booking-card upcoming">
                                <div className="booking-header">
                                    <span className="booking-date">
                                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                    </span>
                                    <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span>
                                </div>
                                <div className="booking-details">
                                    <p><strong>Cliente:</strong> {booking.user.name}</p>
                                    <p><strong>Mascota:</strong> {booking.petId ? 'Mascota ID ' + booking.petId : 'No especificada'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <h3 className="mt-4">Historial de Servicios</h3>
                {past.length === 0 ? (
                    <p className="empty-state">No tienes servicios pasados.</p>
                ) : (
                    <div className="bookings-list">
                        {past.map(booking => (
                            <div key={booking.id} className="booking-card past">
                                <div className="booking-header">
                                    <span className="booking-date">
                                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                    </span>
                                    <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span>
                                </div>
                                <div className="booking-details">
                                    <p><strong>Cliente:</strong> {booking.user.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setAvailabilityModal(true);
    };

    const handleAvailabilityUpdate = async (isAvailable, slots) => {
        try {
            await api.sitters.updateAvailability({
                date: selectedDate.toISOString(),
                isAvailable,
                slots
            });
            setAvailabilityModal(false);
            // Refresh availability
            // You could fetch availability here if needed
        } catch (error) {
            console.error('Error updating availability:', error);
        }
    };

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            await api.bookings.updateStatus(bookingId, newStatus);
            // Refresh bookings
            const bookingsData = await api.bookings.getSitterBookings();
            setBookings(bookingsData);
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    const renderAgenda = () => {
        return (
            <div className="dashboard-section fade-in">
                <div className="section-header-with-action">
                    <h3>Mi Agenda</h3>
                    <p className="section-subtitle">Haz clic en un día para gestionar tu disponibilidad</p>
                </div>
                
                <Calendar 
                    bookings={bookings}
                    availability={availability}
                    onDateClick={handleDateClick}
                    mode="edit"
                />

                {availabilityModal && selectedDate && (
                    <div className="modal-overlay" onClick={() => setAvailabilityModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Disponibilidad para {selectedDate.toLocaleDateString()}</h3>
                            <div className="availability-options">
                                <button 
                                    className="btn btn-success"
                                    onClick={() => handleAvailabilityUpdate(true, ['morning', 'afternoon', 'evening', 'overnight'])}
                                >
                                    Disponible todo el día
                                </button>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => handleAvailabilityUpdate(false, [])}
                                >
                                    No disponible
                                </button>
                            </div>
                            <button className="btn btn-outline" onClick={() => setAvailabilityModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

                <div className="upcoming-bookings">
                    <h4>Próximas Reservas</h4>
                    {bookings.filter(b => new Date(b.startDate) >= new Date()).length === 0 ? (
                        <p className="empty-state">No tienes reservas próximas</p>
                    ) : (
                        <div className="bookings-list">
                            {bookings
                                .filter(b => new Date(b.startDate) >= new Date())
                                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                                .map(booking => (
                                    <div key={booking.id} className="booking-card">
                                        <div className="booking-header">
                                            <span className="booking-date">
                                                {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                            </span>
                                            <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="booking-details">
                                            <p><strong>Cliente:</strong> {booking.user?.name}</p>
                                            <p><strong>Servicio:</strong> {booking.serviceName || 'No especificado'}</p>
                                            {booking.price && <p><strong>Precio:</strong> ${booking.price}</p>}
                                            {booking.notes && <p><strong>Notas:</strong> {booking.notes}</p>}
                                        </div>
                                        {booking.status === 'PENDING' && (
                                            <div className="booking-actions">
                                                <button 
                                                    className="btn btn-sm btn-success"
                                                    onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                                                >
                                                    Confirmar
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                                                >
                                                    Rechazar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderClients = () => {
        return (
            <div className="dashboard-section fade-in">
                <h3>Mis Clientes</h3>
                <div className="clients-grid">
                    {clients.map(client => (
                        <div key={client.id} className="client-card">
                            <div className="client-avatar">{client.name.charAt(0)}</div>
                            <div className="client-info">
                                <h4>{client.name}</h4>
                                <p>{client.email}</p>
                                <p>{client.phone || 'Sin teléfono'}</p>
                                <p>{client.city || 'Sin ciudad'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderPets = () => {
        return (
            <div className="dashboard-section fade-in">
                <h3>Mascotas de Clientes</h3>
                <div className="pets-grid">
                    {pets.map(pet => (
                        <div key={pet.id} className="pet-card">
                            <div className="pet-icon"><Dog size={24} /></div>
                            <div className="pet-info">
                                <h4>{pet.petName}</h4>
                                <p className="pet-breed">{pet.petBreed}</p>
                                <p>{pet.petAge} • {pet.petWeight || 'Peso N/A'}</p>
                                {pet.specialNeeds && <p className="special-needs">⚠️ {pet.specialNeeds}</p>}
                                <p className="owner-name">Dueño: {pet.owner.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="sitter-dashboard-page">
            <div className="dashboard-header">
                <div className="container">
                    <h1>Panel de Cuidador</h1>
                    <p>Gestiona tus servicios y clientes</p>
                </div>
            </div>

            <div className="container dashboard-content">
                <aside className="dashboard-sidebar">
                    <nav className="dashboard-nav">
                        <button
                            className={`nav-item ${activeTab === 'services' ? 'active' : ''}`}
                            onClick={() => setActiveTab('services')}
                        >
                            <Clock size={20} />
                            Servicios
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'agenda' ? 'active' : ''}`}
                            onClick={() => setActiveTab('agenda')}
                        >
                            <CalendarIcon size={20} />
                            Agenda
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'clients' ? 'active' : ''}`}
                            onClick={() => setActiveTab('clients')}
                        >
                            <Users size={20} />
                            Clientes
                        </button>
                        <button
                            className={`nav-item ${activeTab === 'pets' ? 'active' : ''}`}
                            onClick={() => setActiveTab('pets')}
                        >
                            <Dog size={20} />
                            Mascotas
                        </button>
                    </nav>
                </aside>

                <main className="dashboard-main">
                    {activeTab === 'services' && renderServices()}
                    {activeTab === 'agenda' && renderAgenda()}
                    {activeTab === 'clients' && renderClients()}
                    {activeTab === 'pets' && renderPets()}
                </main>
            </div>
        </div>
    );
}
