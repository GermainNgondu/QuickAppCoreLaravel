import { useState, useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useDebounce } from './useDebounce';

export function useDataTable({ endpoint, resourceKey, initialData = null }) {
    const queryClient = useQueryClient();
    
    // États locaux pour la table
    const [params, setParams] = useState({
        page: 1,
        search: '',
        sort: null,
        direction: 'asc',
        filters: {}
    });

    const [selectedIds, setSelectedIds] = useState([]);
    const debouncedSearch = useDebounce(params.search, 500);

    // Requête principale
    const { data, isFetching, refetch } = useQuery({
        queryKey: [resourceKey, params.page, debouncedSearch, params.sort, params.direction, params.filters],
        queryFn: async () => {
            const response = await axios.get(endpoint, {
                params: {
                    page: params.page,
                    search: debouncedSearch,
                    sort: params.sort,
                    direction: params.direction,
                    ...params.filters
                }
            });
            return response.data;
        },
        initialData: params.page === 1 && !debouncedSearch ? initialData : undefined,
        keepPreviousData: true,
        staleTime: 5000
    });

    // Handlers
    const handleSort = (column) => {
        setParams(prev => ({
            ...prev,
            sort: column,
            direction: prev.sort === column && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleSearch = (value) => {
        setParams(prev => ({ ...prev, search: value, page: 1 }));
    };

    const handleFilterChange = (newFilters) => {
        setParams(prev => ({ ...prev, filters: newFilters, page: 1 }));
    };

    const handlePageChange = (page) => {
        setParams(prev => ({ ...prev, page }));
    };

    const toggleSelection = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const selectAll = (allIds) => {
        setSelectedIds(prev => prev.length === allIds.length ? [] : allIds);
    };

    return {
        rows: data,
        isFetching,
        queryState: params,
        selectedIds,
        handleSort,
        handleSearch,
        handleFilterChange,
        handlePageChange,
        toggleSelection,
        selectAll,
        refresh: refetch
    };
}