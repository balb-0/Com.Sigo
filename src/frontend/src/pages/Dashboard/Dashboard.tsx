import "./Dashboard.css";
import Header from "../../components/Header/Header";
import KpiCard from "../../components/KPICard/KPICard";
import { ChamadasTable, type Chamada } from "../../components/Table/Table.tsx";
import { DateFilter, type FilterType } from "../../components/DateFilter/DateFilter.tsx";
import { CallDetailsModal } from "../../components/CallDetailsModal/CallDetailsModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { listChamadas, type ChamadaResponse } from "../../lib/api";
import { formatChamadaRow } from "./helpers";

interface DashboardProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export function Dashboard({ currentPage, onNavigate }: DashboardProps) {
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");
  const [customStartTime, setCustomStartTime] = useState<string>("");
  const [customEndTime, setCustomEndTime] = useState<string>("");

  const [selectedChamada, setSelectedChamada] = useState<Chamada | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getScoreColor(score: number) {
    if (score < 4) return "var(--color-vermelho)";
    if (score < 7) return "var(--color-amarelo)";
    return "var(--color-verde)";
  }

  function getCriticalScoreColor(score: number) {
    if (score > 10) return "var(--color-vermelho)";
    if (score > 0) return "var(--color-amarelo)";
    return "var(--color-verde)";
  }

  const [chamadas, setChamadas] = useState<Chamada[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadChamadas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const rows: ChamadaResponse[] = await listChamadas();
      const mapped: Chamada[] = rows.map(formatChamadaRow);
      setChamadas(mapped);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar chamadas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChamadas();
  }, [loadChamadas]);

  const filteredChamadas = useMemo(() => {
    const parseDateTime = (dateStr: string) => {
      const [datePart, timePart] = dateStr.split(" ");
      const [day, month, year] = datePart.split("/");
      const [hour, minute] = timePart.split(":");

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
      case "thisYear":
        return chamadas.filter((chamada: Chamada) => {
          const chamadaDate = parseDateTime(chamada.dataHora);
          return chamadaDate.getFullYear() === currentYear;
        });

      case "thisMonth":
        return chamadas.filter((chamada: Chamada) => {
          const chamadaDate = parseDateTime(chamada.dataHora);
          return (
            chamadaDate.getFullYear() === currentYear &&
            chamadaDate.getMonth() === currentMonth
          );
        });

      case "custom":
        return chamadas.filter((chamada: Chamada) => {
          const chamadaDateTime = parseDateTime(chamada.dataHora);
          let passesDateFilter = true;
          let passesTimeFilter = true;

          if (customStartDate && customEndDate) {
            const filterStartDate = new Date(customStartDate);
            const filterEndDate = new Date(customEndDate);
            const chamadaDate = new Date(
              chamadaDateTime.getFullYear(),
              chamadaDateTime.getMonth(),
              chamadaDateTime.getDate()
            );

            passesDateFilter =
              chamadaDate >= filterStartDate && chamadaDate <= filterEndDate;
          }

          if (customStartTime && customEndTime) {
            const [startHour, startMinute] = customStartTime.split(":");
            const [endHour, endMinute] = customEndTime.split(":");

            const chamadaTimeInMinutes =
              chamadaDateTime.getHours() * 60 + chamadaDateTime.getMinutes();
            const startTimeInMinutes =
              Number(startHour) * 60 + Number(startMinute);
            const endTimeInMinutes = Number(endHour) * 60 + Number(endMinute);

            passesTimeFilter =
              chamadaTimeInMinutes >= startTimeInMinutes &&
              chamadaTimeInMinutes <= endTimeInMinutes;
          }

          if (!customStartDate && !customEndDate) passesDateFilter = true;
          if (!customStartTime && !customEndTime) passesTimeFilter = true;

          return passesDateFilter && passesTimeFilter;
        });

      default:
        return chamadas;
    }
  }, [currentFilter, customStartDate, customEndDate, customStartTime, customEndTime, chamadas]);

  const overallScore =
    filteredChamadas.length > 0
      ? Math.round(
          filteredChamadas.reduce(
            (acc: number, chamada: Chamada) => acc + chamada.pontuacao,
            0
          ) / filteredChamadas.length
        )
      : 0;

  const criticalAttendances = filteredChamadas.filter(
    (chamada: Chamada) => chamada.pontuacao < 4
  ).length;

  const callsAnalyzed = filteredChamadas.length;

  const digitalTransfers = filteredChamadas.filter((chamada: Chamada) =>
    chamada.tags.some((tag: { name: string; type: string }) =>
      tag.name.toLowerCase().includes("transferência")
    )
  ).length;

  const scoreColor = getScoreColor(overallScore);
  const criticalScoreColor = getCriticalScoreColor(criticalAttendances);

  const handleFilterChange = (
    filterType: FilterType,
    startDate?: string,
    endDate?: string,
    startTime?: string,
    endTime?: string
  ) => {
    setCurrentFilter(filterType);

    if (filterType === "custom") {
      setCustomStartDate(startDate || "");
      setCustomEndDate(endDate || "");
      setCustomStartTime(startTime || "");
      setCustomEndTime(endTime || "");
    } else {
      setCustomStartDate("");
      setCustomEndDate("");
      setCustomStartTime("");
      setCustomEndTime("");
    }
  };

  const handleRowClick = (chamadaId: string) => {
    const chamada = filteredChamadas.find((c) => c.id === chamadaId) ||
      chamadas.find((c) => c.id === chamadaId) || null;
    if (chamada) {
      setSelectedChamada(chamada);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedChamada(null);
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
            {loading ? (
              <div className="kpi-skeletons">
                <div className="skeleton skeleton-card"></div>
                <div className="skeleton skeleton-card"></div>
                <div className="skeleton skeleton-card"></div>
                <div className="skeleton skeleton-card"></div>
              </div>
            ) : (
              <>
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
                  valueId="critical-value"
                  valueStyle={{ color: criticalScoreColor }}
                  style={{ "--kpi-radial-color": criticalScoreColor } as React.CSSProperties}
                />
                <KpiCard
                  title="Transferências"
                  subtitle="Digital"
                  value={digitalTransfers.toString()}
                />
                <KpiCard
                  title="Chamadas"
                  subtitle="Analisadas"
                  value={callsAnalyzed.toString()}
                />
              </>
            )}
          </div>
        </div>
        <div>
          {error && (
            <div style={{ color: 'var(--color-vermelho)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>Erro: {error}</span>
              <button onClick={loadChamadas}>Tentar novamente</button>
            </div>
          )}
          {loading ? (
            <div className="table-skeleton">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton skeleton-row"></div>
              ))}
            </div>
          ) : (
            <ChamadasTable data={filteredChamadas} onRowClick={handleRowClick} />
          )}
        </div>
      </main>

      <CallDetailsModal
        chamada={selectedChamada}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
