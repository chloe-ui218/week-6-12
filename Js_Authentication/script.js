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
        username: 'viewer',
        password: 'viewer123',
        role: 'viewer',
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
        displayContent(savedRole);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');

    if (!loginForm) {
        console.error('Error: #loginForm element not found in the DOM.');
        return;
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const usernameInput = document.querySelector('#userName');
        const passwordInput = document.querySelector('#password');
        const errorContainer = document.querySelector('#errorMessage');
        const successContainer = document.querySelector('#successMessage');
        localStorage.setItem('userRole', '');
        displayCintainer

        if (!usernameInput || !passwordInput || !errorContainer || !successContainer) {
            console.error('Error: Required input elements not found in the DOM.');
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            errorContainer.textContent = 'Please fill in all fields';
            successContainer.textContent = '';
            return;
        }

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            errorContainer.textContent = '';
            successContainer.textContent = `Welcome, ${user.role}`;
            displayContent(user.role);
        } else {
            errorContainer.textContent = 'Invalid username or password';
            successContainer.textContent = '';
        }
    });

    function displayContent(role) {
        const loginContainer = document.querySelector('#loginContainer');
        loginContainer.style.display = 'none';

        const contentDiv = document.createElement('div');
        contentDiv.id = 'content';

        if (role === 'admin') {
            contentDiv.innerHTML = `
                <h1>Welcome, ${role}</h1>
                <p>You have access to manage all data and settings</p>`;
        } else if (role === 'editor') {
            contentDiv.innerHTML = `
                <h1>Welcome, ${role}</h1>
                <p>You can edit content</p>`;
        } else if (role === 'viewer') {
            contentDiv.innerHTML = `
                <h1>Welcome, ${role}</h1>
                <p>You have access to view content</p>`;
        }


        const logoutButton = document.createElement('button');
        logoutButtonogoutButon.textContent = 'Logout';
        logout.classList.add('logout-button');

        logoutButton.addEventListener('click', logout);

        contentDiv.appendChild(logoutButton);

        document.body.appendChild(contentDiv);
    }

    const logout = () => {
        localStorage.removeItem('userRole');
        location.reload();
    }
});
