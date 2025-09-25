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
    hint?: string;
}

export interface Chamada {
    id: string;
    dataHora: string;
    pontuacao: number;
    tags: Tag[];
}

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
        header: () =>
            <span className='headerWithIcon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M231.88,175.08A56.26,56.26,0,0,1,176,224C96.6,224,32,159.4,32,80A56.26,56.26,0,0,1,80.92,24.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,117.39,96c-.18.27-.37.52-.57.77L96,121.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,231.88,175.08Z">
                    </path>
                </svg>
                ID da Chamada
            </span>,
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('dataHora', {
        header: () =>
            <span className='headerWithIcon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM128,168a16,16,0,1,1,16-16A16,16,0,0,1,128,168Zm80-88H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z">
                    </path>
                </svg>
                Data/Hora
            </span>,
        cell: info => info.getValue(),
        sortingFn: (rowA, rowB) => {
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

            const dateA = parseDateTime(rowA.getValue('dataHora'));
            const dateB = parseDateTime(rowB.getValue('dataHora'));

            return dateA.getTime() - dateB.getTime();
        },
    }),
    columnHelper.accessor('pontuacao', {
        header: () =>
            <span className='headerWithIcon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M221.87,90.86a4,4,0,0,0-6.17-.62l-75.42,75.42A8,8,0,0,1,129,154.35l92.7-92.69a8,8,0,0,0-11.32-11.32L197,63.73A112.05,112.05,0,0,0,22.34,189.25,16.09,16.09,0,0,0,37.46,200H218.53a16,16,0,0,0,15.11-10.71,112.28,112.28,0,0,0-11.77-98.43ZM57.44,166.41a8,8,0,0,1-6.25,9.43,7.89,7.89,0,0,1-1.6.16,8,8,0,0,1-7.83-6.41A88.06,88.06,0,0,1,143.59,65.38a8,8,0,0,1-2.82,15.75,72.07,72.07,0,0,0-83.33,85.28Z">
                    </path>
                </svg>
                Pontuação
            </span>,
        cell: info => (
            <span className={`pontuacao ${getPontuacaoClass(info.getValue())}`}>
                {info.getValue()}
                <span className='pontuacaoTotal'>/10</span>
            </span>
        ),
    }),
    columnHelper.accessor('tags', {
        header: () =>
            <span className='headerWithIcon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63ZM84,96A12,12,0,1,1,96,84,12,12,0,0,1,84,96Z">
                    </path>
                </svg>
                Tags
            </span>,
        cell: info => (
            <div className="tagsContainer">
                {info.getValue().map((tag, index) => (
                    <span key={index} className={`tag ${getTagClass(tag.type)}`} title={tag.hint || tag.name}>
                        {tag.name}
                    </span>
                ))}
            </div>
        ),
        enableSorting: false,
    }),
];

interface ChamadasTableProps {
    data: Chamada[];
}

export function ChamadasTable({ data }: ChamadasTableProps) {
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
        initialState: {
            pagination: {
                pageSize: 6,
            },
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
                    <div className="searchInputWrapper">
                        <input
                            type="text"
                            value={globalFilter ?? ''}
                            onChange={e => setGlobalFilter(e.target.value)}
                            placeholder="Buscar por ID da chamada..."
                            className="searchInput"
                        />
                    </div>
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
                                            asc: '▲',
                                            desc: '▼',
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
