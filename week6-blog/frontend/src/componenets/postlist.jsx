import useFetch from '../hooks/usefetch';
import useDelete from '../hooks/usedelete';

function PostsList() {
    const { data, loading, error, refetch } = useFetch('/posts');
    const { execute: deletePost, loading: deleting } = useDelete();

    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure?')) {
            await deletePost(`/posts/${postId}`);
            refetch();
        }
    };

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            {data?.data?.map(post => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <button onClick={() => handleDelete(post._id)} disabled={deleting}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default PostsList;