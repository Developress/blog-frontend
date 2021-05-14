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

export { setAuthenticated, isAuthenticated };