import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

export function useMediaCollections() {
    const queryClient = useQueryClient();
    const QUERY_KEY = ['media-collections'];

    // READ
    const { 
        data: collections = [], 
        isLoading, 
        isError 
    } = useQuery({
        queryKey: QUERY_KEY,
        queryFn: async () => {
            const { data } = await axios.get('/api/media/collections');
            return data;
        },
        staleTime: 60 * 1000,
    });

    // CREATE
    const createMutation = useMutation({
        mutationFn: async (newCollection) => {
            const { data } = await axios.post('/api/media/collections', newCollection);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEY);
            toast.success("Collection créée avec succès");
        },
        onError: (error) => {
            toast.error("Erreur lors de la création : " + error.response?.data?.message);
        }
    });

    // UPDATE
    const updateMutation = useMutation({
        mutationFn: async ({ id, ...data }) => {
            const { data: response } = await axios.put(`/api/media/collections/${id}`, data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEY);
            toast.success("Collection mise à jour");
        },
        onError: (error) => {
            toast.error("Impossible de modifier : " + error.response?.data?.message);
        }
    });

    // DELETE
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`/api/media/collections/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(QUERY_KEY);
            toast.success("Collection supprimée");
        },
        onError: (error) => {
            toast.error("Impossible de supprimer : " + error.response?.data?.message);
        }
    });

    return {
        collections,
        isLoading,
        isError,
        createCollection: createMutation.mutate,
        isCreating: createMutation.isPending,
        updateCollection: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
        deleteCollection: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
    };
}