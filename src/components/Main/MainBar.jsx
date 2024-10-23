import React, { useContext, useEffect, useState } from "react";
import "./MainBar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const MainBar = () => {
  
  const {onSend,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)
  
  // const [themeChange,setThemeChange] = useState(false)
  
//   const darkMode = () =>{
//       const root = document.querySelector('#root');
      
//   }
 

//  useEffect(() => {
//     themeChange ? 'false' : 'true';
//  },[themeChange])

  return (
  
    <div className="main">
      
      <nav className="navBar">
        <p>Gemini</p>
        {/* <div className="right-section">
              <div className="light" onClick={(e) => lightMode()}>
                <CiDark/>
              </div>
              <div className="dark" onClick={(e) => darkMode()}>
                <MdDarkMode />
              </div> */}
            <img src={assets.user_icon} alt="" />
        {/* </div> */}
      </nav>

      <div className="main-container">
        
        {
          !showResult ?
          <>
            <div className="greet">
              <p>
                <span>Hello , Dev.</span>
              </p>
              <p>How can I Help you today ?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div className="card">
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
          :
          <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {
                  loading ? 
                  <div className="loader">
                     <hr />
                     <hr />
                     <hr />
                  </div>
                  :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
              </div>
          </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Enter a prompt here" />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {
                input && <img onClick = {() => onSend()} 
              src={assets.send_icon} alt="" />
              }
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainBar;
