import { useState } from 'react';
import api from '../api/axios';

function useDelete() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.delete(url);
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || 'Delete failed';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { execute, loading, error };
}

export default useDelete;