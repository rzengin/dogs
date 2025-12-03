import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, DollarSign, AlertCircle, CheckCircle, Plus, Dog } from 'lucide-react';
import './Booking.css';

export default function Booking() {
    const { sitterId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Get data passed from Profile page
    const { sitter, selectedService, startDate: initialStartDate, endDate: initialEndDate } = location.state || {};

    const [currentUser, setCurrentUser] = useState(null);
    const [savedPets, setSavedPets] = useState([]);
    const [selectedPetId, setSelectedPetId] = useState('new');
    const [isAddingNewPet, setIsAddingNewPet] = useState(true);

    const [bookingData, setBookingData] = useState({
        startDate: initialStartDate || '',
        endDate: initialEndDate || '',
        petName: '',
        petBreed: '',
        petAge: '',
        petWeight: '',
        specialNeeds: '',
        additionalNotes: ''
    });

    const [errors, setErrors] = useState({});
    const [days, setDays] = useState(1);

    // Load user and saved pets
    useEffect(() => {
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            const user = JSON.parse(userStr);
            setCurrentUser(user);

            // Load saved pets for this user
            const allSavedPets = JSON.parse(localStorage.getItem('savedPets') || '{}');
            const userPets = allSavedPets[user.email] || [];
            setSavedPets(userPets);

            // If user has pets, select the first one by default
            if (userPets.length > 0) {
                setSelectedPetId(userPets[0].id);
                setIsAddingNewPet(false);
                setBookingData(prev => ({
                    ...prev,
                    ...userPets[0]
                }));
            }
        }
    }, []);

    const handlePetSelection = (petId) => {
        setSelectedPetId(petId);

        if (petId === 'new') {
            setIsAddingNewPet(true);
            setBookingData(prev => ({
                ...prev,
                petName: '',
                petBreed: '',
                petAge: '',
                petWeight: '',
                specialNeeds: '',
                additionalNotes: '' // Keep notes empty for new pet
            }));
        } else {
            setIsAddingNewPet(false);
            const pet = savedPets.find(p => p.id === petId);
            if (pet) {
                setBookingData(prev => ({
                    ...prev,
                    ...pet,
                    additionalNotes: prev.additionalNotes // Keep current notes
                }));
            }
        }
    };

    // Calculate days between dates
    useEffect(() => {
        if (bookingData.startDate && bookingData.endDate) {
            const start = new Date(bookingData.startDate);
            const end = new Date(bookingData.endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDays(diffDays > 0 ? diffDays : 1);
        }
    }, [bookingData.startDate, bookingData.endDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!bookingData.startDate) newErrors.startDate = 'Fecha de inicio requerida';
        if (!bookingData.endDate) newErrors.endDate = 'Fecha de fin requerida';
        if (!bookingData.petName.trim()) newErrors.petName = 'Nombre de la mascota requerido';
        if (!bookingData.petBreed.trim()) newErrors.petBreed = 'Raza requerida';
        if (!bookingData.petAge.trim()) newErrors.petAge = 'Edad requerida';

        // Validate dates
        if (bookingData.startDate && bookingData.endDate) {
            const start = new Date(bookingData.startDate);
            const end = new Date(bookingData.endDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (start < today) {
                newErrors.startDate = 'La fecha de inicio no puede ser en el pasado';
            }
            if (end < start) {
                newErrors.endDate = 'La fecha de fin debe ser posterior a la de inicio';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Save new pet if applicable
            if (currentUser && isAddingNewPet) {
                const newPet = {
                    id: Date.now().toString(),
                    petName: bookingData.petName,
                    petBreed: bookingData.petBreed,
                    petAge: bookingData.petAge,
                    petWeight: bookingData.petWeight,
                    specialNeeds: bookingData.specialNeeds
                };

                const allSavedPets = JSON.parse(localStorage.getItem('savedPets') || '{}');
                const userPets = allSavedPets[currentUser.email] || [];

                // Avoid duplicates (simple check by name)
                if (!userPets.some(p => p.petName === newPet.petName)) {
                    userPets.push(newPet);
                    allSavedPets[currentUser.email] = userPets;
                    localStorage.setItem('savedPets', JSON.stringify(allSavedPets));
                }
            }

            // In a real app, this would send to an API
            const bookingInfo = {
                ...bookingData,
                sitter,
                service: selectedService,
                days,
                total: calculateTotal()
            };

            navigate('/booking-confirmation', { state: { booking: bookingInfo } });
        }
    };

    const calculateSubtotal = () => {
        if (!selectedService) return 0;
        return selectedService.price * days;
    };

    const calculateServiceFee = () => {
        return Math.round(calculateSubtotal() * 0.15);
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateServiceFee();
    };

    // If no sitter data, redirect back
    if (!sitter || !selectedService) {
        return (
            <div className="booking-page">
                <div className="container">
                    <div className="error-state">
                        <AlertCircle size={48} />
                        <h2>Información de reserva no encontrada</h2>
                        <p>Por favor selecciona un cuidador primero</p>
                        <a href="/search" className="btn btn-primary">Buscar Cuidadores</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-page">
            <div className="booking-header">
                <div className="container">
                    <h1 className="booking-title fade-in">Reservar Servicio</h1>
                    <p className="booking-subtitle">Completa los detalles de tu reserva</p>
                </div>
            </div>

            <div className="container booking-content">
                <form onSubmit={handleSubmit} className="booking-form-layout">
                    <main className="booking-main">
                        {/* Service Info */}
                        <section className="booking-section card slide-in-left">
                            <h2>Servicio Seleccionado</h2>
                            <div className="service-info">
                                <div className="sitter-summary">
                                    <div className="sitter-avatar-sm">{sitter.image}</div>
                                    <div>
                                        <h3>{sitter.name}</h3>
                                        <p>{sitter.location}</p>
                                    </div>
                                </div>
                                <div className="service-details">
                                    <p className="service-name">{selectedService.name}</p>
                                    <p className="service-price">${selectedService.price} / día</p>
                                </div>
                            </div>
                        </section>

                        {/* Dates */}
                        <section className="booking-section card slide-in-left">
                            <h2>
                                <Calendar size={20} />
                                Fechas
                            </h2>

                            <div className="date-grid">
                                <div className="form-group">
                                    <label className="form-label">Fecha de inicio *</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={bookingData.startDate}
                                        onChange={handleChange}
                                        className={`form-input ${errors.startDate ? 'error' : ''}`}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    {errors.startDate && <span className="error-message">{errors.startDate}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Fecha de fin *</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={bookingData.endDate}
                                        onChange={handleChange}
                                        className={`form-input ${errors.endDate ? 'error' : ''}`}
                                        min={bookingData.startDate || new Date().toISOString().split('T')[0]}
                                    />
                                    {errors.endDate && <span className="error-message">{errors.endDate}</span>}
                                </div>
                            </div>

                            <div className="days-info">
                                <strong>{days}</strong> {days === 1 ? 'día' : 'días'} de servicio
                            </div>
                        </section>

                        {/* Pet Information */}
                        <section className="booking-section card slide-in-left">
                            <h2>Información de tu Mascota</h2>

                            {currentUser && savedPets.length > 0 && (
                                <div className="pet-selection">
                                    <p className="section-subtitle">Selecciona una mascota guardada o agrega una nueva:</p>
                                    <div className="pet-cards">
                                        {savedPets.map(pet => (
                                            <div
                                                key={pet.id}
                                                className={`pet-card-select ${selectedPetId === pet.id ? 'active' : ''}`}
                                                onClick={() => handlePetSelection(pet.id)}
                                            >
                                                <div className="pet-icon">
                                                    <Dog size={24} />
                                                </div>
                                                <div className="pet-info">
                                                    <span className="pet-name">{pet.petName}</span>
                                                    <span className="pet-breed">{pet.petBreed}</span>
                                                </div>
                                                {selectedPetId === pet.id && <div className="check-mark"><CheckCircle size={16} /></div>}
                                            </div>
                                        ))}

                                        <div
                                            className={`pet-card-select new-pet ${selectedPetId === 'new' ? 'active' : ''}`}
                                            onClick={() => handlePetSelection('new')}
                                        >
                                            <div className="pet-icon">
                                                <Plus size={24} />
                                            </div>
                                            <span className="pet-name">Nueva Mascota</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className={`form-grid ${!isAddingNewPet ? 'disabled-inputs' : ''}`}>
                                <div className="form-group">
                                    <label className="form-label">Nombre *</label>
                                    <input
                                        type="text"
                                        name="petName"
                                        value={bookingData.petName}
                                        onChange={handleChange}
                                        className={`form-input ${errors.petName ? 'error' : ''}`}
                                        placeholder="Max, Luna, etc."
                                    />
                                    {errors.petName && <span className="error-message">{errors.petName}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Raza *</label>
                                    <input
                                        type="text"
                                        name="petBreed"
                                        value={bookingData.petBreed}
                                        onChange={handleChange}
                                        className={`form-input ${errors.petBreed ? 'error' : ''}`}
                                        placeholder="Labrador, Golden, etc."
                                    />
                                    {errors.petBreed && <span className="error-message">{errors.petBreed}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Edad *</label>
                                    <input
                                        type="text"
                                        name="petAge"
                                        value={bookingData.petAge}
                                        onChange={handleChange}
                                        className={`form-input ${errors.petAge ? 'error' : ''}`}
                                        placeholder="2 años, 6 meses, etc."
                                    />
                                    {errors.petAge && <span className="error-message">{errors.petAge}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Peso (kg)</label>
                                    <input
                                        type="text"
                                        name="petWeight"
                                        value={bookingData.petWeight}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="20 kg"
                                    />
                                </div>
                            </div>

                            <div className={`form-group ${!isAddingNewPet ? 'disabled-inputs' : ''}`}>
                                <label className="form-label">Necesidades especiales</label>
                                <textarea
                                    name="specialNeeds"
                                    value={bookingData.specialNeeds}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    rows="3"
                                    placeholder="Alergias, medicamentos, comportamiento especial, etc."
                                    readOnly={!isAddingNewPet}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Notas adicionales</label>
                                <textarea
                                    name="additionalNotes"
                                    value={bookingData.additionalNotes}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    rows="3"
                                    placeholder="Cualquier otra información relevante para el cuidador"
                                />
                            </div>
                        </section>
                    </main>

                    {/* Sidebar Summary */}
                    <aside className="booking-sidebar">
                        <div className="booking-summary card">
                            <h3>Resumen de Reserva</h3>

                            <div className="summary-section">
                                <h4>Detalles</h4>
                                <div className="summary-row">
                                    <span>Cuidador:</span>
                                    <span>{sitter.name}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Servicio:</span>
                                    <span>{selectedService.name}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Duración:</span>
                                    <span>{days} {days === 1 ? 'día' : 'días'}</span>
                                </div>
                            </div>

                            <div className="summary-section">
                                <h4>
                                    <DollarSign size={16} />
                                    Desglose de Precio
                                </h4>
                                <div className="summary-row">
                                    <span>${selectedService.price} x {days} {days === 1 ? 'día' : 'días'}</span>
                                    <span>${calculateSubtotal()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tarifa de servicio</span>
                                    <span>${calculateServiceFee()}</span>
                                </div>
                                <div className="summary-divider"></div>
                                <div className="summary-row total">
                                    <strong>Total (UYU)</strong>
                                    <strong>${calculateTotal()}</strong>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-accent btn-block">
                                <CheckCircle size={20} />
                                Confirmar Reserva
                            </button>

                            <p className="booking-note">
                                No se te cobrará hasta que el cuidador acepte tu solicitud
                            </p>
                        </div>
                    </aside>
                </form>
            </div>
        </div>
    );
}
