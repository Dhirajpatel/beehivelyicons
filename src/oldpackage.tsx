import React, { useState, useEffect } from 'react';
import * as Icon from 'beehively-icons';
import clipboardCopy from 'clipboard-copy';

type BeehivelyComponent = React.FC<{ size?: number; className?: string }>;

const Oldpackage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [iconList, setIconList] = useState<string[]>([]);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  useEffect(() => {
    const icons = Object.keys(Icon).filter(name => name !== 'BeehivelyIcon');
    setIconList(icons);
  }, []);

  const filteredIcons = iconList.filter(icon => icon.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCopyClick = (icon: string) => {
    clipboardCopy(icon)
      .then(() => {
        setCopiedIcon(icon);
        setTimeout(() => setCopiedIcon(null), 1500); // Reset after 1.5s
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <>
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
        {filteredIcons.map((icon, index) => {
          const IconComponent = Icon[icon as keyof typeof Icon] as BeehivelyComponent;
          return (
            <div key={index} className="iconItem" onClick={() => handleCopyClick(icon)}>
              <span className='svgIcon'>
                <IconComponent size={32} />
              </span>
              <span className="iconName">{icon}</span>
              {copiedIcon === icon && <span className="copyText">Copied</span>}
              <span className="copyIcon">
                <Icon.Copy size={20} />
              </span>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Oldpackage
