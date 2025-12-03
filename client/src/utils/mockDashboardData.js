// Mock data generator for the analytics dashboard

export const generateMockDashboardData = () => {
    // Current month stats
    const stats = {
        totalRevenue: 45780,
        revenueChange: 12.5,
        activeBookings: 23,
        bookingsChange: 8.3,
        totalSitters: 156,
        sittersChange: 15.2,
        totalUsers: 892,
        usersChange: 21.7,
        occupancyRate: 67.4,
        occupancyChange: 5.1
    };

    // Revenue data for the last 6 months
    const revenueData = [
        { month: 'Jul', value: 32500 },
        { month: 'Ago', value: 35200 },
        { month: 'Sep', value: 38900 },
        { month: 'Oct', value: 40100 },
        { month: 'Nov', value: 42300 },
        { month: 'Dec', value: 45780 }
    ];

    // Bookings by service type
    const bookingsByService = [
        { service: 'Paseos', count: 145, color: 'hsl(200, 70%, 50%)' },
        { service: 'Guardería', count: 98, color: 'hsl(30, 90%, 55%)' },
        { service: 'Hospedaje', count: 76, color: 'hsl(270, 60%, 55%)' },
        { service: 'Visitas', count: 62, color: 'hsl(150, 50%, 45%)' },
        { service: 'Entrenamiento', count: 41, color: 'hsl(340, 70%, 55%)' }
    ];

    // User growth data
    const userGrowthData = [
        { month: 'Jul', users: 645, sitters: 98 },
        { month: 'Ago', users: 698, sitters: 112 },
        { month: 'Sep', users: 742, sitters: 125 },
        { month: 'Oct', users: 801, sitters: 138 },
        { month: 'Nov', users: 856, sitters: 148 },
        { month: 'Dec', users: 892, sitters: 156 }
    ];

    // Recent activity
    const recentActivity = [
        {
            id: 1,
            user: 'María González',
            sitter: 'Carlos Rodríguez',
            service: 'Paseo',
            date: '2025-12-02',
            duration: '1 hora',
            status: 'confirmado',
            amount: 450
        },
        {
            id: 2,
            user: 'Juan Pérez',
            sitter: 'Ana Martínez',
            service: 'Guardería',
            date: '2025-12-01',
            duration: '8 horas',
            status: 'completado',
            amount: 1200
        },
        {
            id: 3,
            user: 'Laura Silva',
            sitter: 'Diego Fernández',
            service: 'Hospedaje',
            date: '2025-12-03',
            duration: '3 días',
            status: 'pendiente',
            amount: 3600
        },
        {
            id: 4,
            user: 'Roberto Castro',
            sitter: 'Sofía López',
            service: 'Visita',
            date: '2025-12-02',
            duration: '30 min',
            status: 'confirmado',
            amount: 350
        },
        {
            id: 5,
            user: 'Patricia Díaz',
            sitter: 'Miguel Sánchez',
            service: 'Entrenamiento',
            date: '2025-11-30',
            duration: '1 hora',
            status: 'completado',
            amount: 800
        },
        {
            id: 6,
            user: 'Fernando Núñez',
            sitter: 'Valentina Cruz',
            service: 'Paseo',
            date: '2025-12-01',
            duration: '45 min',
            status: 'completado',
            amount: 400
        },
        {
            id: 7,
            user: 'Cecilia Ramos',
            sitter: 'Pablo Torres',
            service: 'Guardería',
            date: '2025-12-04',
            duration: '6 horas',
            status: 'pendiente',
            amount: 900
        },
        {
            id: 8,
            user: 'Andrés Morales',
            sitter: 'Lucía Gómez',
            service: 'Hospedaje',
            date: '2025-11-29',
            duration: '2 días',
            status: 'completado',
            amount: 2400
        }
    ];

    return {
        stats,
        revenueData,
        bookingsByService,
        userGrowthData,
        recentActivity
    };
};

// Format currency for Uruguay
export const formatCurrency = (amount) => {
    return `$${amount.toLocaleString('es-UY')}`;
};

// Format percentage
export const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};

// Get status color
export const getStatusColor = (status) => {
    const colors = {
        'confirmado': 'hsl(200, 70%, 50%)',
        'completado': 'hsl(150, 50%, 45%)',
        'pendiente': 'hsl(30, 90%, 55%)',
        'cancelado': 'hsl(0, 70%, 55%)'
    };
    return colors[status] || colors.pendiente;
};

// Get status label
export const getStatusLabel = (status) => {
    const labels = {
        'confirmado': 'Confirmado',
        'completado': 'Completado',
        'pendiente': 'Pendiente',
        'cancelado': 'Cancelado'
    };
    return labels[status] || status;
};
