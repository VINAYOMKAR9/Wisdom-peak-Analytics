import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/HomePage';
import UserDetailPage from './pages/UserDetailPage';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <UserProvider>
            <div className={darkMode ? 'dark-mode' : 'light-mode'}>
                <button onClick={toggleTheme}>
                    Switch to {darkMode ? 'Light' : 'Dark'} Mode
                </button>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/user/:id" element={<UserDetailPage />} />
                    </Routes>
                </Router>
            </div>
        </UserProvider>
    );
};

export default App;
