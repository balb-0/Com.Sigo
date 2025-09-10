import './Dashboard.css';
import Header from "../../components/Header/Header";
import KpiCard from '../../components/KPICard/KPICard';

interface DashboardProps {
    currentPage?: string;
    onNavigate?: (page: string) => void;
}

export function Dashboard({ currentPage, onNavigate }: DashboardProps) {

    function getScoreColor(score: number) {
        if (score < 4) return 'var(--color-vermelho)';
        if (score < 7) return 'var(--color-amarelo)';
        return 'var(--color-verde)';
    }

    const overallScore = 8;
    const scoreColor = getScoreColor(overallScore);

    return (
        <div className="dashboard-container">
            <Header currentPage={currentPage} onNavigate={onNavigate} />
            <main className="main-content">
                <div className="title-section">
                    <h1 className="page-title">Dashboard de Qualidade</h1>
                    <div id="kpi-cards">
                        <KpiCard
                            showSubvalue={true}
                            id="overall-score"
                            valueId="overall-score-value"
                            title="Pontuação"
                            subtitle="Média Geral"
                            value={overallScore.toString()}
                            valueStyle={{ color: scoreColor }}
                            style={{ "--kpi-radial-color": scoreColor } as React.CSSProperties}
                        />
                        <KpiCard
                            title="Atendimentos"
                            subtitle="Críticos"
                            value="5"
                        />
                        <KpiCard
                            title="Chamadas"
                            subtitle="Analisadas"
                            value="5"
                        />
                        <KpiCard
                            title="Transferências"
                            subtitle="Digital"
                            value="5"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}