import { useState, useEffect } from 'react';
import { MapPin, Star, Heart, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './Search.css';

// Mock data for sitters
const mockSitters = [
    {
        id: 1,
        name: 'María González',
        location: 'Pocitos, Montevideo',
        rating: 4.9,
        reviews: 127,
        image: '👩',
        services: ['Paseo', 'Cuidado en Casa'],
        price: 400,
        badge: 'Super Cuidadora'
    },
    {
        id: 2,
        name: 'Carlos Rodríguez',
        location: 'Malvín, Montevideo',
        rating: 4.8,
        reviews: 89,
        image: '👨',
        services: ['Paseo', 'Guardería'],
        price: 350,
        badge: null
    },
    {
        id: 3,
        name: 'Ana Martínez',
        location: 'Carrasco, Montevideo',
        rating: 5.0,
        reviews: 156,
        image: '👩‍🦰',
        services: ['Hotel', 'Cuidado en Casa'],
        price: 500,
        badge: 'Super Cuidadora'
    },
    {
        id: 4,
        name: 'Diego Pérez',
        location: 'Cordón, Montevideo',
        rating: 4.7,
        reviews: 64,
        image: '🧔',
        services: ['Paseo'],
        price: 300,
        badge: null
    },
    {
        id: 5,
        name: 'Laura Fernández',
        location: 'Punta del Este',
        rating: 4.9,
        reviews: 112,
        image: '👱‍♀️',
        services: ['Hotel', 'Guardería', 'Paseo'],
        price: 450,
        badge: 'Super Cuidadora'
    },
    {
        id: 6,
        name: 'Javier Silva',
        location: 'Punta Carretas, Montevideo',
        rating: 4.8,
        reviews: 98,
        image: '👨‍🦱',
        services: ['Cuidado en Casa', 'Paseo'],
        price: 380,
        badge: null
    }
];

export default function Search() {
    const [sitters, setSitters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        city: '',
        service: '',
        petType: '',
        minPrice: '',
        maxPrice: ''
    });

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchSitters();
    }, []);

    const fetchSitters = async (filterParams = {}) => {
        try {
            setLoading(true);
            const data = await api.sitters.getAll(filterParams);
            setSitters(data);
        } catch (error) {
            console.error('Error fetching sitters:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        const filterParams = {};
        if (filters.city) filterParams.city = filters.city;
        if (filters.service) filterParams.service = filters.service;
        if (filters.petType) filterParams.petType = filters.petType;
        if (filters.minPrice) filterParams.minPrice = filters.minPrice;
        if (filters.maxPrice) filterParams.maxPrice = filters.maxPrice;
        
        fetchSitters(filterParams);
    };

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
        );
    };

    return (
        <div className="search-page">
            <div className="search-header">
                <div className="container">
                    <h1 className="search-title">Cuidadores en Uruguay</h1>
                    <p className="search-subtitle">{sitters.length} cuidadores disponibles</p>
                </div>
            </div>

            <div className="container search-content">
                <aside className="search-filters">
                    <div className="filters-header">
                        <h2>
                            <SlidersHorizontal size={20} />
                            Filtros
                        </h2>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Ciudad</label>
                        <select
                            className="filter-select"
                            name="city"
                            value={filters.city}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todas</option>
                            <option value="Montevideo">Montevideo</option>
                            <option value="Canelones">Canelones</option>
                            <option value="Maldonado">Maldonado</option>
                            <option value="Punta del Este">Punta del Este</option>
                            <option value="Salto">Salto</option>
                            <option value="Paysandú">Paysandú</option>
                            <option value="Colonia">Colonia</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Servicio</label>
                        <select
                            className="filter-select"
                            name="service"
                            value={filters.service}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos</option>
                            <option value="Paseo de Perros">Paseo de Perros</option>
                            <option value="Cuidado en Casa">Cuidado en Casa</option>
                            <option value="Hotel para Mascotas">Hotel para Mascotas</option>
                            <option value="Guardería Canina">Guardería Canina</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Tipo de Mascota</label>
                        <select
                            className="filter-select"
                            name="petType"
                            value={filters.petType}
                            onChange={handleFilterChange}
                        >
                            <option value="">Todos</option>
                            <option value="Perros Pequeños">Perros Pequeños</option>
                            <option value="Perros Medianos">Perros Medianos</option>
                            <option value="Perros Grandes">Perros Grandes</option>
                            <option value="Gatos">Gatos</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Precio por día (UYU)</label>
                        <div className="price-inputs">
                            <input
                                type="number"
                                name="minPrice"
                                placeholder="Mín"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                className="filter-input"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                name="maxPrice"
                                placeholder="Máx"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                className="filter-input"
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary" onClick={applyFilters}>
                        Aplicar Filtros
                    </button>
                </aside>

                <main className="search-results">
                    {loading ? (
                        <div className="loading-spinner">Cargando cuidadores...</div>
                    ) : sitters.length === 0 ? (
                        <div className="empty-state">
                            <h3>No se encontraron cuidadores</h3>
                            <p>Intenta ajustar los filtros de búsqueda</p>
                        </div>
                    ) : (
                        <div className="results-grid">
                            {sitters.map(sitter => {
                                const services = JSON.parse(sitter.services || '[]');
                                const petTypes = JSON.parse(sitter.petTypes || '[]');
                                
                                return (
                                    <div key={sitter.id} className="sitter-card">
                                        {sitter.rating >= 4.8 && (
                                            <div className="sitter-badge">Super Cuidador</div>
                                        )}

                                        <button
                                            className={`favorite-btn ${favorites.includes(sitter.id) ? 'active' : ''}`}
                                            onClick={() => toggleFavorite(sitter.id)}
                                            aria-label="Add to favorites"
                                        >
                                            <Heart size={20} fill={favorites.includes(sitter.id) ? 'currentColor' : 'none'} />
                                        </button>

                                        <div className="sitter-avatar">👤</div>

                                        <div className="sitter-info">
                                            <h3 className="sitter-name">{sitter.user.name}</h3>
                                            <div className="sitter-location">
                                                <MapPin size={14} />
                                                {sitter.neighborhood ? `${sitter.neighborhood}, ` : ''}{sitter.user.city}
                                            </div>
                                            <div className="sitter-rating">
                                                <Star size={14} fill="currentColor" />
                                                <span className="rating-value">{sitter.rating.toFixed(1)}</span>
                                                <span className="rating-count">({sitter.reviews.length} reseñas)</span>
                                            </div>
                                            <div className="sitter-services">
                                                {services.slice(0, 2).map((service, idx) => (
                                                    <span key={idx} className="service-tag">{service}</span>
                                                ))}
                                            </div>
                                            <div className="sitter-price">
                                                <span className="price-amount">${sitter.price}</span>
                                                <span className="price-label">/ día</span>
                                            </div>
                                        </div>

                                        <Link to={`/sitter/${sitter.id}`} className="btn btn-primary sitter-cta">
                                            Ver Perfil
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
