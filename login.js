// Konfiguracja Firebase (upewnij się, że masz tę część w swoim pliku)
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

async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Użytkownik pomyślnie zalogowany, przekieruj do administracja.html
        window.location.href = 'administracja.html';
    } catch (error) {
        console.error('Błąd przy logowaniu:', error);
        alert('Błąd przy logowaniu: ' + error.message);
    }
}
