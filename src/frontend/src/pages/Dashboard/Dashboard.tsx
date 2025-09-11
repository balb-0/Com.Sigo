import './Dashboard.css';
import Header from "../../components/Header/Header";
import KpiCard from '../../components/KPICard/KPICard';
import { ChamadasTable, type Chamada } from '../../components/Table/Table.tsx';
import { DateFilter, type FilterType } from '../../components/DateFilter/DateFilter.tsx';
import { useState, useMemo } from 'react';

interface DashboardProps {
    currentPage?: string;
    onNavigate?: (page: string) => void;
}

export function Dashboard({ currentPage, onNavigate }: DashboardProps) {

    const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
    const [customStartDate, setCustomStartDate] = useState<string>('');
    const [customEndDate, setCustomEndDate] = useState<string>('');

    function getScoreColor(score: number) {
        if (score < 4) return 'var(--color-vermelho)';
        if (score < 7) return 'var(--color-amarelo)';
        return 'var(--color-verde)';
    }

    const mockChamadas: Chamada[] = [
        // Chamadas de 2025 - Setembro (mês atual)
        { id: '1234', dataHora: '10/09/25 14:30', pontuacao: 8, tags: [{ name: 'Resolvido', type: 'positivo' }, { name: 'Elogio', type: 'positivo' }] },
        { id: '1235', dataHora: '15/09/25 14:25', pontuacao: 3, tags: [{ name: 'Sentimento Negativo', type: 'negativo' }, { name: 'Script Incompleto', type: 'negativo' }] },
        { id: '1236', dataHora: '20/09/25 14:20', pontuacao: 6, tags: [{ name: 'Transferência', type: 'neutro' }, { name: 'Resolvido', type: 'positivo' }] },

        // Chamadas de 2025 - Agosto
        { id: '1237', dataHora: '05/08/25 14:15', pontuacao: 9, tags: [{ name: 'Elogio', type: 'positivo' }] },
        { id: '1238', dataHora: '18/08/25 14:10', pontuacao: 2, tags: [{ name: 'Reclamação Formal', type: 'negativo' }] },
        { id: '1239', dataHora: '25/08/25 14:05', pontuacao: 5, tags: [{ name: 'Transferência', type: 'neutro' }] },

        // Chamadas de 2025 - Julho
        { id: '1240', dataHora: '12/07/25 14:00', pontuacao: 7, tags: [{ name: 'Resolvido', type: 'positivo' }, { name: 'Cortesia', type: 'positivo' }] },
        { id: '1241', dataHora: '30/07/25 13:55', pontuacao: 4, tags: [{ name: 'Dúvidas Técnicas', type: 'neutro' }] },

        // Chamadas de 2024 - Dezembro
        { id: '1242', dataHora: '10/12/24 13:50', pontuacao: 10, tags: [{ name: 'Excelente Atendimento', type: 'positivo' }, { name: 'Elogio', type: 'positivo' }] },
        { id: '1243', dataHora: '24/12/24 13:45', pontuacao: 1, tags: [{ name: 'Cliente Insatisfeito', type: 'negativo' }, { name: 'Demora', type: 'negativo' }] },

        // Chamadas de 2024 - Junho
        { id: '1244', dataHora: '15/06/24 13:40', pontuacao: 8, tags: [{ name: 'Transferência', type: 'neutro' }, { name: 'Resolvido', type: 'positivo' }] },
        { id: '1245', dataHora: '28/06/24 13:35', pontuacao: 6, tags: [{ name: 'Informações Claras', type: 'positivo' }] },

        // Chamadas de 2023 - Março
        { id: '1246', dataHora: '08/03/23 13:30', pontuacao: 3, tags: [{ name: 'Script Incompleto', type: 'negativo' }, { name: 'Transferência', type: 'neutro' }] },
        { id: '1247', dataHora: '22/03/23 13:25', pontuacao: 9, tags: [{ name: 'Problema Resolvido', type: 'positivo' }, { name: 'Rapidez', type: 'positivo' }] },

        // Chamadas de 2023 - Novembro
        { id: '1248', dataHora: '14/11/23 13:20', pontuacao: 5, tags: [{ name: 'Aguardando Retorno', type: 'neutro' }] }
    ];

    const filteredChamadas = useMemo(() => {
        const parseDate = (dateStr: string) => {
            const [datePart] = dateStr.split(' '); // Removido timePart não usado
            const [day, month, year] = datePart.split('/');
            return new Date(Number(`20${year}`), Number(month) - 1, Number(day));
        };

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        switch (currentFilter) {
            case 'thisYear':
                return mockChamadas.filter((chamada: Chamada) => { // Tipando explicitamente
                    const chamadaDate = parseDate(chamada.dataHora);
                    return chamadaDate.getFullYear() === currentYear;
                });

            case 'thisMonth':
                return mockChamadas.filter((chamada: Chamada) => { // Tipando explicitamente
                    const chamadaDate = parseDate(chamada.dataHora);
                    return chamadaDate.getFullYear() === currentYear &&
                        chamadaDate.getMonth() === currentMonth;
                });

            case 'custom':
                if (!customStartDate || !customEndDate) return mockChamadas; // Usando mockChamadas
                const startDate = new Date(customStartDate);
                const endDate = new Date(customEndDate);
                return mockChamadas.filter((chamada: Chamada) => { // Tipando explicitamente
                    const chamadaDate = parseDate(chamada.dataHora);
                    return chamadaDate >= startDate && chamadaDate <= endDate;
                });

            default: // 'all'
                return mockChamadas; // Usando mockChamadas
        }
    }, [currentFilter, customStartDate, customEndDate, mockChamadas]); // Dependência corrigida

    // Calcular KPIs baseados nos dados filtrados
    const overallScore = filteredChamadas.length > 0 ? Math.round(
        filteredChamadas.reduce((acc: number, chamada: Chamada) => acc + chamada.pontuacao, 0) / filteredChamadas.length
    ) : 0;

    const criticalAttendances = filteredChamadas.filter((chamada: Chamada) => chamada.pontuacao < 4).length;

    const callsAnalyzed = filteredChamadas.length;

    const digitalTransfers = filteredChamadas.filter((chamada: Chamada) =>
        chamada.tags.some((tag: { name: string; type: string }) => tag.name.toLowerCase().includes('transferência'))
    ).length;

    const scoreColor = getScoreColor(overallScore);

    const handleFilterChange = (filterType: FilterType, startDate?: string, endDate?: string) => {
        setCurrentFilter(filterType);
        if (filterType === 'custom' && startDate && endDate) {
            setCustomStartDate(startDate);
            setCustomEndDate(endDate);
        }
    };

    return (
        <div className="dashboard-container">
            <Header currentPage={currentPage} onNavigate={onNavigate} />
            <main>
                <div>
                    <div className="head-main">
                        <h1 className="page-titles">Dashboard de Qualidade</h1>
                        <DateFilter onFilterChange={handleFilterChange} />
                    </div>
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
                    <ChamadasTable data={filteredChamadas} /> {/* Corrigido: passando dados filtrados */}
                </div>
            </main>
        </div>
    );
}