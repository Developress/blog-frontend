function setUser(user){
    sessionStorage.setItem('user', JSON.stringify(user))
}

function getUser(){
    return JSON.parse(sessionStorage.getItem('user'))
}

export {setUser, getUser}