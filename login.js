// Konfiguracja Firebase (upewnij się, że masz tę część w swoim pliku)
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

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Użytkownik zalogowany:', user);
            // Przekierowanie w zależności od roli
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
        })
        .catch((error) => {
            console.error("Błąd przy logowaniu:", error);
        });
});
