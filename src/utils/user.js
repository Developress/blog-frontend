let authenticated = false;
export let user = {
    "id": "",
    "username": ""
}

function setAuthenticated(value) {
  authenticated = value;
}

function isAuthenticated(){
    return authenticated;
}

function setUser(id, username){
    user.id = id;
    user.username = username;
}

function getUser(){
    return user
}

export { setAuthenticated, isAuthenticated, setUser, getUser };