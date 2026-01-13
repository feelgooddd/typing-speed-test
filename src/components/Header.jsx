import LogoSmall from "../assets/images/logo-small.svg";
import PersonalBestIcon from "../assets/images/icon-personal-best.svg";
import { useState } from "react";
import "./css/header.css";
const Header = ({ setPB, PB, handleReset, testStarted }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleDeletePB(e){
    setShowConfirmation(!showConfirmation)
    if(e === "delete"){
      localStorage.setItem("PB", 0)
      setPB(0);
    }
  }
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-left__logo">
          <img src={LogoSmall} alt="keyboard icon logo" />
        </div>
        <div className="header-left__content">
          <h1>Typing Speed Test</h1>
          <p className="txt-grey">
            Type as fast as you can in the time you select
          </p>
        </div>
      </div>
      <div className="header-middle">
        {!showConfirmation ? 
        <>
        <button className="default-btn reset-btn" onClick={handleReset} disabled={!testStarted}>Reset Test</button>
        <button className="default-btn delete-score-btn" onClick={handleDeletePB}>Delete Score</button>
        </>
        : 
        <>
          <button className="default-btn confirm-delete-btn" value="delete" onClick={(e) => handleDeletePB(e.target.value)}>Yes delete</button>
          <button className="default-btn deny-delete-btn" onClick={handleDeletePB}>No don't delete</button>
          </>}

      </div>
      <div className="header-right">
        <img src={PersonalBestIcon} alt="" />
        <h2 className="pb-text">
          <span className="txt-grey pb-mobile">Best:</span>
          <span className="txt-grey pb-desktop">Personal Best:</span> {PB} WPM
        </h2>
      </div>
    </header>
  );
};

export default Header;
