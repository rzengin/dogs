import './StatCard.css';

const StatCard = ({ title, value, change, icon, trend }) => {
    const isPositive = change >= 0;

    return (
        <div className="stat-card">
            <div className="stat-card-header">
                <div className="stat-card-icon">{icon}</div>
                <span className={`stat-card-trend ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
                </span>
            </div>
            <div className="stat-card-content">
                <h3 className="stat-card-value">{value}</h3>
                <p className="stat-card-title">{title}</p>
            </div>
        </div>
    );
};

export default StatCard;
