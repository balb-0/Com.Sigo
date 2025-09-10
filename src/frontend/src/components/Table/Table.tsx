import './Table.css';
import { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import type { SortingState } from '@tanstack/react-table';

export type TagType = 'positivo' | 'negativo' | 'neutro';

export interface Tag {
    name: string;
    type: TagType;
}

export interface Chamada {
    id: string;
    dataHora: string;
    pontuacao: number;
    tags: Tag[];
}

const mockData: Chamada[] = [
    { id: '1234', dataHora: '10/09/25 14:30', pontuacao: 8, tags: [{ name: 'Resolvido', type: 'positivo' }, { name: 'Elogio', type: 'positivo' }] },
    { id: '1235', dataHora: '10/09/25 14:25', pontuacao: 3, tags: [{ name: 'Sentimento Negativo', type: 'negativo' }, { name: 'Script Incompleto', type: 'negativo' }] },
    { id: '1236', dataHora: '10/09/25 14:20', pontuacao: 6, tags: [{ name: 'Transferência', type: 'neutro' }, { name: 'Resolvido', type: 'positivo' }] },
    { id: '1237', dataHora: '10/09/25 14:15', pontuacao: 9, tags: [{ name: 'Elogio', type: 'positivo' }] },
    { id: '1238', dataHora: '10/09/25 14:10', pontuacao: 2, tags: [{ name: 'Reclamação Formal', type: 'negativo' }] },
    { id: '1239', dataHora: '10/09/25 14:05', pontuacao: 5, tags: [{ name: 'Transferência', type: 'neutro' }] },
];

const columnHelper = createColumnHelper<Chamada>();

const getPontuacaoClass = (pontuacao: number) => {
    if (pontuacao >= 7) return "pontuacaoAlta";
    if (pontuacao >= 4) return "pontuacaoMedia";
    return "pontuacaoBaixa";
};

const getTagClass = (type: Tag['type']) => {
    switch (type) {
        case 'positivo':
            return "tagPositivo";
        case 'negativo':
            return "tagNegativo";
        case 'neutro':
            return "tagNeutro";
        default:
            return '';
    }
};

const columns = [
    columnHelper.accessor('id', {
        header: () => <span>ID da Chamada</span>,
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('dataHora', {
        header: () => <span>Data/Hora</span>,
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('pontuacao', {
        header: () => <span>Pontuação</span>,
        cell: info => (
            <span className={`pontuacao ${getPontuacaoClass(info.getValue())}`}>
                {info.getValue()}
                <span className='pontuacaoTotal'>/10</span>
            </span>
        ),
    }),
    columnHelper.accessor('tags', {
        header: () => <span>Tags</span>,
        cell: info => (
            <div className="tagsContainer">
                {info.getValue().map((tag, index) => (
                    <span key={index} className={`tag ${getTagClass(tag.type)}`}>
                        {tag.name}
                    </span>
                ))}
            </div>
        ),
        enableSorting: false,
    }),
];

export function ChamadasTable() {
    const [data] = useState(() => [...mockData]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const memoizedColumns = useMemo(() => columns, []);

    const table = useReactTable({
        data,
        columns: memoizedColumns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleRowClick = (chamadaId: string) => {
        console.log(`Abrir modal para a chamada ID: ${chamadaId}`);
        alert(`Abrir modal para a chamada ID: ${chamadaId}`);
    };

    return (
        <>
            <div className="tableContainer">
                <div className="searchContainer">
                    <h3 className="page-titles">Análise de Chamadas Recentes</h3>
                    <input
                        type="text"
                        value={globalFilter ?? ''}
                        onChange={e => setGlobalFilter(e.target.value)}
                        placeholder="Buscar por ID da chamada..."
                        className="searchInput"
                    />
                </div>

                <div className="table">
                    <div className="tableHeader">
                        {table.getHeaderGroups().map(headerGroup => (
                            <div key={headerGroup.id} className="headerRow">
                                {headerGroup.headers.map(header => (
                                    <div
                                        key={header.id}
                                        className="headerCell"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{
                                            asc: ' ▲',
                                            desc: ' ▼',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="tableBody">
                        {table.getRowModel().rows.map(row => (
                            <div
                                key={row.id}
                                className="bodyRow"
                                onClick={() => handleRowClick(row.original.id)}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <div key={cell.id} className="bodyCell">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pagination">
                    <span>
                        Exibindo{' '}
                        {table.getState().pagination.pageIndex + 1} de{' '}
                        {table.getPageCount()}
                    </span>
                    <div id="buttons">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
