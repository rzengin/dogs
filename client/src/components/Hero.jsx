import { Search, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';
import './Hero.css';

export default function Hero() {
    const [searchData, setSearchData] = useState({
        location: '',
        service: 'all',
        date: ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        // Navigate to search page with params
        window.location.href = `/search?location=${searchData.location}&service=${searchData.service}&date=${searchData.date}`;
    };

    return (
        <section className="hero">
            <div className="hero-bg">
                <div className="hero-gradient"></div>
            </div>

            <div className="container hero-content">
                <div className="hero-text fade-in">
                    <h1 className="hero-title">
                        El Mejor Cuidado para tu
                        <span className="hero-highlight"> Mejor Amigo</span>
                    </h1>
                    <p className="hero-subtitle">
                        Conectamos a dueños responsables con cuidadores confiables en todo Uruguay.
                        Paseos, cuidado en casa, guardería y mucho más.
                    </p>
                </div>

                <form className="hero-search-card fade-in" onSubmit={handleSearch}>
                    <div className="search-tabs">
                        <button type="button" className="search-tab active">
                            Buscar Servicio
                        </button>
                        <button type="button" className="search-tab">
                            Ser Cuidador
                        </button>
                    </div>

                    <div className="search-inputs">
                        <div className="search-input-group">
                            <MapPin className="input-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Ubicación (ej: Montevideo, Punta del Este)"
                                value={searchData.location}
                                onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                                className="search-input"
                            />
                        </div>

                        <div className="search-input-group">
                            <Search className="input-icon" size={20} />
                            <select
                                value={searchData.service}
                                onChange={(e) => setSearchData({ ...searchData, service: e.target.value })}
                                className="search-input"
                            >
                                <option value="all">Todos los servicios</option>
                                <option value="walking">Paseo de Perros</option>
                                <option value="sitting">Cuidado en Casa</option>
                                <option value="boarding">Hotel para Mascotas</option>
                                <option value="daycare">Guardería Canina</option>
                            </select>
                        </div>

                        <div className="search-input-group">
                            <Calendar className="input-icon" size={20} />
                            <input
                                type="date"
                                value={searchData.date}
                                onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                                className="search-input"
                            />
                        </div>

                        <button type="submit" className="btn btn-accent search-btn">
                            <Search size={20} />
                            Buscar
                        </button>
                    </div>
                </form>

                <div className="hero-stats fade-in">
                    <div className="stat-item">
                        <div className="stat-number">10,000+</div>
                        <div className="stat-label">Mascotas Felices</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <div className="stat-number">2,500+</div>
                        <div className="stat-label">Cuidadores Verificados</div>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <div className="stat-number">4.9★</div>
                        <div className="stat-label">Calificación Promedio</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
