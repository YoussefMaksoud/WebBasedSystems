const users = [];

//joining a user to a chat
function joinUser(id, username, color){
    const user = {
        id, username, color
    };

    users.push(user);

    return user;
}

//getting a specific user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

//when a user leaves the chat
function userDisconnect(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

//when the user wants to change their username and color
function changeUsername(id, username, color){
    const index = users.findIndex(user => user.id === id);

    users[index].username = username;
    users[index].color = color;
}

//returns the current user list
function getUsers(){
    return users;
}

module.exports = {
    joinUser,
    getCurrentUser,
    userDisconnect,
    changeUsername,
    getUsers
}