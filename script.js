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

async function login(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Pobierz rolę użytkownika z Firestore
        const doc = await firebase.firestore().collection('users').doc(user.uid).get();
        if (doc.exists) {
            const userData = doc.data();
            if (userData.role === 'nauczyciel') {
                window.location.href = 'administrator.html';
            } else {
                window.location.href = 'uczen.html'; // lub inna strona dla ucznia
            }
        }
    } catch (error) {
        console.error('Błąd przy logowaniu:', error);
        alert('Błąd przy logowaniu: ' + error.message);
    }
}

function handleLogin(event) {
    event.preventDefault(); // Zapobiega przeładowaniu strony
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password); // Wywołuje funkcję logowania
}

async function register(email, password) {
    const role = document.getElementById('role').value; // Pobierz rolę

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Zapisz rolę użytkownika w Firestore
        await firebase.firestore().collection('users').doc(user.uid).set({
            email: email,
            role: role
        });

        // Użytkownik pomyślnie zarejestrowany, przekieruj do administracja.html
        window.location.href = 'administracja.html';
    } catch (error) {
        console.error('Błąd przy rejestracji:', error);
        alert('Błąd przy rejestracji: ' + error.message);
    }
}

function handleRegister(event) {
    event.preventDefault(); // Zapobiega przeładowaniu strony
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    register(email, password); // Wywołuje funkcję rejestracji
}

const db = firebase.firestore();

// Funkcja do dodawania ucznia
function addStudent(name) {
    db.collection("students").add({
        name: name,
        attendance: [],
        grades: [],
        remarks: [],
        excuses: []
    }).then(() => {
        console.log("Uczeń dodany!");
    }).catch(error => {
        console.error("Błąd przy dodawaniu ucznia:", error);
    });
}

// Funkcja do dodawania oceny
function addGrade(studentId, grade) {
    db.collection("students").doc(studentId).update({
        grades: firebase.firestore.FieldValue.arrayUnion(grade)
    }).then(() => {
        console.log("Ocena dodana!");
    }).catch(error => {
        console.error("Błąd przy dodawaniu oceny:", error);
    });
}

// Funkcja do dodawania obecności
function addAttendance(studentId, date, status) {
    db.collection("students").doc(studentId).update({
        attendance: firebase.firestore.FieldValue.arrayUnion({ date: date, status: status })
    }).then(() => {
        console.log("Obecność dodana!");
    }).catch(error => {
        console.error("Błąd przy dodawaniu obecności:", error);
    });
}

// Funkcja do dodawania uwag
function addRemark(studentId, remark) {
    db.collection("students").doc(studentId).update({
        remarks: firebase.firestore.FieldValue.arrayUnion(remark)
    }).then(() => {
        console.log("Uwagi dodane!");
    }).catch(error => {
        console.error("Błąd przy dodawaniu uwag:", error);
    });
}

// Funkcja do dodawania usprawiedliwienia
function addExcuse(studentId, excuse) {
    db.collection("students").doc(studentId).update({
        excuses: firebase.firestore.FieldValue.arrayUnion(excuse)
    }).then(() => {
        console.log("Usprawiedliwienie dodane!");
    }).catch(error => {
        console.error("Błąd przy dodawaniu usprawiedliwienia:", error);
    });
}

// Funkcja do pobierania uczniów
function getStudents() {
    db.collection("students").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
    }).catch(error => {
        console.error("Błąd przy pobieraniu uczniów:", error);
    });
}

// Przykład wywołania funkcji
addStudent("Jan Kowalski");
addGrade("studentId", 5);
addAttendance("studentId", "2024-10-26", "obecny");
addRemark("studentId", "Wszystko w porządku");
addExcuse("studentId", "Choroba");
getStudents();
