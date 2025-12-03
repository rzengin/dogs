import { useState } from 'react';
import './LineChart.css';

const LineChart = ({ data, title, dataKey, color = 'hsl(200, 70%, 50%)', height = 300, showLegend = false, multiLine = false }) => {
    const [hoveredPoint, setHoveredPoint] = useState(null);

    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = 600;
    const chartHeight = height;
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    // Get all values for scaling
    const getAllValues = () => {
        if (multiLine) {
            const allValues = [];
            data.forEach(point => {
                Object.keys(point).forEach(key => {
                    if (key !== 'month' && typeof point[key] === 'number') {
                        allValues.push(point[key]);
                    }
                });
            });
            return allValues;
        }
        return data.map(d => d[dataKey]);
    };

    const allValues = getAllValues();
    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues);
    const valueRange = maxValue - minValue;

    // Scale functions
    const scaleX = (index) => {
        return (index / (data.length - 1)) * innerWidth;
    };

    const scaleY = (value) => {
        return innerHeight - ((value - minValue) / valueRange) * innerHeight;
    };

    // Generate path for a line
    const generatePath = (dataKey) => {
        const points = data.map((d, i) => ({
            x: scaleX(i),
            y: scaleY(d[dataKey])
        }));

        if (points.length === 0) return '';

        let path = `M ${points[0].x} ${points[0].y}`;

        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const cpx = (prev.x + curr.x) / 2;
            path += ` Q ${cpx} ${prev.y}, ${cpx} ${(prev.y + curr.y) / 2} Q ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
        }

        return path;
    };

    // Generate Y-axis labels
    const yAxisLabels = [];
    const labelCount = 5;
    for (let i = 0; i <= labelCount; i++) {
        const value = minValue + (valueRange * i) / labelCount;
        const y = innerHeight - (i * innerHeight) / labelCount;
        yAxisLabels.push({ value: Math.round(value), y });
    }

    const colors = multiLine
        ? {
            users: 'hsl(200, 70%, 50%)',
            sitters: 'hsl(30, 90%, 55%)'
        }
        : { [dataKey]: color };

    const lineKeys = multiLine ? Object.keys(data[0]).filter(k => k !== 'month') : [dataKey];

    return (
        <div className="line-chart-container">
            {title && <h3 className="chart-title">{title}</h3>}
            <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="line-chart"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    {Object.entries(colors).map(([key, col]) => (
                        <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={col} stopOpacity="0.3" />
                            <stop offset="100%" stopColor={col} stopOpacity="0.05" />
                        </linearGradient>
                    ))}
                </defs>

                <g transform={`translate(${padding.left}, ${padding.top})`}>
                    {/* Grid lines */}
                    {yAxisLabels.map((label, i) => (
                        <line
                            key={i}
                            x1="0"
                            y1={label.y}
                            x2={innerWidth}
                            y2={label.y}
                            stroke="hsl(220, 15%, 90%)"
                            strokeWidth="1"
                            strokeDasharray="4"
                        />
                    ))}

                    {/* Lines and area fills */}
                    {lineKeys.map((key) => {
                        const path = generatePath(key);
                        const areaPath = `${path} L ${scaleX(data.length - 1)} ${innerHeight} L 0 ${innerHeight} Z`;

                        return (
                            <g key={key}>
                                {/* Area fill */}
                                <path
                                    d={areaPath}
                                    fill={`url(#gradient-${key})`}
                                    className="line-area"
                                />

                                {/* Line */}
                                <path
                                    d={path}
                                    fill="none"
                                    stroke={colors[key]}
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="line-path"
                                />

                                {/* Points */}
                                {data.map((d, i) => (
                                    <g key={`${key}-${i}`}>
                                        <circle
                                            cx={scaleX(i)}
                                            cy={scaleY(d[key])}
                                            r="6"
                                            fill={colors[key]}
                                            className="line-point"
                                            onMouseEnter={() => setHoveredPoint({ index: i, key, value: d[key], month: d.month })}
                                            onMouseLeave={() => setHoveredPoint(null)}
                                        />
                                    </g>
                                ))}
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

                    {/* X-axis labels */}
                    {data.map((d, i) => (
                        <text
                            key={i}
                            x={scaleX(i)}
                            y={innerHeight + 25}
                            textAnchor="middle"
                            className="axis-label"
                        >
                            {d.month}
                        </text>
                    ))}

                    {/* Y-axis labels */}
                    {yAxisLabels.map((label, i) => (
                        <text
                            key={i}
                            x="-10"
                            y={label.y + 5}
                            textAnchor="end"
                            className="axis-label"
                        >
                            {label.value.toLocaleString()}
                        </text>
                    ))}

                    {/* Tooltip */}
                    {hoveredPoint && (
                        <g transform={`translate(${scaleX(hoveredPoint.index)}, ${scaleY(hoveredPoint.value)})`}>
                            <rect
                                x="-50"
                                y="-45"
                                width="100"
                                height="35"
                                rx="6"
                                fill="hsl(220, 20%, 15%)"
                                opacity="0.95"
                                className="tooltip-bg"
                            />
                            <text
                                y="-30"
                                textAnchor="middle"
                                className="tooltip-text"
                                fill="white"
                                fontSize="12"
                                fontWeight="600"
                            >
                                {hoveredPoint.month}
                            </text>
                            <text
                                y="-15"
                                textAnchor="middle"
                                className="tooltip-text"
                                fill="white"
                                fontSize="14"
                                fontWeight="700"
                            >
                                {hoveredPoint.value.toLocaleString()}
                            </text>
                        </g>
                    )}
                </g>
            </svg>

            {/* Legend */}
            {showLegend && multiLine && (
                <div className="chart-legend">
                    {lineKeys.map(key => (
                        <div key={key} className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: colors[key] }}></div>
                            <span className="legend-label">
                                {key === 'users' ? 'Usuarios' : 'Cuidadores'}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LineChart;
