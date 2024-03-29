import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import './Messages.css';
const Messages = ({ messages, name }) => {
  // console.log(messages,name);
  return (
  <ScrollToBottom className="messages" followButtonClassName="scrollbtn">
    {messages.length > 0 ? 
    messages.map((message, i) => 
    <div key={i} className="test">
      <Message message={message} name={name}/>
    </div>) : <p className='p-2'>No messages yet</p>
    }
  </ScrollToBottom>)
};

export default Messages;