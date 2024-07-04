document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration_form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('toggle_password');
    const buttonRegister = document.getElementById('button_register');
    const strengthBar = document.querySelector('.strength_bar');
    const hints = document.querySelectorAll('.hint');

    function calculateStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 20;
        if (password.match(/[A-Z]/)) strength += 20;
        if (password.match(/[a-z]/)) strength += 20;
        if (password.match(/[0-9]/)) strength += 20;
        if (password.match(/[^A-Za-z0-9\s]/)) strength += 20;
        return strength;
    }

    function updateStrengthMeter() {
        const strength = calculateStrength(passwordInput.value);
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = getStrengthColor(strength);
    }

    function getStrengthColor(strength) {
        if (strength > 80) return '#10b981';
        if (strength > 60) return '#fbbf24';
        return '#ef4444';
    }

    function updateHints() {
        const password = passwordInput.value;
        hints.forEach(hint => {
            const type = hint.dataset.hint;
            let isValid = false;
            switch (type) {
                case 'length': isValid = password.length >= 8; break;
                case 'uppercase': isValid = /[A-Z]/.test(password); break;
                case 'lowercase': isValid = /[a-z]/.test(password); break;
                case 'number': isValid = /[0-9]/.test(password); break;
                case 'special': isValid = /[^A-Za-z0-9]/.test(password); break;
                case 'no_space': isValid = !password.includes(' '); break;
            }
            hint.classList.toggle('valid', isValid);
        });
    }

    function validateForm() {
        const isValid = calculateStrength(passwordInput.value) === 100 &&
            usernameInput.value.length > 0 &&
            /^[a-zA-Z0-9]+$/.test(usernameInput.value);
        buttonRegister.disabled = !isValid;
    }

    usernameInput.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
        validateForm();
    });

    passwordInput.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/g, '');
        updateStrengthMeter();
        updateHints();
        validateForm();
    });

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        this.classList.toggle('show', type === 'text');
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        // send the form data to a server
        console.log('Form submitted:', {
            username: usernameInput.value,
            password: passwordInput.value
        });
    });
});