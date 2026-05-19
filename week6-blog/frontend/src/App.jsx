import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componenets/navbar';
import ProtectedRoute from './componenets/protectedroutes';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import DashboardPage from './pages/dashboardpage';
import PostsPage from './pages/postpage';
import SinglePostPage from './pages/singlepostpage';
import CreatePostPage from './pages/craetepostpage';
import EditPostPage from './pages/editpostpage';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/posts" element={<PostsPage />} />
                    <Route path="/posts/:id" element={<SinglePostPage />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/create-post"
                        element={
                            <ProtectedRoute>
                                <CreatePostPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/edit-post/:id"
                        element={
                            <ProtectedRoute>
                                <EditPostPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/posts" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;