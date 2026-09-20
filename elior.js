const defaultUser = {
    email: 'admin@rodriguevie.com',
    password: '1234'
};

function getUsers() {
    const savedUsers = localStorage.getItem('users');

    if (!savedUsers) {
        localStorage.setItem('users', JSON.stringify([defaultUser]));
        return [defaultUser];
    }

    try {
        const parsedUsers = JSON.parse(savedUsers);
        if (!Array.isArray(parsedUsers) || parsedUsers.length === 0) {
            localStorage.setItem('users', JSON.stringify([defaultUser]));
            return [defaultUser];
        }

        return parsedUsers;
    } catch (error) {
        localStorage.setItem('users', JSON.stringify([defaultUser]));
        return [defaultUser];
    }
}

function showMessage(text, isSuccess = false) {
    const message = document.getElementById('message');
    if (!message) return;
    message.textContent = text;
    message.style.color = isSuccess ? '#d7ffd7' : '#ffd7d7';
}

function getStoredList(key, fallback = []) {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : fallback;
    } catch (error) {
        return fallback;
    }
}

function addStoredRequest(key, payload) {
    const list = getStoredList(key, []);
    list.push(payload);
    localStorage.setItem(key, JSON.stringify(list));
    return list;
}

const form = document.getElementById('connexion');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

if (form && emailInput && passwordInput) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            showMessage('Veuillez remplir tous les champs.');
            return;
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailValid) {
            showMessage('Veuillez entrer une adresse e-mail valide.');
            return;
        }

        const users = getUsers();
        const foundUser = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

        if (!foundUser) {
            showMessage('Identifiants incorrects. Essayez admin@rodriguevie.com / 1234');
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify({ email: foundUser.email }));
        showMessage('Connexion réussie ! Redirection en cours...', true);

        setTimeout(() => {
            window.location.href = 'Index.html';
        }, 1200);
    });
}

const inscriptionForm = document.getElementById('inscription');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const confirmPasswordInput = document.getElementById('confirm-password');

if (inscriptionForm && signupEmailInput && signupPasswordInput && confirmPasswordInput) {
    inscriptionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = signupEmailInput.value.trim();
        const password = signupPasswordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!email || !password || !confirmPassword) {
            showMessage('Veuillez remplir tous les champs.');
            return;
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!emailValid) {
            showMessage('Veuillez entrer une adresse e-mail valide.');
            return;
        }

        if (password.length < 4) {
            showMessage('Le mot de passe doit contenir au moins 4 caractères.');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        const users = getUsers();
        const alreadyExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

        if (alreadyExists) {
            showMessage('Cet e-mail est déjà utilisé.');
            return;
        }

        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify({ email }));
        showMessage('Compte créé avec succès ! Redirection en cours...', true);

        setTimeout(() => {
            window.location.href = 'Index.html';
        }, 1200);
    });
}

const userStatus = document.getElementById('user-status');
const logoutBtn = document.getElementById('logout-btn');
const miniBrandName = document.getElementById('mini-brand-name');
const miniBrandSubtitle = document.getElementById('mini-brand-subtitle');
const miniLogoLetter = document.getElementById('mini-logo-letter');

function updateUserBrand() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    if (miniBrandName) {
        miniBrandName.textContent = currentUser && currentUser.email ? currentUser.email.split('@')[0] : 'Rodriguevie';
    }

    if (miniBrandSubtitle) {
        miniBrandSubtitle.textContent = currentUser && currentUser.email ? 'Compte client' : 'Location van';
    }

    if (miniLogoLetter) {
        miniLogoLetter.textContent = currentUser && currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'R';
    }

    if (userStatus) {
        if (currentUser && currentUser.email) {
            userStatus.textContent = 'Connecté en tant que : ' + currentUser.email;
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
        } else {
            userStatus.textContent = 'Accédez à vos informations et suivez votre activité en toute simplicité.';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }
}

updateUserBrand();

if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        updateUserBrand();
    });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const nom = document.getElementById('nom')?.value.trim();
        const prenom = document.getElementById('prenom')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        const feedback = document.getElementById('contact-message');

        if (!nom || !prenom || !email || !message) {
            if (feedback) {
                feedback.textContent = 'Veuillez remplir tous les champs obligatoires.';
                feedback.style.color = '#b42318';
            }
            return;
        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailValid) {
            if (feedback) {
                feedback.textContent = 'Veuillez entrer une adresse e-mail valide.';
                feedback.style.color = '#b42318';
            }
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const payload = {
            nom,
            prenom,
            email: currentUser && currentUser.email ? currentUser.email : email,
            message,
            createdAt: new Date().toISOString()
        };

        addStoredRequest('contactMessages', payload);

        if (feedback) {
            feedback.textContent = 'Votre message a bien été envoyé. Nous vous répondrons très prochainement.';
            feedback.style.color = '#0f766e';
        }

        contactForm.reset();
    });
}

const visaForm = document.getElementById('visa-form');
if (visaForm) {
    visaForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const selectedProblem = document.querySelector('input[name="visa-problem"]:checked');
        const detail = document.getElementById('visa-detail')?.value.trim();
        const email = document.getElementById('visa-email')?.value.trim();
        const feedback = document.getElementById('visa-message');

        if (!selectedProblem) {
            if (feedback) {
                feedback.textContent = 'Veuillez choisir un type de problème.';
                feedback.style.color = '#b42318';
            }
            return;
        }

        if (!detail || detail.length < 10) {
            if (feedback) {
                feedback.textContent = 'Veuillez décrire votre problème en quelques mots.';
                feedback.style.color = '#b42318';
            }
            return;
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            if (feedback) {
                feedback.textContent = 'Veuillez entrer une adresse e-mail valide.';
                feedback.style.color = '#b42318';
            }
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        const payload = {
            type: selectedProblem.value,
            detail,
            email: currentUser && currentUser.email ? currentUser.email : (email || 'non-renseigné'),
            createdAt: new Date().toISOString()
        };

        addStoredRequest('visaRequests', payload);

        if (feedback) {
            feedback.textContent = 'Votre demande de visa a bien été enregistrée.';
            feedback.style.color = '#0f766e';
        }

        visaForm.reset();
    });
}

