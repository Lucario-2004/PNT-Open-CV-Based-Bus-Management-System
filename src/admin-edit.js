// JavaScript for Admin Edit Bus Details Page

document.addEventListener('DOMContentLoaded', () => {
  const editBusForm = document.getElementById('editBusForm');
  const cancelBtn = document.getElementById('cancelBtn');

  // Mock data for buses (should be synced with admin-routes.js)
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

  // Load bus data from sessionStorage index
  const editBusIndex = sessionStorage.getItem('editBusIndex');
  if (editBusIndex === null || editBusIndex >= busesData.length) {
    alert('Invalid bus selected for editing.');
    window.location.href = 'admin-routes.html';
    return;
  }

  const bus = busesData[editBusIndex];

  // Populate form fields
  document.getElementById('busName').value = bus.name;
  document.getElementById('busNumber').value = bus.number;
  document.getElementById('routeStart').value = bus.routeStart;
  document.getElementById('routeVia').value = bus.routeVia;
  document.getElementById('routeStops').value = bus.routeStops;

  // Handle form submission
  editBusForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Update bus data (mock)
    bus.name = document.getElementById('busName').value.trim();
    bus.number = document.getElementById('busNumber').value.trim();
    bus.routeStart = document.getElementById('routeStart').value.trim();
    bus.routeVia = document.getElementById('routeVia').value.trim();
    bus.routeStops = document.getElementById('routeStops').value.trim();

    alert('Bus details updated successfully.');

    // Redirect back to routes page
    window.location.href = 'admin-routes.html';
  });

  // Cancel button redirects back to routes page
  cancelBtn.addEventListener('click', () => {
    window.location.href = 'admin-routes.html';
  });
});
