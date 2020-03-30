import React, {useState, useEffect} from 'react';// lifesycle methods inside hooks
import queryString from 'query-string';//retriving data from the url
import io from 'socket.io-client';
import './chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from "../input/input";
import Messages from '../Messages/Messages';
import  Drawer from '../TextContainer/sideDrawer';



let socket;


const Chat = ({ location }) => {
    
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://react-chat-trial.herokuapp.com/';

    useEffect (() => {
       const {name, room}  = queryString.parse(location.search);

       socket = io(ENDPOINT);

       setName(name);
       setRoom(room);

       console.log(socket);

       socket.emit('join', {name, room}, () => {

       });
       socket.on('roomData',({users})=>{
           setUsers(users);
       })
       

       return () => {
           socket.emit('disconnect');

           socket.off();
       }

    },[ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message',(message) => {
            setMessages([...messages, message]);//adds new messages to the message array 
        })
    },[messages]);

// function for sending messages
    const sendMessage = (event) => {
        event.preventDefault(); //prevents the default action where the page refreches by itself

        if(message) {
          socket.emit('sendMessage', message, () => setMessage('')); //this clears the input field after typing 
    }
}
console.log(message,messages);

    return(

        <div className="outerContainer">
            <div className='container'>
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
                <Drawer users ={users}/> 
            </div>
        
    );
}

 
export default Chat
//use effect is a hook that lets you to lifesycle methods or side effects in function components.
//line 62 we are sending messages as a property 
//<TextContainer users = {users}/>

