import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import Home from "./home";
import Oldpackage from "./oldpackage";
import Logo from "/bee-icon.svg";
import { MoonIcon, SunIcon } from 'beeicons';

const githubLinks: Record<string, string> = {
  "/": "https://github.com/Dhirajpatel/beeicons",
  "/oldpackage": "https://github.com/Dhirajpatel/beehively-icons",
};

// Header component
const Header: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();
  const githubUrl = githubLinks[location.pathname] || githubLinks["/"];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Bee Icons" />
        <span>Bee Icons</span>
      </div>

      <div className='topRight'>
        <nav className='navbar'>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/oldpackage" className={({ isActive }) => (isActive ? "active" : "")}>
            Old Package
          </NavLink>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </nav>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oldpackage" element={<Oldpackage />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App