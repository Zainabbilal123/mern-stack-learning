import { useState } from 'react';
import api from '../api/axios';

function usePost(url, method = 'post') {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = async (body) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api[method](url, body);
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || 'Request failed';
            setError(message);
            throw new Error(message);
        } finally {
            setLoading(false);
        }
    };

    return { execute, loading, error };
}

export default usePost;