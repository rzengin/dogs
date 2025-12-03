import './ServiceCard.css';

export default function ServiceCard({ icon, title, description, color }) {
    return (
        <div className="service-card" style={{ '--card-color': color }}>
            <div className="service-icon">
                {icon}
            </div>
            <h3 className="service-title">{title}</h3>
            <p className="service-description">{description}</p>
            <button className="service-link">
                Más Información →
            </button>
        </div>
    );
}
