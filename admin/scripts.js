const users = [
    {
        username: 'admin',
        password: 'admin123',
        role: 'admin'
    },
    {
        username: 'editor',
        password: 'editor123',
        role: 'editor'
    },
    {
        username: 'viewer',
        password: 'viewer123',
        role: 'viewer'
    }
];

const saveCurrentUser = (Username, role) => {
    localStorage.setItem('currentUser', JSON.stringify({ Username, role }));
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
}

const clearCurrentUser = () => {
    localStorage.removeItem('currentUser');
}

document.addEventListener('DOMContentLoaded', () => {
   const currentUser = getCurrentUser();
    if (currentUser) {
        displayContent(currentUser.role);
    } else {
        const loginContainer = document.querySelector('.login-container');
        if (loginContainer) {
            loginContainer.style.display = 'block';
        } else {
            console.error('Login container not found');
        }
    }
});

const loginForm = document.querySelector('#loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.querySelector('#userName').value.trim();
        const password = document.querySelector('#password').value.trim();
        const errorContainer = document.querySelector('#errorMessage');
        const successContainer = document.querySelector('#successMessage');

        if (!errorContainer || !successContainer) {
            console.error('Error or success container not found');
            return;
        }

        if (!username || !password) {
            errorContainer.textContent = 'Please fill in all fields';
            successContainer.textContent = '';
        } else {
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                errorContainer.textContent = '';
                successContainer.textContent = `Welcome ${user.role}`;
                saveCurrentUser(user.username, user.role);  
                displayContent(user.role);
            } else {
                errorContainer.textContent = 'Invalid username or password';
                successContainer.textContent = '';
            }
        }
    });
} else {
    console.error('Login form not found');
}

function displayContent(role) {
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        loginContainer.style.display = 'none';
    } else {
        console.error('Login container not found');
    }

    const existingContent = document.querySelector('.content');
    if (existingContent) {
        existingContent.remove();
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    contentDiv.innerHTML = `<h2>Welcome ${role}</h2>`;

    if (role === 'admin') {
        contentDiv.innerHTML = `
           <button onclick='displayUserManagement()'>Manage Users</button>`;
    } else if (role === 'editor') {
        contentDiv.innerHTML = `
            <button>View</button>
            <button>Edit</button>
            <button>Delete</button>`;
    } else if (role === 'viewer') {
        contentDiv.innerHTML = `
            <button>View</button>
            <button>Edit</button>`;
    }

    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.classList.add('logout-button');

    logoutButton.addEventListener('click', logout);

    contentDiv.appendChild(logoutButton);
    document.body.appendChild(contentDiv);
}

const displayUserManagement = () => {
    const userManagementDiv = document.createElement('div');
    userManagementDiv.className = 'user-management';

    userManagementDiv.innerHTML = '<h2>User Management</h2>';

    users.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-row');
        userDiv.innerHTML = `
            <span>${user.username}</span>
            <select onchange="changeRole(${index}, this.value)">
            <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
            <option value="editor" ${user.role === 'editor' ? 'selected' : ''}>Editor</option>
            <option value="viewer" ${user.role === 'viewer' ? 'selected' : ''}>Viewer</option>
            </select>
        `
        userManagementDiv.appendChild(userDiv);
    });
    document.body.appendChild(userManagementDiv);

}

changeRole = (index, newRole) => {
    users[index].role = newRole;
    const currentUser = getCurrentUser();
    alert(`User ${users[index].username} role has been changed to ${newRole}`);
    
        displayContent(currentUser.role);
    };

const logout = () => {
    clearCurrentUser();
    location.reload();
}
