// JavaScript for Admin Login Page

document.addEventListener('DOMContentLoaded', () => {
  const adminLoginForm = document.getElementById('adminLoginForm');
  const cancelBtn = document.getElementById('cancelBtn');

  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = adminLoginForm.adminUsername.value.trim();
    const password = adminLoginForm.adminPassword.value.trim();
    if (username === 'admin' && password === 'password') {
      // Redirect to admin routes page on successful login
      window.location.href = 'admin-routes.html';
    } else {
      alert('Invalid credentials. Try admin/password.');
    }
  });

  cancelBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
