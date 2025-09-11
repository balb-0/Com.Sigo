import './DateFilter.css';
import { useState } from 'react';

export type FilterType = 'all' | 'thisYear' | 'thisMonth' | 'custom';

export interface DateFilterProps {
    onFilterChange: (filterType: FilterType, startDate?: string, endDate?: string) => void;
}

export function DateFilter({ onFilterChange }: DateFilterProps) {
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilterChange = (filterType: FilterType) => {
        setSelectedFilter(filterType);

        if (filterType === 'custom') {
            if (startDate && endDate) {
                onFilterChange(filterType, startDate, endDate);
            }
        } else {
            onFilterChange(filterType);
        }
    };

    const handleCustomDateApply = () => {
        if (startDate && endDate) {
            onFilterChange('custom', startDate, endDate);
        }
    };

    return (
        <div className="date-filter-container">
            <h3 className="filter-title">Filtrar por período:</h3>
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
                    onClick={() => setSelectedFilter('custom')}
                >
                    Período Customizado
                </button>
            </div>

            {selectedFilter === 'custom' && (
                <div className="custom-date-inputs">
                    <div className="date-input-group">
                        <label>Data inicial:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="date-input"
                        />
                    </div>
                    <div className="date-input-group">
                        <label>Data final:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="date-input"
                        />
                    </div>
                    <button
                        onClick={handleCustomDateApply}
                        className="apply-btn"
                        disabled={!startDate || !endDate}
                    >
                        Aplicar
                    </button>
                </div>
            )}
        </div>
    );
}