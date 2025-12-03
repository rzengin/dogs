import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, DollarSign, MessageCircle, Download } from 'lucide-react';
import './BookingConfirmation.css';

export default function BookingConfirmation() {
    const location = useLocation();
    const { booking } = location.state || {};

    // Generate a mock confirmation number
    const confirmationNumber = `RIN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    if (!booking) {
        return (
            <div className="confirmation-page">
                <div className="container">
                    <div className="error-state">
                        <h2>No se encontró información de reserva</h2>
                        <Link to="/search" className="btn btn-primary">Buscar Cuidadores</Link>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-UY', options);
    };

    return (
        <div className="confirmation-page">
            <div className="confirmation-hero">
                <div className="container">
                    <div className="success-animation">
                        <div className="checkmark-circle">
                            <CheckCircle size={80} />
                        </div>
                    </div>
                    <h1 className="confirmation-title fade-in">¡Reserva Solicitada!</h1>
                    <p className="confirmation-subtitle">
                        Tu solicitud ha sido enviada a {booking.sitter.name}
                    </p>
                    <div className="confirmation-number">
                        <span>Número de confirmación:</span>
                        <strong>{confirmationNumber}</strong>
                    </div>
                </div>
            </div>

            <div className="container confirmation-content">
                <div className="confirmation-layout">
                    {/* Main Details */}
                    <main className="confirmation-main">
                        <section className="confirmation-section card slide-in-left">
                            <h2>Detalles de la Reserva</h2>

                            <div className="detail-row">
                                <div className="detail-icon">
                                    <Calendar size={20} />
                                </div>
                                <div className="detail-content">
                                    <h3>Fechas</h3>
                                    <p>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p>
                                    <p className="detail-meta">{booking.days} {booking.days === 1 ? 'día' : 'días'} de servicio</p>
                                </div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-icon">
                                    <MapPin size={20} />
                                </div>
                                <div className="detail-content">
                                    <h3>Cuidador</h3>
                                    <p>{booking.sitter.name}</p>
                                    <p className="detail-meta">{booking.sitter.location}</p>
                                </div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-icon">🐾</div>
                                <div className="detail-content">
                                    <h3>Servicio</h3>
                                    <p>{booking.service.name}</p>
                                    <p className="detail-meta">${booking.service.price} por día</p>
                                </div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-icon">🐕</div>
                                <div className="detail-content">
                                    <h3>Mascota</h3>
                                    <p>{booking.petName} - {booking.petBreed}</p>
                                    <p className="detail-meta">{booking.petAge}</p>
                                </div>
                            </div>

                            {booking.specialNeeds && (
                                <div className="detail-row">
                                    <div className="detail-icon">⚕️</div>
                                    <div className="detail-content">
                                        <h3>Necesidades Especiales</h3>
                                        <p>{booking.specialNeeds}</p>
                                    </div>
                                </div>
                            )}
                        </section>

                        <section className="confirmation-section card slide-in-left">
                            <h2>
                                <DollarSign size={20} />
                                Resumen de Pago
                            </h2>

                            <div className="payment-summary">
                                <div className="payment-row">
                                    <span>Servicio ({booking.days} {booking.days === 1 ? 'día' : 'días'})</span>
                                    <span>${booking.service.price * booking.days}</span>
                                </div>
                                <div className="payment-row">
                                    <span>Tarifa de servicio</span>
                                    <span>${booking.total - (booking.service.price * booking.days)}</span>
                                </div>
                                <div className="payment-divider"></div>
                                <div className="payment-row total">
                                    <strong>Total (UYU)</strong>
                                    <strong>${booking.total}</strong>
                                </div>
                            </div>

                            <div className="payment-note">
                                <p>💳 El pago se procesará una vez que el cuidador acepte la reserva</p>
                            </div>
                        </section>
                    </main>

                    {/* Sidebar */}
                    <aside className="confirmation-sidebar">
                        <div className="next-steps card">
                            <h3>Próximos Pasos</h3>

                            <div className="step-list">
                                <div className="step-item">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h4>Espera la respuesta</h4>
                                        <p>{booking.sitter.name} tiene 24 horas para aceptar tu solicitud</p>
                                    </div>
                                </div>

                                <div className="step-item">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h4>Te notificaremos</h4>
                                        <p>Recibirás un email cuando tu reserva sea confirmada</p>
                                    </div>
                                </div>

                                <div className="step-item">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h4>Coordina los detalles</h4>
                                        <p>Chatea con el cuidador para acordar la entrega de tu mascota</p>
                                    </div>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button className="btn btn-outline btn-block">
                                    <MessageCircle size={20} />
                                    Mensaje al Cuidador
                                </button>
                                <button className="btn btn-outline btn-block">
                                    <Download size={20} />
                                    Descargar Confirmación
                                </button>
                            </div>
                        </div>

                        <div className="help-card card">
                            <h4>¿Necesitas ayuda?</h4>
                            <p>Nuestro equipo está disponible 24/7 para asistirte</p>
                            <a href="mailto:soporte@rintintin.com" className="help-link">
                                soporte@rintintin.com
                            </a>
                        </div>
                    </aside>
                </div>

                {/* Bottom Actions */}
                <div className="bottom-actions">
                    <Link to="/" className="btn btn-outline">
                        Volver al Inicio
                    </Link>
                    <Link to="/search" className="btn btn-primary">
                        Buscar más Cuidadores
                    </Link>
                </div>
            </div>
        </div>
    );
}
