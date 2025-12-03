import { useState } from 'react';
import './DataTable.css';

function DataTable({ columns, data, onAction }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter data based on search term
    const filteredData = data.filter(row => {
        return columns.some(column => {
            const value = row[column.key];
            return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortColumn) return 0;

        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    // Paginate data
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const handleSort = (columnKey) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    return (
        <div className="data-table-container">
            <div className="data-table-header">
                <div className="data-table-search">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="search-input"
                    />
                </div>
                <div className="data-table-info">
                    Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedData.length)} de {sortedData.length}
                </div>
            </div>

            <div className="data-table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th
                                    key={column.key}
                                    onClick={() => column.sortable !== false && handleSort(column.key)}
                                    className={column.sortable !== false ? 'sortable' : ''}
                                >
                                    {column.label}
                                    {sortColumn === column.key && (
                                        <span className="sort-indicator">
                                            {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                                        </span>
                                    )}
                                </th>
                            ))}
                            {onAction && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (onAction ? 1 : 0)} className="no-data">
                                    No se encontraron resultados
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, index) => (
                                <tr key={row.id || index}>
                                    {columns.map(column => (
                                        <td key={column.key}>
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </td>
                                    ))}
                                    {onAction && (
                                        <td className="actions-cell">
                                            <button
                                                className="btn-action btn-action-view"
                                                onClick={() => onAction('view', row)}
                                                title="Ver detalles"
                                            >
                                                👁️
                                            </button>
                                            <button
                                                className="btn-action btn-action-edit"
                                                onClick={() => onAction('edit', row)}
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn-action btn-action-delete"
                                                onClick={() => onAction('delete', row)}
                                                title="Eliminar"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="data-table-pagination">
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ← Anterior
                    </button>
                    <div className="pagination-pages">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                className={`pagination-page ${page === currentPage ? 'active' : ''}`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente →
                    </button>
                </div>
            )}
        </div>
    );
}

export default DataTable;
