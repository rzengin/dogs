import { useState } from 'react';
import StatsCard from '../components/StatsCard';
import DataTable from '../components/DataTable';
import './Admin.css';

function Admin() {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data
    const mockUsers = [
        { id: 1, name: 'María González', email: 'maria@example.com', role: 'Usuario', status: 'Activo', joined: '2024-01-15' },
        { id: 2, name: 'Juan Pérez', email: 'juan@example.com', role: 'Cuidador', status: 'Activo', joined: '2024-02-20' },
        { id: 3, name: 'Ana Rodríguez', email: 'ana@example.com', role: 'Usuario', status: 'Activo', joined: '2024-03-10' },
        { id: 4, name: 'Carlos López', email: 'carlos@example.com', role: 'Cuidador', status: 'Pendiente', joined: '2024-11-25' },
        { id: 5, name: 'Laura Martínez', email: 'laura@example.com', role: 'Usuario', status: 'Inactivo', joined: '2024-01-05' },
    ];

    const mockPets = [
        { id: 1, name: 'Max', type: 'Perro', breed: 'Golden Retriever', owner: 'María González', age: '3 años', weight: '30 kg' },
        { id: 2, name: 'Luna', type: 'Gato', breed: 'Siamés', owner: 'Ana Rodríguez', age: '2 años', weight: '4 kg' },
        { id: 3, name: 'Rocky', type: 'Perro', breed: 'Bulldog', owner: 'María González', age: '5 años', weight: '25 kg' },
        { id: 4, name: 'Mimi', type: 'Gato', breed: 'Persa', owner: 'Laura Martínez', age: '1 año', weight: '3 kg' },
        { id: 5, name: 'Thor', type: 'Perro', breed: 'Pastor Alemán', owner: 'Ana Rodríguez', age: '4 años', weight: '35 kg' },
    ];

    const mockSitters = [
        { id: 1, name: 'Juan Pérez', services: 'Paseo, Guardería', rating: '4.9', reviews: 45, earnings: '$12,450', status: 'Aprobado' },
        { id: 2, name: 'Carlos López', services: 'Paseo, Cuidado', rating: '4.7', reviews: 23, earnings: '$8,200', status: 'Pendiente' },
        { id: 3, name: 'Sofia Silva', services: 'Guardería, Hotel', rating: '5.0', reviews: 67, earnings: '$18,900', status: 'Aprobado' },
        { id: 4, name: 'Diego Fernández', services: 'Paseo', rating: '4.8', reviews: 31, earnings: '$6,700', status: 'Aprobado' },
    ];

    const mockBookings = [
        { id: 1, client: 'María González', sitter: 'Juan Pérez', service: 'Paseo', pet: 'Max', date: '2024-12-15', price: '$450', status: 'Confirmada' },
        { id: 2, client: 'Ana Rodríguez', sitter: 'Sofia Silva', service: 'Guardería', pet: 'Thor', date: '2024-12-20', price: '$1,200', status: 'Pendiente' },
        { id: 3, client: 'Laura Martínez', sitter: 'Diego Fernández', service: 'Paseo', pet: 'Mimi', date: '2024-12-10', price: '$300', status: 'Completada' },
        { id: 4, client: 'María González', sitter: 'Juan Pérez', service: 'Cuidado', pet: 'Rocky', date: '2024-12-18', price: '$800', status: 'Confirmada' },
        { id: 5, client: 'Ana Rodríguez', sitter: 'Sofia Silva', service: 'Hotel Canino', pet: 'Luna', date: '2024-11-28', price: '$1,500', status: 'Cancelada' },
    ];

    const mockPayments = [
        { id: 1, booking: '#001', client: 'María González', sitter: 'Juan Pérez', amount: '$450', method: 'Tarjeta', date: '2024-12-15', status: 'Procesado' },
        { id: 2, booking: '#002', client: 'Ana Rodríguez', sitter: 'Sofia Silva', amount: '$1,200', method: 'Transferencia', date: '2024-12-20', status: 'Pendiente' },
        { id: 3, booking: '#003', client: 'Laura Martínez', sitter: 'Diego Fernández', amount: '$300', method: 'Efectivo', date: '2024-12-10', status: 'Completado' },
        { id: 4, booking: '#004', client: 'María González', sitter: 'Juan Pérez', amount: '$800', method: 'Tarjeta', date: '2024-12-18', status: 'Procesado' },
    ];

    const handleAction = (action, item) => {
        console.log(`Action: ${action}`, item);
        alert(`Acción: ${action} - ${item.name || item.client || item.booking}`);
    };

    const renderStatusBadge = (status) => {
        const statusMap = {
            'Activo': 'badge-active',
            'Inactivo': 'badge-inactive',
            'Pendiente': 'badge-pending',
            'Aprobado': 'badge-approved',
            'Confirmada': 'badge-confirmed',
            'Completada': 'badge-completed',
            'Cancelada': 'badge-cancelled',
            'Procesado': 'badge-processed',
            'Completado': 'badge-completed',
        };

        return <span className={`status-badge ${statusMap[status] || ''}`}>{status}</span>;
    };

    const tabs = [
        { id: 'overview', label: '📊 Dashboard', icon: '📊' },
        { id: 'users', label: '👥 Usuarios', icon: '👥' },
        { id: 'pets', label: '🐾 Mascotas', icon: '🐾' },
        { id: 'sitters', label: '🤝 Cuidadores', icon: '🤝' },
        { id: 'bookings', label: '📅 Reservas', icon: '📅' },
        { id: 'payments', label: '💰 Pagos', icon: '💰' },
    ];

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div className="container">
                    <h1 className="admin-title">Panel de Administración</h1>
                    <p className="admin-subtitle">Gestiona todos los aspectos de la plataforma Rintintin</p>
                </div>
            </div>

            <div className="admin-container container">
                <div className="admin-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            <span className="tab-label">{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="admin-content">
                    {activeTab === 'overview' && (
                        <div className="overview-section">
                            <h2 className="section-title">Estadísticas Generales</h2>

                            <div className="stats-grid">
                                <StatsCard
                                    title="Usuarios Totales"
                                    value="1,247"
                                    change="+12%"
                                    icon="👥"
                                    trend="up"
                                    color="primary"
                                />
                                <StatsCard
                                    title="Mascotas Registradas"
                                    value="2,834"
                                    change="+8%"
                                    icon="🐾"
                                    trend="up"
                                    color="accent"
                                />
                                <StatsCard
                                    title="Cuidadores Activos"
                                    value="187"
                                    change="+15%"
                                    icon="🤝"
                                    trend="up"
                                    color="success"
                                />
                                <StatsCard
                                    title="Reservas del Mes"
                                    value="456"
                                    change="+23%"
                                    icon="📅"
                                    trend="up"
                                    color="primary"
                                />
                                <StatsCard
                                    title="Ingresos Mensuales"
                                    value="$47,890"
                                    change="+18%"
                                    icon="💰"
                                    trend="up"
                                    color="success"
                                />
                                <StatsCard
                                    title="Tasa de Satisfacción"
                                    value="4.8/5"
                                    change="+0.2"
                                    icon="⭐"
                                    trend="up"
                                    color="warning"
                                />
                            </div>

                            <div className="charts-section">
                                <h3 className="subsection-title">Actividad Reciente</h3>
                                <div className="activity-cards">
                                    <div className="activity-card">
                                        <div className="activity-icon">📈</div>
                                        <div className="activity-content">
                                            <h4>Nuevas Reservas</h4>
                                            <p>23 reservas en las últimas 24 horas</p>
                                        </div>
                                    </div>
                                    <div className="activity-card">
                                        <div className="activity-icon">✅</div>
                                        <div className="activity-content">
                                            <h4>Servicios Completados</h4>
                                            <p>67 servicios finalizados esta semana</p>
                                        </div>
                                    </div>
                                    <div className="activity-card">
                                        <div className="activity-icon">⏳</div>
                                        <div className="activity-content">
                                            <h4>Solicitudes Pendientes</h4>
                                            <p>5 solicitudes de cuidadores por aprobar</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="section">
                            <h2 className="section-title">Gestión de Usuarios</h2>
                            <DataTable
                                columns={[
                                    { key: 'id', label: 'ID' },
                                    { key: 'name', label: 'Nombre' },
                                    { key: 'email', label: 'Email' },
                                    { key: 'role', label: 'Rol' },
                                    {
                                        key: 'status',
                                        label: 'Estado',
                                        render: (value) => renderStatusBadge(value)
                                    },
                                    { key: 'joined', label: 'Fecha Registro' },
                                ]}
                                data={mockUsers}
                                onAction={handleAction}
                            />
                        </div>
                    )}

                    {activeTab === 'pets' && (
                        <div className="section">
                            <h2 className="section-title">Gestión de Mascotas</h2>
                            <DataTable
                                columns={[
                                    { key: 'id', label: 'ID' },
                                    { key: 'name', label: 'Nombre' },
                                    { key: 'type', label: 'Tipo' },
                                    { key: 'breed', label: 'Raza' },
                                    { key: 'owner', label: 'Dueño' },
                                    { key: 'age', label: 'Edad' },
                                    { key: 'weight', label: 'Peso' },
                                ]}
                                data={mockPets}
                                onAction={handleAction}
                            />
                        </div>
                    )}

                    {activeTab === 'sitters' && (
                        <div className="section">
                            <h2 className="section-title">Gestión de Cuidadores</h2>
                            <DataTable
                                columns={[
                                    { key: 'id', label: 'ID' },
                                    { key: 'name', label: 'Nombre' },
                                    { key: 'services', label: 'Servicios' },
                                    { key: 'rating', label: 'Valoración' },
                                    { key: 'reviews', label: 'Reseñas' },
                                    { key: 'earnings', label: 'Ganancias' },
                                    {
                                        key: 'status',
                                        label: 'Estado',
                                        render: (value) => renderStatusBadge(value)
                                    },
                                ]}
                                data={mockSitters}
                                onAction={handleAction}
                            />
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div className="section">
                            <h2 className="section-title">Gestión de Reservas</h2>
                            <DataTable
                                columns={[
                                    { key: 'id', label: 'ID' },
                                    { key: 'client', label: 'Cliente' },
                                    { key: 'sitter', label: 'Cuidador' },
                                    { key: 'service', label: 'Servicio' },
                                    { key: 'pet', label: 'Mascota' },
                                    { key: 'date', label: 'Fecha' },
                                    { key: 'price', label: 'Precio' },
                                    {
                                        key: 'status',
                                        label: 'Estado',
                                        render: (value) => renderStatusBadge(value)
                                    },
                                ]}
                                data={mockBookings}
                                onAction={handleAction}
                            />
                        </div>
                    )}

                    {activeTab === 'payments' && (
                        <div className="section">
                            <h2 className="section-title">Gestión de Pagos</h2>
                            <DataTable
                                columns={[
                                    { key: 'id', label: 'ID' },
                                    { key: 'booking', label: 'Reserva' },
                                    { key: 'client', label: 'Cliente' },
                                    { key: 'sitter', label: 'Cuidador' },
                                    { key: 'amount', label: 'Monto' },
                                    { key: 'method', label: 'Método' },
                                    { key: 'date', label: 'Fecha' },
                                    {
                                        key: 'status',
                                        label: 'Estado',
                                        render: (value) => renderStatusBadge(value)
                                    },
                                ]}
                                data={mockPayments}
                                onAction={handleAction}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;
