const users = [
    {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
    },
    {
        username: 'editor',
        password: 'editor123',
        role: 'editor',
    },
    {
        username:'viewer',
        password:'viewer123',
        role: 'viewer',
    }
]


const loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', function(e){
    e.preventDefault();

    const username = document.querySelector('#userName').value;
    const password = document.querySelector('#password').value;
    const errorContainer = document.querySelector('#errorMessage');
    const successContainer = document.querySelector('#successMessage');

    if (!username || !password) {
        errorContainer.textContent = 'Please fill in all fields';
    } else {
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            errorContainer.textContent = '';
            successContainer.textContent = `Welcome 4{user.role}`;
            alert(`Welcome ${user.role}`);
        } else {
            errorContainer.textContent = 'Invalid username or password';
        }
    }
});