import React from 'react';
import onlineIcon from '../../Icons/onlineIcon.png';

import './TextContainer.css';


const TextContainer = ({ users }) => (

users
          ? (
            <div className='drawers'>
              <h2 className='header'>Online users</h2>
              <div className="activeContainer">

                  <p>
                    {users.map(({name}) => (
                      <div key={name} className="activeItem">
                          {name}
                          <img alt="OnlineIcon" src={onlineIcon}/>
                      </div>
                    ))}
                  </p>
        
              </div>
            </div>
          )
          : null       

)

export default TextContainer;