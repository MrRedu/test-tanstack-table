import { useState } from 'react';

import {
  // createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';

import {
  Loader,
  NoResultsMessage,
  PageInput,
  PageSizeSelect,
  PaginationButton,
  PaginationContainer,
  StyledTable,
  TableWrapper,
  Td,
  Th,
  Tr,
} from './styled-components';

interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pageSizeOptions?: number[];
  globalFilterPlaceholder?: string;
  sortableColumns?: string[];
  isLoading?: boolean;
}

// Componente de tabla dinámico
export const DynamicTable = <T,>({
  data,
  columns,
  pageSizeOptions = [5, 10, 20, 30, 40, 50],
  globalFilterPlaceholder = 'Search...',
  sortableColumns = [],
  isLoading = false,
}: DynamicTableProps<T>) => {
  const [filterInput, setFilterInput] = useState<string>('');
  const [sorting, setSorting] = useState<SortingState>([]);

  // Crear la tabla
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filterInput,
      sorting,
    },
    onGlobalFilterChange: setFilterInput,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Mensaje de "No se encontraron resultados"
  const noResults = table.getRowModel().rows.length === 0 && !isLoading;

  return (
    <TableWrapper>
      <input
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        placeholder={globalFilterPlaceholder}
      />
      {isLoading ? (
        <Loader />
      ) : noResults ? (
        <NoResultsMessage>No se encontraron resultados.</NoResultsMessage>
      ) : (
        <StyledTable>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSortable = sortableColumns.includes(header.column.id);
                  return (
                    <Th
                      key={header.id}
                      $isSortable={isSortable}
                      onClick={
                        isSortable
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {(isSortable &&
                        {
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string]) ??
                        null}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </StyledTable>
      )}
      <PaginationContainer>
        <div>
          <PaginationButton
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </PaginationButton>
          <PaginationButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </PaginationButton>
          <PaginationButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </PaginationButton>
          <PaginationButton
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </PaginationButton>
        </div>
        <div>
          <span>
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <PageInput
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
            />
          </span>{' '}
          <PageSizeSelect
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </PageSizeSelect>
        </div>
      </PaginationContainer>
    </TableWrapper>
  );
};
