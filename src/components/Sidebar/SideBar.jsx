import React, { useState , useContext} from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const SideBar = () => {
  const [extended, setextended] = useState(false);
  const {onSend , prevPrompt , setRecentPrompt,newChat } = useContext(Context)

  const loadPrompt = async(prompt) => {
      setRecentPrompt(prompt)
      await onSend(prompt )
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick = {(prev) => setextended(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />

        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended && (<p>New Chat</p>)}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {
              prevPrompt.map((item,index) => {
                return(
                  <div onClick={()=> loadPrompt(item)} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0,10)} ...</p>
                  </div>
                )
              })
            }
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended && (<p>Help</p>)}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended && (<p>Activity</p>)}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended && (<p>Settings</p>)}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
