import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';
import http from "../../utils/http";
import './Chat.css';
import {  useParams } from 'react-router-dom';
import User from "../../utils/User";

let socket;


const Chat = () => {
  const  room  = useParams().id;
  const name = User().profile().fullname;
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState('')
  const ENDPOINT = http.host;

  useEffect(() => {
   socket = io("ws://localhost:3035",{
      path: '/socket'
   }); 
    socket.emit('join', { "name": name, "room": room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, window.location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
        setTyping(null);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
      // setUsersCount(users.length);
    });
  },[]);
useEffect(()=> {
    socket.on('display', (data)=>{
      if(data.typing===true){
        const trimmedName = data.user.trim().toLowerCase();
          if(name === trimmedName) {
            setTyping(null);
          }else{
            setTyping(data.user);
          }
      }   
    });

});

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  const sendTyping = () =>{
    // event.preventDefault();
    socket.emit('sendTyping',{user:name, typing:true});
  }

  return (
    <div className="container outerContainer">
      <div className="w-100 m-0 mt-5 p-0">
          <InfoBar room={room} typing={typing} user={name} recip={users} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} sendTyping={sendTyping}/>
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
  );
}

export default Chat;
