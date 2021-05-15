function setUser(user){
    localStorage.setItem('user', JSON.stringify(user))
}

function getUser(){
    return JSON.parse(localStorage.getItem('user'))
}

export {setUser, getUser}