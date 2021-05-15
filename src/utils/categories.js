function getCategories(){
    return JSON.parse(localStorage.getItem('categories'));
}

function retrieveCategories(){
    fetch(`http://localhost:3000/categories`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('categories', JSON.stringify(data));
        })
        .catch((error) => {
            console.log(error);
        });
}

export {getCategories, retrieveCategories}