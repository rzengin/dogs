import { useState } from 'react';
import { MapPin, Star, Heart, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    const [filters, setFilters] = useState({
        service: 'all',
        priceRange: [0, 1000],
        rating: 0
    });

    const [favorites, setFavorites] = useState([]);

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
                    <p className="search-subtitle">{mockSitters.length} cuidadores disponibles</p>
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
                        <label className="filter-label">Servicio</label>
                        <select
                            className="filter-select"
                            value={filters.service}
                            onChange={(e) => setFilters({ ...filters, service: e.target.value })}
                        >
                            <option value="all">Todos</option>
                            <option value="walking">Paseo</option>
                            <option value="sitting">Cuidado en Casa</option>
                            <option value="boarding">Hotel</option>
                            <option value="daycare">Guardería</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Precio por día (UYU)</label>
                        <div className="price-range">
                            <span>${filters.priceRange[0]}</span>
                            <span>${filters.priceRange[1]}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                            className="filter-range"
                        />
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">Calificación mínima</label>
                        <div className="rating-filter">
                            {[4.5, 4.7, 4.9].map(rating => (
                                <button
                                    key={rating}
                                    className={`rating-btn ${filters.rating === rating ? 'active' : ''}`}
                                    onClick={() => setFilters({ ...filters, rating })}
                                >
                                    {rating}+ ★
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className="search-results">
                    <div className="results-grid">
                        {mockSitters.map(sitter => (
                            <div key={sitter.id} className="sitter-card">
                                {sitter.badge && (
                                    <div className="sitter-badge">{sitter.badge}</div>
                                )}

                                <button
                                    className={`favorite-btn ${favorites.includes(sitter.id) ? 'active' : ''}`}
                                    onClick={() => toggleFavorite(sitter.id)}
                                    aria-label="Add to favorites"
                                >
                                    <Heart size={20} fill={favorites.includes(sitter.id) ? 'currentColor' : 'none'} />
                                </button>

                                <div className="sitter-avatar">{sitter.image}</div>

                                <div className="sitter-info">
                                    <h3 className="sitter-name">{sitter.name}</h3>
                                    <div className="sitter-location">
                                        <MapPin size={14} />
                                        {sitter.location}
                                    </div>
                                    <div className="sitter-rating">
                                        <Star size={14} fill="currentColor" />
                                        <span className="rating-value">{sitter.rating}</span>
                                        <span className="rating-count">({sitter.reviews} reseñas)</span>
                                    </div>
                                    <div className="sitter-services">
                                        {sitter.services.map((service, idx) => (
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
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
