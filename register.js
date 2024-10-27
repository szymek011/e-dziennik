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

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
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
            }).catch(error => {
                console.error("Błąd przy zapisywaniu roli:", error);
            });
        })
        .catch((error) => {
            console.error("Błąd przy rejestracji:", error);
        });
});
