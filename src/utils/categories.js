function getCategories(){
    return JSON.parse(sessionStorage.getItem('categories'));
}

async function retrieveCategories(){
    await fetch(`http://localhost:3000/categories`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            sessionStorage.setItem('categories', JSON.stringify(data));
        })
        .catch((error) => {
            console.log(error);
        });
}

export {getCategories, retrieveCategories}