import './DateFilter.css';
import { useState, useEffect } from 'react';

export type FilterType = 'all' | 'thisYear' | 'thisMonth' | 'custom';

export interface DateFilterProps {
    onFilterChange: (
        filterType: FilterType,
        startDate?: string,
        endDate?: string,
        startTime?: string,
        endTime?: string
    ) => void;
}

export function DateFilter({ onFilterChange }: DateFilterProps) {
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleFilterChange = (filterType: FilterType) => {
        setSelectedFilter(filterType);

        if (filterType === 'custom') {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
            onFilterChange(filterType);
        }
    };

    const handleCustomDateApply = () => {
        onFilterChange('custom', startDate, endDate, startTime, endTime);
        setIsModalOpen(false);
    };

    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
        setStartTime('');
        setEndTime('');
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (selectedFilter === 'custom') {
            setSelectedFilter('all');
            onFilterChange('all');
        }
    };

    const hasAnyFilter = startDate || endDate || startTime || endTime;

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && hasAnyFilter) {
            event.preventDefault();
            handleCustomDateApply();
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            const handleGlobalKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Enter' && hasAnyFilter) {
                    event.preventDefault();
                    handleCustomDateApply();
                }
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeModal();
                }
            };

            document.addEventListener('keydown', handleGlobalKeyDown);
            return () => {
                document.removeEventListener('keydown', handleGlobalKeyDown);
            };
        }
    }, [isModalOpen, hasAnyFilter]);

    return (
        <>
            <div className="date-filter-container">
                <h3 className="filter-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M40,88H73a32,32,0,0,0,62,0h81a8,8,0,0,0,0-16H135a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16Zm64-24A16,16,0,1,1,88,80,16,16,0,0,1,104,64ZM216,168H199a32,32,0,0,0-62,0H40a8,8,0,0,0,0,16h97a32,32,0,0,0,62,0h17a8,8,0,0,0,0-16Zm-48,24a16,16,0,1,1,16-16A16,16,0,0,1,168,192Z"></path>
                    </svg>
                    Filtrar por período:
                </h3>
                <div className="filter-options">
                    <button
                        className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        Tudo
                    </button>
                    <button
                        className={`filter-btn ${selectedFilter === 'thisYear' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('thisYear')}
                    >
                        Este Ano
                    </button>
                    <button
                        className={`filter-btn ${selectedFilter === 'thisMonth' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('thisMonth')}
                    >
                        Este Mês
                    </button>
                    <button
                        className={`filter-btn ${selectedFilter === 'custom' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('custom')}
                    >
                        Período Customizado
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <>
                    <div className="modal-overlay" onClick={closeModal}></div>

                    <div className="modal-container" onKeyDown={handleKeyDown}>
                        <div className="modal-header">
                            <h2 className="modal-title">
                                🔧 Configurar Filtros Customizados
                            </h2>
                            <button className="modal-close-btn" onClick={closeModal}>
                                ✕
                            </button>
                        </div>

                        <div className="modal-content">
                            <div className="date-time-section">
                                <h4 className="section-title">📅 Filtro por Data (Opcional)</h4>
                                <div className="date-inputs-row">
                                    <div className="date-input-group">
                                        <label>Data inicial:</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="date-input"
                                        />
                                    </div>
                                    <div className="date-input-group">
                                        <label>Data final:</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="date-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="date-time-section">
                                <h4 className="section-title">🕒 Filtro por Horário (Opcional)</h4>
                                <div className="date-inputs-row">
                                    <div className="date-input-group">
                                        <label>Horário inicial:</label>
                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="date-input"
                                        />
                                    </div>
                                    <div className="date-input-group">
                                        <label>Horário final:</label>
                                        <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="date-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-hint">
                                💡 <strong>Dica:</strong> Pressione <kbd>Enter</kbd> para aplicar ou <kbd>Esc</kbd> para cancelar
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                onClick={clearFilters}
                                className="clear-btn"
                            >
                                Limpar Tudo
                            </button>
                            <div className="modal-actions">
                                <button
                                    onClick={closeModal}
                                    className="cancel-btn"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCustomDateApply}
                                    className="apply-btn"
                                    disabled={!hasAnyFilter}
                                >
                                    Aplicar Filtros
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}