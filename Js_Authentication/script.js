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

    const username = document.querySelector('userName').arialValueMax;
    const password = document.querySelector('password').arialValueMax;
    const errorContainer = document.querySelector('#errorMessage');

    const user =

    if (!username || !password()) {
        errorContainer.textContent = 'Please fill in all fields';
    } else {
        errorContainer.textContent = '';
    }

})