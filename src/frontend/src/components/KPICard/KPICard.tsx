import './KpiCard.css';
interface KpiCardProps {
    title: string;
    subtitle: string;
    value: string;
    id?: string;
    valueId?: string;
    valueStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    showSubvalue?: boolean;
}

export default function KpiCard({ title, subtitle, value, id, valueId, valueStyle, style, showSubvalue }: KpiCardProps) {
    return (
        <div id={id} className="kpi-card" style={style}>
            <h2 id="kpi-title">
                {title}
                <span id='kpi-subtitle'>
                    {subtitle}
                </span>
            </h2>
            <p id={valueId} className="kpi-value" style={valueStyle}>
                {value}
                {showSubvalue && <span id="subvalue">/10</span>}
            </p>
        </div>
    );
}