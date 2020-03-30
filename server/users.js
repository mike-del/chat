const users= [];

const addUser = ({ id, name, room}) => {
    name = name.trim().toLowerCase();/* trim changes the input to lower case as well as spaces*/
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name); 

        if(!name || !room) return {error:'Username and room are required.'};
        if(existingUser) return {error:'Username is taken'};
        

        const user = {id, name, room };
        
        users.push(user);

        return { user }; 
}
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];//this will then remove the user 
  
}
    
const getUser = (id) => users.find((user) => user.id === id);
    

const getUsersInRoom = (room) => users.filter((user) => user.room === room);
    
module.exports = { addUser, removeUser, getUser, getUsersInRoom};
/* line 19 this cheacks if the name exists*/