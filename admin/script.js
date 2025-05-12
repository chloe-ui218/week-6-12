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

const saveCurrentUser = (userName, role) => {
    localStorage.setItem('currentUser', JSON.stringify({userName, role}));
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
};
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    displayContent(currentUser.role);
  }
});

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
           saveCurrentUser(user.username, user.role);
            displayContent(user.role);
        } else {
            errorContainer.textContent = 'Invalid username or password';
            successContainer.textContent = '';
        }
    });

function displayContent(role) {
    const loginContainer = document.querySelector('#loginContainer');

    if (loginContainer) {
        loginContainer.style.display = 'none';
    }

    let contentDiv = document.querySelector('#content');

    if (!contentDiv) {
        contentDiv = document.createElement('div');
        contentDiv.id = 'content';
        document.body.appendChild(contentDiv);
    } else {
        contentDiv.innerHTML = '';
    }

    let buttonsHTML = '';

    if (role === 'admin') {
        buttonsHTML = `
            <button class="create-button">Create</button>
            <button class="view-button">View</button>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;
    } else if (role === 'editor') {
        buttonsHTML = `
            <button>View</button>
            <button>Edit</button>
            <button>Delete</button>
        `;
    } else if (role === 'viewer') {
        buttonsHTML = `
            <button>View</button>
            <button>Edit</button>
        `;
    }

    contentDiv.innerHTML = `
        <h1>Welcome, ${role}</h1>
        ${buttonsHTML}
    `;

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.classList.add('logout-button');
    logoutButton.addEventListener('click', logout);

    contentDiv.appendChild(logoutButton);
}

const logout =() =>{
    clearCurrentUser();
    location.reload();
}
