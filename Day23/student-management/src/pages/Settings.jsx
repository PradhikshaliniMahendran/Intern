import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Settings.css';

function Settings(){
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="settings-page">
            <h1>⚙️ Settings</h1>
            <div className="scard">
                <h3>🎨 Appearance</h3>
                <p>Current Theme: {theme}</p>
                <button onClick={toggleTheme}>Toggle Dark/Light Mode</button>
            </div>
        </div>
    );
}

export default Settings;