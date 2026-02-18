import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/main.css';

import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import EditUser from './pages/EditUser';
import UserDetails from './pages/UserDetails';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/edit/:id" element={<EditUser />} />
                    <Route path="/view/:id" element={<UserDetails />} />
                </Routes>
            </Layout>
            <ToastContainer position="bottom-right" />
        </Router>
    );
}

export default App;
