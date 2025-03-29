class ContactsManager {
    constructor() {
        this.contacts = [];
        this.contactForm = null;
    }

    init() {
        this.loadContacts();
        this.renderContacts();
        this.setupEventListeners();
    }

    loadContacts() {
        const savedContacts = localStorage.getItem('safetyContacts');
        if (savedContacts) {
            this.contacts = JSON.parse(savedContacts);
        }
    }

    saveContacts() {
        localStorage.setItem('safetyContacts', JSON.stringify(this.contacts));
    }

    renderContacts() {
        const contactsList = document.getElementById('contacts-list');
        contactsList.innerHTML = '';

        if (this.contacts.length === 0) {
            contactsList.innerHTML = '<p class="no-contacts">No trusted contacts added yet</p>';
            return;
        }

        this.contacts.forEach((contact, index) => {
            const contactItem = document.createElement('div');
            contactItem.className = 'contact-item';
            contactItem.innerHTML = `
                <div class="contact-info">
                    <h3>${contact.name}</h3>
                    <p>${contact.phone}</p>
                </div>
                <button class="remove-btn" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            contactsList.appendChild(contactItem);
        });
    }

    setupEventListeners() {
        // Add contact button
        document.getElementById('add-contact-btn').addEventListener('click', () => {
            this.showContactForm();
        });

        // Remove contact buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-btn')) {
                const index = e.target.closest('.remove-btn').getAttribute('data-index');
                this.removeContact(index);
            }
        });
    }

    showContactForm() {
        if (this.contactForm) {
            this.contactForm.remove();
        }

        this.contactForm = document.createElement('div');
        this.contactForm.className = 'contact-form';
        this.contactForm.innerHTML = `
            <div class="form-container">
                <h3>Add Trusted Contact</h3>
                <div class="form-group">
                    <label for="contact-name">Name</label>
                    <input type="text" id="contact-name" placeholder="Contact name">
                </div>
                <div class="form-group">
                    <label for="contact-phone">Phone Number</label>
                    <input type="tel" id="contact-phone" placeholder="+1234567890">
                </div>
                <div class="form-actions">
                    <button id="cancel-contact">Cancel</button>
                    <button id="save-contact">Save</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.contactForm);

        // Form event listeners
        document.getElementById('cancel-contact').addEventListener('click', () => {
            this.contactForm.remove();
        });

        document.getElementById('save-contact').addEventListener('click', () => {
            this.addContact();
        });
    }

    addContact() {
        const name = document.getElementById('contact-name').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();

        if (!name || !phone) {
            alert('Please fill in all fields');
            return;
        }

        this.contacts.push({ name, phone });
        this.saveContacts();
        this.renderContacts();
        this.contactForm.remove();
        emergencyService.addContact({ name, phone });
    }

    removeContact(index) {
        if (confirm('Remove this trusted contact?')) {
            this.contacts.splice(index, 1);
            this.saveContacts();
            this.renderContacts();
            emergencyService.removeContact(index);
        }
    }
}

const contactsManager = new ContactsManager();
document.addEventListener('DOMContentLoaded', () => {
    contactsManager.init();
});