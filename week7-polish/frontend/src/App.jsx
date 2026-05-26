import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componenets/navbar'
import ProtectedRoute from './componenets/protectedroutes';
import PageSkeleton from './componenets/pageskeleton';


const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const PostsPage = lazy(() => import('./pages/postpage'));
const SinglePostPage = lazy(() => import('./pages/SinglePostPage'));
const CreatePostPage = lazy(() => import('./pages/craetepostpage'));
const EditPostPage = lazy(() => import('./pages/EditPostPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Suspense fallback={<PageSkeleton />}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/posts" element={<PostsPage />} />
                    <Route path="/posts/:id" element={<SinglePostPage />} />
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/create-post" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
                    <Route path="/edit-post/:id" element={<ProtectedRoute><EditPostPage /></ProtectedRoute>} />
                    <Route path="/" element={<Navigate to="/posts" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;