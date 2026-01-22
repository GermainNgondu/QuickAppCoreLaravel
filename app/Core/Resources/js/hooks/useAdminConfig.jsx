import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useAdminConfig() {
    return useQuery({
        queryKey: ['admin', 'bootstrap'],
        queryFn: async () => {
            const { data } = await axios.get('/api/admin/bootstrap');
            return data;
        },
        staleTime: Infinity,
    });
}