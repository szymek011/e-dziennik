// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtn4fGznbbw9omCQd1TbeOlUBQr1ESIrc",
  authDomain: "obowiazki-domowe.firebaseapp.com",
  projectId: "obowiazki-domowe",
  storageBucket: "obowiazki-domowe.appspot.com",
  messagingSenderId: "415821973840",
  appId: "1:415821973840:web:d57e4c84dfbacc1114c455",
  measurementId: "G-XJFKK884VC"
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

async function registerTeacher(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Użytkownik został pomyślnie zarejestrowany, przekieruj do administracja.html
        window.location.href = 'administracja.html';
    } catch (error) {
        console.error('Błąd przy rejestracji:', error);
        alert('Błąd przy rejestracji: ' + error.message);
    }
}
