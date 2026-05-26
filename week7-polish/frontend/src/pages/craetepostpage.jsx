import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ImageUpload from '../componenets/imageupload';

function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        if (image) formData.append('coverImage', image);

        try {
            await api.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/posts');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create New Post</h2>
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
                    <ImageUpload onImageSelect={setImage} />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish Post'}
                </button>
            </form>
        </div>
    );
}

export default CreatePostPage;