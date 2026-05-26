import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useFetch from '../hooks/useFetch';
import ImageUpload from '../componenets/imageupload';

function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading: fetching } = useFetch(`/posts/${id}`);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (data?.data) {
            setTitle(data.data.title);
            setBody(data.data.body);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        if (image) formData.append('coverImage', image);

        try {
            await api.put(`/posts/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate(`/posts/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update post');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <p>Loading...</p>;

    return (
        <div>
            <h2>Edit Post</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        rows="10"
                    />
                </div>
                <div>
                    <ImageUpload
                        onImageSelect={setImage}
                        currentImage={data?.data?.coverImage}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}

export default EditPostPage;