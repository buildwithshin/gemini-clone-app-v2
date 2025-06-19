import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts,setRecentPrompt,newChat,setPrevPrompts } = useContext(Context);

  // Load the selected prompt from recent prompts
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        {/* Toggle the sidebar extension */}
        <img onClick={() => setExtended((prev) => !prev)} className="menu" src={assets.menu} alt="" />
        
        {/* New Chat button */}
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus} alt='' />
          {extended ? <p>New Chat</p> : null}
        </div>

        {/* Recent prompts section */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div 
                  key={index}  // Add key prop for each item
                  onClick={() => loadPrompt(item)}  // Only trigger loadPrompt
                  className="recent-entry"
                >
                  <img src={assets.message} alt='' />
                  <p>{item.slice(0, 18)} ...</p>  {/* Show only first 18 characters */}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        {/* Help section */}
        <div className="bottom-item recent-entry">
          <img src={assets.question} alt='' />
          {extended ? <p>Help</p> : null}
        </div>

        {/* Activity section */}
        <div className="bottom-item recent-entry">
          <img src={assets.history} alt='' />
          {extended ? <p>Activity</p> : null}
        </div>

        {/* Settings section */}
        <div className="bottom-item recent-entry">
          <img src={assets.setting} alt='' />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
