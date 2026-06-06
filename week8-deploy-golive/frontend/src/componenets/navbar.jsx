import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

function Navbar() {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            padding: '15px',
            backgroundColor: '#333',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <div>
                <Link to="/posts" style={{ color: 'white', margin: '10px' }}>Blog</Link>
                {token && (
                    <Link to="/create-post" style={{ color: 'white', margin: '10px' }}>New Post</Link>
                )}
            </div>
            <div>
                {token ? (
                    <>
                        <span style={{ margin: '10px' }}>Hello, {user?.name || 'User'}!</span>
                        <button onClick={handleLogout} style={{ margin: '10px' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', margin: '10px' }}>Login</Link>
                        <Link to="/register" style={{ color: 'white', margin: '10px' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;