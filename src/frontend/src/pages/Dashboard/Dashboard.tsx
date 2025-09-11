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
    const [customStartTime, setCustomStartTime] = useState<string>('');
    const [customEndTime, setCustomEndTime] = useState<string>('');

    function getScoreColor(score: number) {
        if (score < 4) return 'var(--color-vermelho)';
        if (score < 7) return 'var(--color-amarelo)';
        return 'var(--color-verde)';
    }

    const mockChamadas: Chamada[] = [
        { id: '1234', dataHora: '10/09/25 14:30', pontuacao: 8, tags: [{ name: 'Resolvido', type: 'positivo' }, { name: 'Elogio', type: 'positivo' }] },
        { id: '1235', dataHora: '15/09/25 14:25', pontuacao: 3, tags: [{ name: 'Sentimento Negativo', type: 'negativo' }, { name: 'Script Incompleto', type: 'negativo' }] },
        { id: '1236', dataHora: '20/09/25 14:20', pontuacao: 6, tags: [{ name: 'Transferência', type: 'neutro' }, { name: 'Resolvido', type: 'positivo' }] },
        { id: '1237', dataHora: '05/08/25 14:15', pontuacao: 9, tags: [{ name: 'Elogio', type: 'positivo' }] },
        { id: '1238', dataHora: '18/08/25 14:10', pontuacao: 2, tags: [{ name: 'Reclamação Formal', type: 'negativo' }] },
        { id: '1239', dataHora: '25/08/25 14:05', pontuacao: 5, tags: [{ name: 'Transferência', type: 'neutro' }] },
        { id: '1240', dataHora: '12/07/25 14:00', pontuacao: 7, tags: [{ name: 'Resolvido', type: 'positivo' }, { name: 'Cortesia', type: 'positivo' }] },
        { id: '1241', dataHora: '30/07/25 13:55', pontuacao: 4, tags: [{ name: 'Dúvidas Técnicas', type: 'neutro' }] },
        { id: '1242', dataHora: '10/12/24 13:50', pontuacao: 10, tags: [{ name: 'Excelente Atendimento', type: 'positivo' }, { name: 'Elogio', type: 'positivo' }] },
        { id: '1243', dataHora: '24/12/24 13:45', pontuacao: 1, tags: [{ name: 'Cliente Insatisfeito', type: 'negativo' }, { name: 'Demora', type: 'negativo' }] },
        { id: '1244', dataHora: '15/06/24 13:40', pontuacao: 8, tags: [{ name: 'Transferência', type: 'neutro' }, { name: 'Resolvido', type: 'positivo' }] },
        { id: '1245', dataHora: '28/06/24 13:35', pontuacao: 6, tags: [{ name: 'Informações Claras', type: 'positivo' }] },
        { id: '1246', dataHora: '08/03/23 13:30', pontuacao: 3, tags: [{ name: 'Script Incompleto', type: 'negativo' }, { name: 'Transferência', type: 'neutro' }] },
        { id: '1247', dataHora: '22/03/23 13:25', pontuacao: 9, tags: [{ name: 'Problema Resolvido', type: 'positivo' }, { name: 'Rapidez', type: 'positivo' }] },
        { id: '1248', dataHora: '14/11/23 13:20', pontuacao: 5, tags: [{ name: 'Aguardando Retorno', type: 'neutro' }] },
        { id: '1249', dataHora: '11/09/25 08:15', pontuacao: 7, tags: [{ name: 'Resolvido', type: 'positivo' }, { name: 'Rapidez', type: 'positivo' }] },
        { id: '1250', dataHora: '11/09/25 09:45', pontuacao: 6, tags: [{ name: 'Informações Claras', type: 'positivo' }] },
        { id: '1251', dataHora: '11/09/25 11:30', pontuacao: 4, tags: [{ name: 'Dúvidas Técnicas', type: 'neutro' }] },
        { id: '1252', dataHora: '11/09/25 16:20', pontuacao: 9, tags: [{ name: 'Excelente Atendimento', type: 'positivo' }] },
        { id: '1253', dataHora: '11/09/25 18:50', pontuacao: 5, tags: [{ name: 'Transferência', type: 'neutro' }] },
        { id: '1254', dataHora: '11/09/25 20:35', pontuacao: 8, tags: [{ name: 'Cortesia', type: 'positivo' }, { name: 'Resolvido', type: 'positivo' }] },
        { id: '1255', dataHora: '11/09/25 22:10', pontuacao: 3, tags: [{ name: 'Script Incompleto', type: 'negativo' }] },
        { id: '1256', dataHora: '10/09/25 07:30', pontuacao: 6, tags: [{ name: 'Informações Claras', type: 'positivo' }] },
        { id: '1257', dataHora: '10/09/25 23:45', pontuacao: 2, tags: [{ name: 'Cliente Insatisfeito', type: 'negativo' }, { name: 'Demora', type: 'negativo' }] },
        { id: '1258', dataHora: '09/09/25 12:00', pontuacao: 10, tags: [{ name: 'Elogio', type: 'positivo' }, { name: 'Problema Resolvido', type: 'positivo' }] }
    ];

    const filteredChamadas = useMemo(() => {
        const parseDateTime = (dateStr: string) => {
            const [datePart, timePart] = dateStr.split(' ');
            const [day, month, year] = datePart.split('/');
            const [hour, minute] = timePart.split(':');

            return new Date(
                Number(`20${year}`),
                Number(month) - 1,
                Number(day),
                Number(hour),
                Number(minute)
            );
        };

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        switch (currentFilter) {
            case 'thisYear':
                return mockChamadas.filter((chamada: Chamada) => {
                    const chamadaDate = parseDateTime(chamada.dataHora);
                    return chamadaDate.getFullYear() === currentYear;
                });

            case 'thisMonth':
                return mockChamadas.filter((chamada: Chamada) => {
                    const chamadaDate = parseDateTime(chamada.dataHora);
                    return chamadaDate.getFullYear() === currentYear &&
                        chamadaDate.getMonth() === currentMonth;
                });

            case 'custom':
                return mockChamadas.filter((chamada: Chamada) => {
                    const chamadaDateTime = parseDateTime(chamada.dataHora);
                    let passesDateFilter = true;
                    let passesTimeFilter = true;

                    if (customStartDate && customEndDate) {
                        const filterStartDate = new Date(customStartDate);
                        const filterEndDate = new Date(customEndDate);
                        const chamadaDate = new Date(chamadaDateTime.getFullYear(), chamadaDateTime.getMonth(), chamadaDateTime.getDate());

                        passesDateFilter = chamadaDate >= filterStartDate && chamadaDate <= filterEndDate;
                    }

                    if (customStartTime && customEndTime) {
                        const [startHour, startMinute] = customStartTime.split(':');
                        const [endHour, endMinute] = customEndTime.split(':');

                        const chamadaTimeInMinutes = chamadaDateTime.getHours() * 60 + chamadaDateTime.getMinutes();
                        const startTimeInMinutes = Number(startHour) * 60 + Number(startMinute);
                        const endTimeInMinutes = Number(endHour) * 60 + Number(endMinute);

                        passesTimeFilter = chamadaTimeInMinutes >= startTimeInMinutes && chamadaTimeInMinutes <= endTimeInMinutes;
                    }

                    if (!customStartDate && !customEndDate) passesDateFilter = true;
                    if (!customStartTime && !customEndTime) passesTimeFilter = true;

                    return passesDateFilter && passesTimeFilter;
                });

            default:
                return mockChamadas;
        }
    }, [currentFilter, customStartDate, customEndDate, customStartTime, customEndTime, mockChamadas]);

    const overallScore = filteredChamadas.length > 0 ? Math.round(
        filteredChamadas.reduce((acc: number, chamada: Chamada) => acc + chamada.pontuacao, 0) / filteredChamadas.length
    ) : 0;

    const criticalAttendances = filteredChamadas.filter((chamada: Chamada) => chamada.pontuacao < 4).length;

    const callsAnalyzed = filteredChamadas.length;

    const digitalTransfers = filteredChamadas.filter((chamada: Chamada) =>
        chamada.tags.some((tag: { name: string; type: string }) => tag.name.toLowerCase().includes('transferência'))
    ).length;

    const scoreColor = getScoreColor(overallScore);

    const handleFilterChange = (filterType: FilterType, startDate?: string, endDate?: string, startTime?: string, endTime?: string) => {
        setCurrentFilter(filterType);

        if (filterType === 'custom') {
            setCustomStartDate(startDate || '');
            setCustomEndDate(endDate || '');
            setCustomStartTime(startTime || '');
            setCustomEndTime(endTime || '');
        } else {
            setCustomStartDate('');
            setCustomEndDate('');
            setCustomStartTime('');
            setCustomEndTime('');
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
                    <ChamadasTable data={filteredChamadas} />
                </div>
            </main>
        </div>
    );
}