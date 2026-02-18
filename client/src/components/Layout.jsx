import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div>
            <header className="header">
                <div className="header-content">
                    <Link to="/" className="" ><h1 class="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl text-gray-400">BNV Task</h1></Link>
                    <nav>
                        <Link to="/register" className="btn btn-primary text-gray-400">+ Add User</Link>
                    </nav>
                </div>
            </header>
            <main className="container">
                {children}
            </main>
        </div>
    );
};

export default Layout;
