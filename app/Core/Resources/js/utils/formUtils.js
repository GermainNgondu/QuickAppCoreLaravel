/**
 * Transforme récursivement les objets médias en IDs pour le backend.
 */
export const preparePayload = (data) => {
    const payload = Array.isArray(data) ? [] : {};

    for (const key in data) {
        const value = data[key];


        if (value && typeof value === 'object' && value.id && (value.url || value.thumb_url)) {
            payload[key] = value.id;
        } 

        else if (Array.isArray(value)) {
            payload[key] = value.map(item => 
                (item && typeof item === 'object' && item.id) ? item.id : item
            );
        }

        else if (value && typeof value === 'object' && !(value instanceof File)) {
            payload[key] = preparePayload(value);
        } 

        else {
            payload[key] = value;
        }
    }

    return payload;
};