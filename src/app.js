// JavaScript for Bus Monitoring System frontend UI interactions and mock data

document.addEventListener('DOMContentLoaded', () => {
  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const adminModal = document.getElementById('adminModal');
  const adminModalClose = document.getElementById('adminModalClose');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const routeManagement = document.getElementById('routeManagement');
  const editRoutesBtn = document.getElementById('editRoutesBtn');
  const updateRoutesBtn = document.getElementById('updateRoutesBtn');
  const revertRoutesBtn = document.getElementById('revertRoutesBtn');
  const routesTableBody = document.querySelector('#routesTable tbody');

  const locationInput = document.getElementById('locationInput');
  const searchBusBtn = document.getElementById('searchBusBtn');
  const busInfo = document.getElementById('busInfo');
  const busList = document.getElementById('busList');

  const busDetailsModal = document.getElementById('busDetailsModal');
  const busDetailsContent = document.getElementById('busDetailsContent');
  const closeBusDetails = document.getElementById('closeBusDetails');

  // Mock data for routes
  let routesData = [
    { busId: 'Bus101', source: 'Campus', destination: 'Downtown', via: 'Main St, 5th Ave' },
    { busId: 'Bus102', source: 'Campus', destination: 'Airport', via: 'Highway 1, Elm St' }
  ];

  // Backup for revert
  let routesBackup = JSON.parse(JSON.stringify(routesData));

  // Mock data for buses on route
  const busesOnRoute = [
    {
      busId: 'Bus101',
      currentLocation: 'Main St near 3rd Stop',
      speed: '40 km/h',
      eta: '10 mins',
      emptySeats: 5,
      routeMapUrl: 'https://maps.google.com/?q=Main+St+to+Downtown'
    },
    {
      busId: 'Bus102',
      currentLocation: 'Highway 1 near 2nd Stop',
      speed: '50 km/h',
      eta: '15 mins',
      emptySeats: 3,
      routeMapUrl: 'https://maps.google.com/?q=Highway+1+to+Airport'
    }
  ];

  // Show admin modal
  adminLoginBtn.addEventListener('click', () => {
    adminModal.classList.remove('hidden');
    adminLoginForm.classList.remove('hidden');
    routeManagement.classList.add('hidden');
  });

  // Close admin modal
  adminModalClose.addEventListener('click', () => {
    adminModal.classList.add('hidden');
    resetAdminForm();
  });

  // Admin login form submit (mock)
  adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple mock validation
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
        <td><button class="btn secondary-btn view-details-btn" data-index="${index}">View</button></td>
      `;
      routesTableBody.appendChild(tr);
    });
    addViewDetailsListeners();
  }

  // Add listeners to view details buttons
  function addViewDetailsListeners() {
    const viewButtons = document.querySelectorAll('.view-details-btn');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        showBusDetails(routesData[index]);
      });
    });
  }

  // Show bus details modal
  function showBusDetails(route) {
    busDetailsContent.innerHTML = `
      <p><strong>Bus ID:</strong> ${route.busId}</p>
      <p><strong>Source:</strong> ${route.source}</p>
      <p><strong>Destination:</strong> ${route.destination}</p>
      <p><strong>Via Points:</strong> ${route.via}</p>
      <p><em>Note: Real-time data like bus location, speed, empty seats will be shown here when backend is integrated.</em></p>
    `;
    busDetailsModal.classList.remove('hidden');
  }

  // Close bus details modal
  closeBusDetails.addEventListener('click', () => {
    busDetailsModal.classList.add('hidden');
  });

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
  }

  // Reset admin form and route management UI
  function resetAdminForm() {
    adminLoginForm.reset();
    adminLoginForm.classList.remove('hidden');
    routeManagement.classList.add('hidden');
    toggleRouteEditing(false);
  }

  // Search bus button click
  searchBusBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (!location) {
      alert('Please enter your boarding location.');
      return;
    }
    displayBusesForLocation(location);
  });

  // Display buses for the entered location (mock filtering)
  function displayBusesForLocation(location) {
    // For demo, show all buses if location matches source or via points (case insensitive)
    const filteredBuses = busesOnRoute.filter(bus => {
      return bus.currentLocation.toLowerCase().includes(location.toLowerCase()) ||
             bus.routeMapUrl.toLowerCase().includes(location.toLowerCase());
    });

    busList.innerHTML = '';
    if (filteredBuses.length === 0) {
      busList.innerHTML = '<p>No buses found for your location.</p>';
    } else {
      filteredBuses.forEach(bus => {
        const busDiv = document.createElement('div');
        busDiv.className = 'bus-item';
        busDiv.innerHTML = `
          <h3>${bus.busId}</h3>
          <p><strong>Current Location:</strong> ${bus.currentLocation}</p>
          <p><strong>Speed:</strong> ${bus.speed}</p>
          <p><strong>Estimated Time of Arrival:</strong> ${bus.eta}</p>
          <p><strong>Empty Seats:</strong> ${bus.emptySeats}</p>
          <a href="${bus.routeMapUrl}" target="_blank" rel="noopener noreferrer">View Route Map</a>
        `;
        busList.appendChild(busDiv);
      });
    }
    busInfo.classList.remove('hidden');
  }
});
