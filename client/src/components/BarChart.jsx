import { useState } from 'react';
import './BarChart.css';

const BarChart = ({ data, title, height = 300 }) => {
    const [hoveredBar, setHoveredBar] = useState(null);

    const padding = { top: 20, right: 20, bottom: 60, left: 60 };
    const chartWidth = 600;
    const chartHeight = height;
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    const maxValue = Math.max(...data.map(d => d.count));

    const barWidth = innerWidth / (data.length * 1.5);
    const barSpacing = barWidth * 0.5;

    const scaleY = (value) => {
        return (value / maxValue) * innerHeight;
    };

    return (
        <div className="bar-chart-container">
            {title && <h3 className="chart-title">{title}</h3>}
            <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="bar-chart"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    {data.map((d, i) => (
                        <linearGradient key={i} id={`bar-gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={d.color} stopOpacity="0.9" />
                            <stop offset="100%" stopColor={d.color} stopOpacity="0.6" />
                        </linearGradient>
                    ))}
                </defs>

                <g transform={`translate(${padding.left}, ${padding.top})`}>
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => {
                        const value = (maxValue / 4) * i;
                        const y = innerHeight - scaleY(value);
                        return (
                            <g key={i}>
                                <line
                                    x1="0"
                                    y1={y}
                                    x2={innerWidth}
                                    y2={y}
                                    stroke="hsl(220, 15%, 90%)"
                                    strokeWidth="1"
                                    strokeDasharray="4"
                                />
                                <text
                                    x="-10"
                                    y={y + 5}
                                    textAnchor="end"
                                    className="axis-label"
                                >
                                    {Math.round(value)}
                                </text>
                            </g>
                        );
                    })}

                    {/* Bars */}
                    {data.map((d, i) => {
                        const x = i * (barWidth + barSpacing);
                        const barHeight = scaleY(d.count);
                        const y = innerHeight - barHeight;
                        const isHovered = hoveredBar === i;

                        return (
                            <g key={i}>
                                {/* Bar */}
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={`url(#bar-gradient-${i})`}
                                    rx="6"
                                    className={`bar ${isHovered ? 'hovered' : ''}`}
                                    onMouseEnter={() => setHoveredBar(i)}
                                    onMouseLeave={() => setHoveredBar(null)}
                                    style={{
                                        animation: `growBar 0.6s ease-out ${i * 0.1}s both`
                                    }}
                                />

                                {/* Value label on hover */}
                                {isHovered && (
                                    <g>
                                        <rect
                                            x={x + barWidth / 2 - 30}
                                            y={y - 35}
                                            width="60"
                                            height="30"
                                            rx="6"
                                            fill="hsl(220, 20%, 15%)"
                                            opacity="0.95"
                                            className="tooltip-bg"
                                        />
                                        <text
                                            x={x + barWidth / 2}
                                            y={y - 15}
                                            textAnchor="middle"
                                            className="tooltip-text"
                                            fill="white"
                                            fontSize="14"
                                            fontWeight="700"
                                        >
                                            {d.count}
                                        </text>
                                    </g>
                                )}

                                {/* X-axis label */}
                                <text
                                    x={x + barWidth / 2}
                                    y={innerHeight + 20}
                                    textAnchor="middle"
                                    className="axis-label bar-label"
                                    transform={`rotate(-15, ${x + barWidth / 2}, ${innerHeight + 20})`}
                                >
                                    {d.service}
                                </text>
                            </g>
                        );
                    })}

                    {/* X-axis */}
                    <line
                        x1="0"
                        y1={innerHeight}
                        x2={innerWidth}
                        y2={innerHeight}
                        stroke="hsl(220, 15%, 70%)"
                        strokeWidth="2"
                    />

                    {/* Y-axis */}
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2={innerHeight}
                        stroke="hsl(220, 15%, 70%)"
                        strokeWidth="2"
                    />
                </g>
            </svg>
        </div>
    );
};

export default BarChart;
