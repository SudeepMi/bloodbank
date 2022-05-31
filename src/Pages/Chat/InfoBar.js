import React from 'react';
import onlineIcon from '../../assets/onlineIcon.png';
import closeIcon from '../../assets/closeIcon.png';
import './InfoBar.css';
import User from '../../utils/User';

const InfoBar = ({ room, typing, user, recip }) => {
  const userFullName =  String(User().profile().fullname).trim().toLowerCase();

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  return(
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      {/* <span>{room}</span> */}
      <div className="">{recip ? recip.map((rec,i)=> rec.name!==userFullName && <span key={i} className="text-bold text-capitalize">{(rec.name)}</span> ) : null}</div>
      <span className="px-2">{typing ? (typing === user) ? null: "🤔"  : null}</span>
    </div>
    <div className="rightInnerContainer">
      <div className="px-2">
      <h6 className='text-bold'>{recip.length} People</h6>
      </div>
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);
}

export default InfoBar;