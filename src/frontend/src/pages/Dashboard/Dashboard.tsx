import './Dashboard.css';
import Header from "../../components/Header/Header";
import KpiCard from '../../components/KPICard/KPICard';
import { ChamadasTable } from '../../components/Table/Table.tsx';

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
    const criticalAttendances = 2;
    const callsAnalyzed = 5;
    const digitalTransfers = 5;
    
    const scoreColor = getScoreColor(overallScore);
    
    return (
        <div className="dashboard-container">
            <Header currentPage={currentPage} onNavigate={onNavigate} />
            <main>
                <div>
                    <h1 className="page-titles">Dashboard de Qualidade</h1>
                    <div id="kpi-cards">
                        <KpiCard
                            showSubvalue={true}
                            id="overall-score"
                            title="Pontuação"
                            subtitle="Média Geral"
                            value={overallScore.toString()}
                            valueStyle={{ color: scoreColor }}
                            style={{ "--kpi-radial-color": scoreColor } as React.CSSProperties}
                        />
                        <KpiCard
                            id="critical-attendances"
                            title="Atendimentos"
                            subtitle="Críticos"
                            value={criticalAttendances.toString()}
                            valueId='critical-value'
                        />
                        <KpiCard
                            title="Chamadas"
                            subtitle="Analisadas"
                            value={callsAnalyzed.toString()}
                        />
                        <KpiCard
                            title="Transferências"
                            subtitle="Digital"
                            value={digitalTransfers.toString()}
                        />
                    </div>
                </div>
                <div>
                    <ChamadasTable />
                </div>
            </main>
        </div>
    );
}