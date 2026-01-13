import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { preparePayload } from '../utils/formUtils';

export function useDynamicForm({ initialValues = {}, submitUrl, method = 'POST', onSuccess }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm({
        defaultValues: initialValues
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const cleanedPayload = preparePayload(data);
        try {
            const response = await axios({
                method: method,
                url: submitUrl,
                data: cleanedPayload
            });

            toast.success(response.data.message || "Enregistré avec succès");
            
            if (onSuccess) onSuccess(response.data);
            
            // Redirection si fournie par le backend
            if (response.data.redirect) {
                window.location.href = response.data.redirect;
            }
        } catch (error) {
            if (error.response?.status === 422) {
                // Injection automatique des erreurs Laravel dans React Hook Form
                const errors = error.response.data.errors;
                Object.keys(errors).forEach(key => {
                    methods.setError(key, { type: 'manual', message: errors[key][0] });
                });
                toast.error("Veuillez vérifier les erreurs dans le formulaire.");
            } else {
                toast.error("Une erreur inattendue est survenue.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        methods,
        onSubmit: methods.handleSubmit(onSubmit),
        isSubmitting
    };
}