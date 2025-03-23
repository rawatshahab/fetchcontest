import React, { useEffect, useState } from 'react';
import "./nav.css";
import { Moon, Sun, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() { 
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className='icon'> 
                    <Calendar size={20} />
                    <Link to="/">
                        <h1 style={{color:'black'}}>Contest Tracker</h1>
                    </Link>
                    <a href='/solutions'>Solutions</a>
                    <a href='/contests'>Contest</a>
                </div>
                <div className="theme-switcher" onClick={toggleTheme}>
                    {theme === "light" ? <Moon /> : <Sun />}
                </div>
            </div>
        </nav>
    );
}
