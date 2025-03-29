class EmergencyService {
    constructor() {
        this.emergencyContacts = [];
        this.isEmergencyActive = false;
        this.countdownInterval = null;
        this.countdownTime = 10; // seconds
    }

    init() {
        this.loadContacts();
        document.getElementById('panic-button').addEventListener('click', () => {
            this.handleEmergency();
        });
    }

    loadContacts() {
        // Load from localStorage or API in real implementation
        const savedContacts = localStorage.getItem('emergencyContacts');
        if (savedContacts) {
            this.emergencyContacts = JSON.parse(savedContacts);
        }
    }

    handleEmergency() {
        if (this.isEmergencyActive) return;

        this.isEmergencyActive = true;
        this.startCountdown();
    }

    startCountdown() {
        let remainingTime = this.countdownTime;
        const panicButton = document.getElementById('panic-button');
        panicButton.disabled = true;
        panicButton.innerHTML = `<i class="fas fa-exclamation-triangle"></i><span>ALERT IN ${remainingTime}s</span>`;

        this.countdownInterval = setInterval(() => {
            remainingTime--;
            panicButton.innerHTML = `<i class="fas fa-exclamation-triangle"></i><span>ALERT IN ${remainingTime}s</span>`;

            if (remainingTime <= 0) {
                clearInterval(this.countdownInterval);
                this.triggerEmergencyAlert();
            }
        }, 1000);
    }

    triggerEmergencyAlert() {
        const position = locationService.getCurrentLocation();
        if (!position) {
            alert('Could not get current location!');
            this.resetEmergency();
            return;
        }

        // In a real implementation, this would send to backend/API
        const alertData = {
            timestamp: new Date().toISOString(),
            coordinates: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            contacts: this.emergencyContacts
        };

        console.log('Emergency alert triggered:', alertData);
        alert(`Emergency alert sent to ${this.emergencyContacts.length} contacts!`);
        this.resetEmergency();
    }

    resetEmergency() {
        clearInterval(this.countdownInterval);
        this.isEmergencyActive = false;
        const panicButton = document.getElementById('panic-button');
        panicButton.disabled = false;
        panicButton.innerHTML = `<i class="fas fa-exclamation-triangle"></i><span>EMERGENCY</span>`;
    }

    addContact(contact) {
        this.emergencyContacts.push(contact);
        this.saveContacts();
    }

    removeContact(index) {
        this.emergencyContacts.splice(index, 1);
        this.saveContacts();
    }

    saveContacts() {
        localStorage.setItem('emergencyContacts', JSON.stringify(this.emergencyContacts));
    }
}

const emergencyService = new EmergencyService();
document.addEventListener('DOMContentLoaded', () => {
    emergencyService.init();
});