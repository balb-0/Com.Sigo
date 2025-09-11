import './Dashboard.css';
import Header from "../../components/Header/Header";
import KpiCard from '../../components/KPICard/KPICard';
import { ChamadasTable, type Chamada } from '../../components/Table/Table.tsx';

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

    const mockChamadas: Chamada[] = [
        { id: '1234', dataHora: '10/09/25 14:30', pontuacao: 8, tags: [{ name: 'Resolvido', type: 'positivo' }, { name: 'Elogio', type: 'positivo' }] },
        { id: '1235', dataHora: '10/09/25 14:25', pontuacao: 3, tags: [{ name: 'Sentimento Negativo', type: 'negativo' }, { name: 'Script Incompleto', type: 'negativo' }] },
        { id: '1236', dataHora: '10/09/25 14:20', pontuacao: 6, tags: [{ name: 'Transferência', type: 'neutro' }, { name: 'Resolvido', type: 'positivo' }] },
        { id: '1237', dataHora: '10/09/25 14:15', pontuacao: 9, tags: [{ name: 'Elogio', type: 'positivo' }] },
        { id: '1238', dataHora: '10/09/25 14:10', pontuacao: 2, tags: [{ name: 'Reclamação Formal', type: 'negativo' }] },
        { id: '1239', dataHora: '10/09/25 14:05', pontuacao: 5, tags: [{ name: 'Transferência', type: 'neutro' }] },
    ];

    const overallScore = Math.round(
        mockChamadas.reduce((acc, chamada) => acc + chamada.pontuacao, 0) / mockChamadas.length
    );

    const criticalAttendances = mockChamadas.filter(chamada => chamada.pontuacao < 4).length;

    const callsAnalyzed = mockChamadas.length;

    const digitalTransfers = mockChamadas.filter(chamada =>
        chamada.tags.some(tag => tag.name.toLowerCase().includes('transferência'))
    ).length;

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
                    <ChamadasTable data={mockChamadas} />
                </div>
            </main>
        </div>
    );
}