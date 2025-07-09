const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'editor', password: 'editor123', role: 'editor' },
  { username: 'viewer', password: 'viewer123', role: 'viewer' }
];

const saveCurrentUser = (username, role) => {
  localStorage.setItem('currentUser', JSON.stringify({ username, role }));
};
const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));
const clearCurrentUser = () => localStorage.removeItem('currentUser');

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    displayContent(currentUser.role);
  } else {
    document.querySelector('.login-container').style.display = 'block';
  }
});

const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.querySelector('#userName').value.trim();
  const password = document.querySelector('#password').value.trim();
  const errorContainer = document.querySelector('#errorMessage');
  const successContainer = document.querySelector('#successMessage');

  if (!username || !password) {
    errorContainer.textContent = 'Please fill in all fields';
    successContainer.textContent = '';
    return;
  }

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    errorContainer.textContent = '';
    successContainer.textContent = `Welcome ${user.role}`;
    saveCurrentUser(user.username, user.role);
    displayContent(user.role);
  } else {
    errorContainer.textContent = 'Invalid username or password';
    successContainer.textContent = '';
  }
});
function displayContent(role) {
  const loginContainer = document.querySelector('.login-container');
  if (loginContainer) {
    loginContainer.style.display = 'none';
  }

  const existingContent = document.querySelector('.content');
  if (existingContent) {
    existingContent.remove();
  }

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content');

  const heading = document.createElement('h2');
  heading.textContent = `Welcome ${role}`;
  contentDiv.appendChild(heading);

  if (role === 'admin') {
    const manageBtn = document.createElement('button');
    manageBtn.textContent = 'Manage Users';
    manageBtn.onclick = displayUserManagement;
    contentDiv.appendChild(manageBtn);
  } else if (role === 'editor') {
    ['View', 'Edit', 'Delete'].forEach(text => {
      const btn = document.createElement('button');
      btn.textContent = text;
      contentDiv.appendChild(btn);
    });
  } else {
    ['View', 'Edit'].forEach(text => {
      const btn = document.createElement('button');
      btn.textContent = text;
      contentDiv.appendChild(btn);
    });
  }

  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Logout';
  logoutButton.classList.add('logout-button');
  logoutButton.addEventListener('click', logout);
  contentDiv.appendChild(logoutButton);

  document.body.appendChild(contentDiv);
}

const displayUserManagement = () => {
  document.querySelector('.user-management')?.remove();

  const div = document.createElement('div');
  div.className = 'user-management';

  const h2 = document.createElement('h2');
  h2.textContent = 'User Management';
  div.appendChild(h2);

  users.forEach((user, i) => {
    const row = document.createElement('div');
    row.className = 'user-row';

    const name = document.createElement('span');
    name.textContent = user.username;
    row.appendChild(name);

    const sel = document.createElement('select');
    ['admin', 'editor', 'viewer'].forEach(r => {
      const opt = document.createElement('option');
      opt.value = r;
      opt.textContent = r.charAt(0).toUpperCase() + r.slice(1);
      if (user.role === r) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', () => changeRole(i, sel.value));
    row.appendChild(sel);

    div.appendChild(row);
  });

  document.body.appendChild(div);
};

const changeRole = (i, role) => {
  users[i].role = role;
  const currentUser = getCurrentUser();
  alert(`User ${users[i].username} role has been changed to ${role}`);
  displayContent(currentUser.role);
};

const logout = () => {
  clearCurrentUser();
  location.reload();
};
