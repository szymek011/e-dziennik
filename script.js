// Konfiguracja Firebase
const firebaseConfig = {
apiKey: "AIzaSyCtn4fGznbbw9omCQd1TbeOlUBQr1ESIrc", 
authDomain: "obowiazki-domowe.firebaseapp.com", 
projectId: "obowiazki-domowe", 
storageBucket: "obowiazki-domowe.appspot.com", 
messagingSenderId: "415821973840", 
appId: "1:415821973840:web:d57e4c84dfbacc1114c455"
};

// Inicjalizacja Firebase i Firestore
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Dodawanie ucznia
document.getElementById('form-uczen').addEventListener('submit', async function(event) {
    event.preventDefault();
    const imie = document.getElementById('uczen-imie').value;
    const nazwisko = document.getElementById('uczen-nazwisko').value;

    try {
        await db.collection('uczniowie').add({ imie, nazwisko });
        alert(`Dodano ucznia: ${imie} ${nazwisko}`);
        document.getElementById('form-uczen').reset();
    } catch (error) {
        console.error("Błąd przy dodawaniu ucznia:", error);
    }
});

// Dodawanie oceny
document.getElementById('form-ocena').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczen = document.getElementById('uczen-ocena').value;
    const przedmiot = document.getElementById('przedmiot').value;
    const ocena = parseInt(document.getElementById('ocena').value);

    try {
        await db.collection('oceny').add({ uczen, przedmiot, ocena });
        alert(`Dodano ocenę dla ${uczen}: ${ocena} z ${przedmiot}`);
        document.getElementById('form-ocena').reset();
    } catch (error) {
        console.error("Błąd przy dodawaniu oceny:", error);
    }
});

// Dodawanie obecności
document.getElementById('form-obecnosc').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczen = document.getElementById('uczen-obecnosc').value;
    const obecnosc = document.getElementById('obecnosc').value;

    try {
        await db.collection('obecnosci').add({ uczen, obecnosc });
        alert(`Dodano obecność dla ${uczen}: ${obecnosc}`);
        document.getElementById('form-obecnosc').reset();
    } catch (error) {
        console.error("Błąd przy dodawaniu obecności:", error);
    }
});

// Dodawanie uwagi
document.getElementById('form-uwaga').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczen = document.getElementById('uczen-uwaga').value;
    const uwaga = document.getElementById('uwaga').value;

    try {
        await db.collection('uwagi').add({ uczen, uwaga });
        alert(`Dodano uwagę dla ${uczen}`);
        document.getElementById('form-uwaga').reset();
    } catch (error) {
        console.error("Błąd przy dodawaniu uwagi:", error);
    }
});

// Dodawanie usprawiedliwienia
document.getElementById('form-usprawiedliwienie').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczen = document.getElementById('uczen-usprawiedliwienie').value;
    const usprawiedliwienie = document.getElementById('usprawiedliwienie').value;

    try {
        await db.collection('usprawiedliwienia').add({ uczen, usprawiedliwienie });
        alert(`Dodano usprawiedliwienie dla ${uczen}`);
        document.getElementById('form-usprawiedliwienie').reset();
    } catch (error) {
        console.error("Błąd przy dodawaniu usprawiedliwienia:", error);
    }
});
