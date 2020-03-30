import React from 'react';
import './side.css';
import onlineIcon from '../../Icons/onlineIcon.png';
import userIcon from '../../Icons/user.svg';



const Drawer = ({users}) => (
users
        ? (    
                <div className='sidenav'>
                 <img alt="userIcon" className="usersIcon" src={userIcon}/>
                    <p>Online</p>     
                    <p>    
                        {users.map(({name}) => (
                        <div key={name} className="activeItem">
                            {name}
                            <img alt="OnlineIcon" className='online' src={onlineIcon}/>
                        </div>
                        ))}
                    </p>
            </div>
        
        )
        :null
    );
export default Drawer


