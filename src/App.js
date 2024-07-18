import React, { useState, useEffect } from 'react';
import * as Icon from 'beehively-icons';
import clipboardCopy from 'clipboard-copy';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [iconList, setIconList] = useState([]);
  const [copiedIcon, setCopiedIcon] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const icons = Object.keys(Icon);
    setIconList(icons);

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    // Save dark mode preference in localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const filteredIcons = iconList.filter(icon => icon.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCopyClick = (icon) => {
    clipboardCopy(icon)
      .then(() => {
        setCopiedIcon(icon);
        setTimeout(() => setCopiedIcon(null), 1500); // Reset copiedIcon after 1.5 seconds
      })
      .catch((err) => console.error('Failed to copy text: ', err));
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div>
          <span className="logo">Beehively Icons</span>
          <span className='code'>
            v1.0.7
          </span>
        </div>
        <div className='topRight'>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Dhirajpatel/beehively-icons" className="link">GitHub</a>
          <button className="iconButton" onClick={handleDarkModeToggle}>
            {!darkMode ?
              <Icon.Moon />
              :
              <Icon.Sun />}
          </button>
        </div>
      </header>
      <main className='main'>
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            className="searchInput"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Icon.Search size={20} className="searchIcon" />
        </div>
        <div className="iconList">
          {filteredIcons.map((icon, index) => (
            <div key={index} className="iconItem" onClick={() => handleCopyClick(icon)}>
              <span className='svgIcon'>
                {React.createElement(Icon[icon], { size: 32 })}
              </span>
              <span className="iconName">{icon}</span>
              {copiedIcon === icon && <span className="copyText">Copied</span>}
              <span className="copyIcon">
                <Icon.Copy size={20} />
              </span>
            </div>
          ))}
        </div>
      </main>


    </div>
  );
}

export default App;
