// JavaScript for Admin Login and Route Management page

document.addEventListener('DOMContentLoaded', () => {
  const adminLoginForm = document.getElementById('adminLoginForm');
  const routeManagement = document.getElementById('routeManagement');
  const routesTableBody = document.querySelector('#routesTable tbody');
  const editRoutesBtn = document.getElementById('editRoutesBtn');
  const updateRoutesBtn = document.getElementById('updateRoutesBtn');
  const revertRoutesBtn = document.getElementById('revertRoutesBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  // Mock data for routes
  let routesData = [
    { busId: 'Bus101', source: 'Campus', destination: 'Downtown', via: 'Main St, 5th Ave' },
    { busId: 'Bus102', source: 'Campus', destination: 'Airport', via: 'Highway 1, Elm St' }
  ];

  // Backup for revert
  let routesBackup = JSON.parse(JSON.stringify(routesData));

  // Admin login form submit (mock)
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = adminLoginForm.adminUsername.value.trim();
    const password = adminLoginForm.adminPassword.value.trim();
    if (username === 'admin' && password === 'password') {
      adminLoginForm.classList.add('hidden');
      routeManagement.classList.remove('hidden');
      populateRoutesTable();
    } else {
      alert('Invalid credentials. Try admin/password.');
    }
  });

  // Cancel button navigates back to index
  cancelBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Populate routes table
  function populateRoutesTable() {
    routesTableBody.innerHTML = '';
    routesData.forEach((route, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${route.busId}</td>
        <td><input type="text" value="${route.source}" disabled class="route-input" data-index="${index}" data-field="source"></td>
        <td><input type="text" value="${route.destination}" disabled class="route-input" data-index="${index}" data-field="destination"></td>
        <td><input type="text" value="${route.via}" disabled class="route-input" data-index="${index}" data-field="via"></td>
        <td><!-- Actions can be added here if needed --></td>
      `;
      routesTableBody.appendChild(tr);
    });
  }

  // Edit routes button
  editRoutesBtn.addEventListener('click', () => {
    toggleRouteEditing(true);
  });

  // Update routes button
  updateRoutesBtn.addEventListener('click', () => {
    saveRouteEdits();
    toggleRouteEditing(false);
  });

  // Revert routes button
  revertRoutesBtn.addEventListener('click', () => {
    routesData = JSON.parse(JSON.stringify(routesBackup));
    populateRoutesTable();
    toggleRouteEditing(false);
  });

  // Toggle route editing mode
  function toggleRouteEditing(editing) {
    const inputs = document.querySelectorAll('.route-input');
    inputs.forEach(input => {
      input.disabled = !editing;
    });
    editRoutesBtn.classList.toggle('hidden', editing);
    updateRoutesBtn.classList.toggle('hidden', !editing);
    revertRoutesBtn.classList.toggle('hidden', !editing);
  }

  // Save route edits from inputs
  function saveRouteEdits() {
    const inputs = document.querySelectorAll('.route-input');
    inputs.forEach(input => {
      const index = input.getAttribute('data-index');
      const field = input.getAttribute('data-field');
      routesData[index][field] = input.value.trim();
    });
    routesBackup = JSON.parse(JSON.stringify(routesData));
    alert('Routes updated successfully.');
  }
});
