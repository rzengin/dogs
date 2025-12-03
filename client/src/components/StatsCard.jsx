import './StatsCard.css';

function StatsCard({ title, value, change, icon, trend, color = 'primary' }) {
    const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→';
    const trendClass = trend === 'up' ? 'positive' : trend === 'down' ? 'negative' : 'neutral';

    return (
        <div className={`stats-card stats-card-${color}`}>
            <div className="stats-card-header">
                <div className="stats-card-icon">
                    {icon}
                </div>
                <div className={`stats-card-trend ${trendClass}`}>
                    {trendIcon} {change}
                </div>
            </div>
            <div className="stats-card-body">
                <h3 className="stats-card-value">{value}</h3>
                <p className="stats-card-title">{title}</p>
            </div>
        </div>
    );
}

export default StatsCard;
