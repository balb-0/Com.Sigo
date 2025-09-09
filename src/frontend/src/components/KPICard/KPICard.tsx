import './KpiCard.css';

interface KpiCardProps {
    title: string;
    description: string;
}

export default function KpiCard({ title, description }: KpiCardProps) {
    return (
        <div className="kpi-card">
            <h2 className="kpi-title">{title}</h2>
            <p className="kpi-description">{description}</p>
        </div>
    );
}