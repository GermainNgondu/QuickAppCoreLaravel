import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner'; // Ou votre librairie de notification préférée

export function useMedia(filters = {}) {
    const queryClient = useQueryClient();

    // 1. RÉCUPÉRATION DE LA BIBLIOTHÈQUE (Pagination infinie)
    const libraryQuery = useInfiniteQuery({
        queryKey: ['media', 'library', filters],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get('/admin/media', {
                params: { ...filters, page: pageParam }
            });
            return data;
        },
        getNextPageParam: (lastPage) => {
            return lastPage.next_page_url ? lastPage.current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });

    // 2. UPLOAD DE FICHIER LOCAL
    const uploadMutation = useMutation({
        mutationFn: async (formData) => {
            const { data } = await axios.post('/admin/media/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['media', 'library']);
            toast.success("Fichier importé avec succès");
        },
        onError: () => toast.error("Erreur lors de l'upload")
    });

    // 3. IMPORTATION (URL, YouTube, Unsplash, IA)
    const importMutation = useMutation({
        mutationFn: async (payload) => {
            const { data } = await axios.post('/admin/media/import', payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['media', 'library']);
            toast.success("Média ajouté à la bibliothèque");
        }
    });

    // 4. MISE À JOUR (SEO / Nom / Alt)
    const updateMutation = useMutation({
        mutationFn: async ({ id, ...payload }) => {
            const { data } = await axios.put(`/admin/media/${id}`, payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['media', 'library']);
            toast.success("Modifications enregistrées");
        }
    });

    // 5. DÉPLACEMENT ENTRE COLLECTIONS
    const moveCollectionMutation = useMutation({
        mutationFn: async ({ ids, collection }) => {
            const { data } = await axios.post('/admin/media/move', { ids, collection });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['media', 'library']);
            toast.success("Médias déplacés");
        }
    });

    // 6. SUPPRESSION GROUPÉE (Soft Delete / Corbeille)
    const bulkDeleteMutation = useMutation({
        mutationFn: async (ids) => {
            const { data } = await axios.delete('/admin/media/bulk-delete', { data: { ids } });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['media', 'library']);
            toast.success("Éléments déplacés vers la corbeille");
        }
    });

    // 7. RESTAURATION DEPUIS LA CORBEILLE
    const restoreMutation = useMutation({
        mutationFn: async (ids) => {
            const { data } = await axios.post('/admin/media/restore', { ids });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['media', 'library']);
            toast.success("Éléments restaurés");
        }
    });

    return {
        libraryQuery,
        uploadMutation,
        importMutation,
        updateMutation,
        moveCollectionMutation,
        bulkDeleteMutation,
        restoreMutation,
    };
}