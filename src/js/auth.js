class AuthService {
    constructor() {
        this.currentUser = null;
    }

    init() {
        this.checkAuthState();
        this.setupEventListeners();
    }

    checkAuthState() {
        const user = localStorage.getItem('safetyAppUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.updateUI(true);
        } else {
            this.showLoginForm();
        }
    }

    setupEventListeners() {
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });
    }

    showLoginForm() {
        const loginForm = document.createElement('div');
        loginForm.className = 'auth-modal';
        loginForm.innerHTML = `
            <div class="auth-container">
                <h2>SafetyGuard Login</h2>
                <div class="auth-form">
                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" placeholder="your@email.com">
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" placeholder="••••••••">
                    </div>
                    <button id="login-btn">Login</button>
                    <button id="register-btn">Register</button>
                </div>
            </div>
        `;

        document.body.appendChild(loginForm);

        document.getElementById('login-btn').addEventListener('click', () => {
            this.handleLogin();
        });

        document.getElementById('register-btn').addEventListener('click', () => {
            this.showRegistrationForm();
        });
    }

    showRegistrationForm() {
        const authModal = document.querySelector('.auth-modal');
        authModal.innerHTML = `
            <div class="auth-container">
                <h2>Create Account</h2>
                <div class="auth-form">
                    <div class="form-group">
                        <label for="register-name">Full Name</label>
                        <input type="text" id="register-name" placeholder="Your Name">
                    </div>
                    <div class="form-group">
                        <label for="register-email">Email</label>
                        <input type="email" id="register-email" placeholder="your@email.com">
                    </div>
                    <div class="form-group">
                        <label for="register-phone">Phone Number</label>
                        <input type="tel" id="register-phone" placeholder="+1234567890">
                    </div>
                    <div class="form-group">
                        <label for="register-password">Password</label>
                        <input type="password" id="register-password" placeholder="••••••••">
                    </div>
                    <button id="complete-register">Register</button>
                    <button id="back-to-login">Back to Login</button>
                </div>
            </div>
        `;

        document.getElementById('complete-register').addEventListener('click', () => {
            this.handleRegistration();
        });

        document.getElementById('back-to-login').addEventListener('click', () => {
            this.showLoginForm();
        });
    }

    handleLogin() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // In a real app, this would call an authentication API
        this.currentUser = {
            email,
            name: email.split('@')[0] // Simple demo - in real app would get from API
        };

        localStorage.setItem('safetyAppUser', JSON.stringify(this.currentUser));
        document.querySelector('.auth-modal').remove();
        this.updateUI(true);
    }

    handleRegistration() {
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const phone = document.getElementById('register-phone').value.trim();
        const password = document.getElementById('register-password').value.trim();

        if (!name || !email || !phone || !password) {
            alert('Please fill in all fields');
            return;
        }

        // In a real app, this would call a registration API
        this.currentUser = { name, email, phone };
        localStorage.setItem('safetyAppUser', JSON.stringify(this.currentUser));
        document.querySelector('.auth-modal').remove();
        this.updateUI(true);
    }

    logout() {
        localStorage.removeItem('safetyAppUser');
        this.currentUser = null;
        this.updateUI(false);
        this.showLoginForm();
    }

    updateUI(isAuthenticated) {
        const authElements = document.querySelectorAll('.auth-only');
        authElements.forEach(el => {
            el.style.display = isAuthenticated ? 'block' : 'none';
        });
    }
}

const authService = new AuthService();
document.addEventListener('DOMContentLoaded', () => {
    authService.init();
});