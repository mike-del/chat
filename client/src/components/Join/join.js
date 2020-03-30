import React, { useState } from 'react'; // helps to use the keyword useState in the function based component
import { Link } from 'react-router-dom';
import './join.css';

const Join = () =>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return(
        <div className="joinOuterContainer">
            <div className ="joinInnerContainer">
                <h1 className ="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}/></div>
                
                <Link onClick={event => (!name || !room) ? event.preventDefault(): null } to ={`/chat?name=${name}&room=${room}`}>
                                                                                                
                    <button className="button mt-20" type="submit">Sign in </button>
                </Link>
            </div>
        </div>

    )
}

export default Join
//link onclick ....(1st part) this ensures that both fields (name and room) are field when submit button is clicked 
//link onclick ....(2nd part) this allows as to read what has been inputted by the user in the fields (to = ....)
//event.target. value holds our data

