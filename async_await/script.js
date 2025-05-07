async function fetchPsts() { 
    try{

        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        console.log(data);
       const postDiv = document.getElementById('posts');
       data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            `;
            postDiv.appendChild(postElement);
       });
    } catch (error) {
        console.error("Error fetching posts:", error);
        document.getElementById('posts').innerHTML = '<h3 style="color: red;">sorry, something went wrong! </h3>';
    }
   
}

fetchPsts();