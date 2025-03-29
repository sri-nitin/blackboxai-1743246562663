document.addEventListener('DOMContentLoaded', () => {
    const panicButton = document.getElementById('panic-button');
    const locationToggle = document.getElementById('location-sharing-toggle');
    const navButtons = document.querySelectorAll('.nav-btn');

    // Event listener for panic button
    panicButton.addEventListener('click', () => {
        alert('Emergency alert sent!');
        // Trigger emergency alert logic here
    });

    // Event listener for location sharing toggle
    locationToggle.addEventListener('change', (event) => {
        if (event.target.checked) {
            document.getElementById('location-status-text').innerText = 'Location sharing: ON';
            // Start location sharing logic here
        } else {
            document.getElementById('location-status-text').innerText = 'Location sharing: OFF';
            // Stop location sharing logic here
        }
    });

    // Navigation button click event
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById(view).classList.add('active');
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});