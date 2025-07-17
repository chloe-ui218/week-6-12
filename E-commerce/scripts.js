const users = [
  {
    username: 'Admin',
    password: 'admin123',
    role: 'admin',
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

const products = [
  { id: 1, name: "Laptop", description: "High-end laptop", price: 999 },
  { id: 2, name: "Phone", description: "Smartphone with great camera", price: 699 },
  { id: 3, name: "Tablet", description: "Perfect for on-the-go", price: 499 },
];

const saveCurrentUser = (username, role) => {
  localStorage.setItem('currentUser', JSON.stringify({ username, role }));
};

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
  }
})

const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.querySelector('#userName').value.trim();
  const password = document.querySelector('#password').value.trim();
  const errorContainer = document.querySelector('#errorMessage');
  const successContainer = document.querySelector('#successMessage');

  if (!username || !password) {
    errorContainer.textContent = 'Please fill in all fields';
  } else {
    errorContainer.textContent = '';
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      errorContainer.textContent = '';
      successContainer.textContent = `Welcome ${user.role}`;
      saveCurrentUser(user.username, user.role);
      displayContent(user.role);
    } else {
      errorContainer.textContent = 'Invalid username or password';
    }
  }
});

function displayContent(role) {
  const loginContainer = document.querySelector('.login-container');
  loginContainer.style.display = 'none';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'content';

  contentDiv.innerHTML = `<h2>Welcome ${role}</h2>`;

  if (role === 'admin') {
    contentDiv.innerHTML += `
      <button onclick='displayUserManagement()'>Manage Users</button>
      <button onclick='displayProducts()'>View products</button>
    `;
  } else if (role === 'editor') {
    contentDiv.innerHTML += `
      <button onclick='displayProducts()'>View products</button>
    `;
  } else if (role === 'viewer') {
    contentDiv.innerHTML += `
    <button onclick='displayProducts()'>View products</button>
    `;
  }

  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Logout';
  logoutButton.classList.add('logout-button');

  logoutButton.addEventListener('click', logout);

  contentDiv.appendChild(logoutButton);

  document.body.appendChild(contentDiv);
}

const displayUserManagement = () => {
  const UserManagementDiv = document.createElement('div');
  UserManagementDiv.className = 'user-management';

  UserManagementDiv.innerHTML = '<h2>User Management</h2>';

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
    `;
    UserManagementDiv.appendChild(userDiv);
  });

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.classList.add('close-button');

  closeButton.addEventListener('click', () => {
    userManagementDiv.remove();
  })

  document.body.appendChild(UserManagementDiv);
}

const displayProducts = () => {
  const productsDiv = document.createElement('div');
  productsDiv.classList.add('products-container');

  productsDiv.innerHTML = '<h2>List of all products</h2>';

  products.forEach((product, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-row');

    productDiv.innerHTML = `
     <p><strong>Product: </strong><span>${product.name}</span></p>
     <p><strong>Description: </strong><span>${product.description}</span></p>
    <p><strong>Price:  </strong><span>${product.price}$</span></p>
    `;
    productsDiv.appendChild(productDiv);
  })

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';

  document.body.appendChild(productsDiv);
}

const changeRole = (index, role) => {
  users[index].role = role;
  const currentUser = getCurrentUser();
  alert(`User ${users[index].username} role has been changed to ${role}`);
};

const logout = () => {
  clearCurrentUser();
  location.reload();
};
