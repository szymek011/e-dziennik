// Konfiguracja Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');

document.getElementById('showRegister').addEventListener('click', () => {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    formTitle.textContent = 'Rejestracja';
});

document.getElementById('showLogin').addEventListener('click', () => {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    formTitle.textContent = 'Logowanie';
});

// Sprawdzenie stanu zalogowania
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Użytkownik zalogowany
        db.collection("users").doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                const userRole = doc.data().role;
                if (userRole === 'nauczyciel') {
                    window.location.href = "nauczyciel.html"; // Strona dla nauczycieli
                } else {
                    window.location.href = "uczen.html"; // Strona dla uczniów
                }
            }
        });
    } else {
        // Użytkownik niezalogowany, pokaż formularz logowania
        loginForm.classList.remove('hidden');
        formTitle.textContent = 'Logowanie';
    }
});

// Logowanie
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Użytkownik zalogowany:', userCredential.user);
        })
        .catch((error) => {
            console.error("Błąd przy logowaniu:", error);
        });
});

// Rejestracja
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('role').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Użytkownik zarejestrowany:', user);

            // Możesz dodać rolę do bazy danych Firestore
            db.collection("users").doc(user.uid).set({
                role: role
            }).then(() => {
                console.log("Rola zapisana w bazie danych!");
                // Przekierowanie po rejestracji
                if (role === 'nauczyciel') {
                    window.location.href = "nauczyciel.html"; // Strona dla nauczycieli
                } else {
                    window.location.href = "uczen.html"; // Strona dla uczniów
                }
            }).catch(error => {
                console.error("Błąd przy zapisywaniu roli:", error);
            });
        })
        .catch((error) => {
            console.error("Błąd przy rejestracji:", error);
        });
});
