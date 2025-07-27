// JavaScript for Admin Routes Management Page

document.addEventListener('DOMContentLoaded', () => {
  const routesTableBody = document.querySelector('#routesTable tbody');
  const logoutBtn = document.getElementById('logoutBtn');

  // Mock data for buses
  let busesData = [
    {
      name: 'Campus Express',
      number: 'Bus101',
      routeStart: 'Campus',
      routeVia: 'Main St, 5th Ave',
      routeStops: 'Stop1, Stop2, Stop3',
    },
    {
      name: 'Airport Shuttle',
      number: 'Bus102',
      routeStart: 'Campus',
      routeVia: 'Highway 1, Elm St',
      routeStops: 'StopA, StopB, StopC',
    }
  ];

  // Populate routes table
  function populateRoutesTable() {
    routesTableBody.innerHTML = '';
    busesData.forEach((bus, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${bus.name}</td>
        <td>${bus.number}</td>
        <td>${bus.routeStart}</td>
        <td>${bus.routeVia}</td>
        <td>${bus.routeStops}</td>
        <td><button class="btn primary-btn edit-btn" data-index="${index}">Edit</button></td>
      `;
      routesTableBody.appendChild(tr);
    });
    addEditListeners();
  }

  // Add click listeners to edit buttons
  function addEditListeners() {
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        // Store selected bus index in sessionStorage for edit page
        sessionStorage.setItem('editBusIndex', index);
        window.location.href = 'admin-edit.html';
      });
    });
  }

  // Logout button redirects to index
  logoutBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  populateRoutesTable();
});
