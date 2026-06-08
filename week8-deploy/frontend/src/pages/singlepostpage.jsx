import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import useFetch from '../hooks/useFetch';
import useDelete from '../hooks/usedelete';

function SinglePostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data, loading, error, refetch } = useFetch(`/posts/${id}`);
    const { execute: deletePost, loading: deleting } = useDelete();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(`/posts/${id}`);
                navigate('/posts');
            } catch (err) {
                console.error('Delete error:', err);
            }
        }
    };

    if (loading) return <p>Loading post...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    const post = data?.data;
    const isAuthor = user?._id === post?.author?._id;

    return (
        <div>
            <h1>{post?.title}</h1>
            <p>By: {post?.author?.name}</p>
            <p>{post?.body}</p>

            {isAuthor && (
                <div>
                    <Link to={`/edit-post/${post?._id}`}>
                        <button>Edit Post</button>
                    </Link>
                    <button onClick={handleDelete} disabled={deleting}>
                        {deleting ? 'Deleting...' : 'Delete Post'}
                    </button>
                </div>
            )}

            <Link to="/posts">Back to Posts</Link>
        </div>
    );
}

export default SinglePostPage;