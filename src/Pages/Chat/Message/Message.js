import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';
import User from '../../../utils/User';

const Message = ({ message: { text, user }, name }) => {
  const userPhoto = User().profile().photo
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if(user.name === trimmedName) {
    isSentByCurrentUser = true;
  }
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
         { userPhoto ? <img className="sentText ml-2 border-radius-4 rounded-circle " src={user.photo} width={40}  /> : <p className="sentText pr-10">{trimmedName}</p> }
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
           {user.photo ? <img className="sentText mr-2 border-radius-4 rounded-circle " src={user.photo} width={40}  /> : <p>{user.name}</p> }
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
          </div>
        )
  );
}

export default Message;