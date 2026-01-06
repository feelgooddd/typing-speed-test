import LogoSmall from "../assets/images/logo-small.svg";
import PersonalBestIcon from "../assets/images/icon-personal-best.svg";
import { useState } from "react";
import "./css/header.css";
const Header = ({PB}) => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={LogoSmall} alt="" />
      </div>
      <div className="header-right">
        <img src={PersonalBestIcon} alt="" />
        <h2><span className="txt-grey">Best:</span> {PB} WPM</h2>
      </div>
    </header>
  );
};

export default Header;
