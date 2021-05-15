async function retrievePosts() {
    let response = await fetch(`http://localhost:3000/posts`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

async function retrievePost(id){
    let response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

function deletePost(id){
    fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {

        })
        .catch((error) => {
            console.log(error);
        })
}

export {retrievePosts, retrievePost, deletePost}