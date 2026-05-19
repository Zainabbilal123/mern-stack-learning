import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import SearchBar from '../componenets/searchbar';
import Pagination from '../componenets/pagination';

function PostsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [url, setUrl] = useState('/posts?page=1&limit=6');

    useEffect(() => {
        setUrl(`/posts?page=${page}&limit=6&search=${search}`);
    }, [page, search]);

    const { data, loading, error } = useFetch(url);

    const handleSearch = useCallback((term) => {
        setSearch(term);
        setPage(1);
    }, []);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    const posts = data?.data || [];
    const pagination = data?.pagination || { total: 0, pages: 1, page: 1 };

    return (
        <div>
            <h1>Blog Posts</h1>
            <SearchBar onSearch={handleSearch} />
            <Link to="/create-post">Create New Post</Link>

            {posts.map(post => (
                <div key={post._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
                    {post.coverImage && (
                        <img src={`http://localhost:3000${post.coverImage}`} alt={post.title} style={{ width: '100px' }} />
                    )}
                    <h2>{post.title}</h2>
                    <p>By: {post.author?.name}</p>
                    <p>{post.body.substring(0, 150)}...</p>
                    <Link to={`/posts/${post._id}`}>Read More</Link>
                </div>
            ))}

            <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={setPage}
            />
        </div>
    );
}

export default PostsPage;