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

// Funkcja dodawania ucznia
document.getElementById('form-uczen').addEventListener('submit', async function(event) {
    event.preventDefault();
    const imie = document.getElementById('uczen-imie').value;
    const nazwisko = document.getElementById('uczen-nazwisko').value;

    try {
        const docRef = await db.collection('uczniowie').add({ imie, nazwisko });
        alert(`Dodano ucznia: ${imie} ${nazwisko}`);
        document.getElementById('form-uczen').reset();
        dodajUczniowDoSelect(); // Odśwież listę uczniów
    } catch (error) {
        console.error("Błąd przy dodawaniu ucznia:", error);
    }
});

// Funkcja dodająca uczniów do rozwijanych list
async function dodajUczniowDoSelect() {
    const selectElements = [
        document.getElementById('uczen-ocena'),
        document.getElementById('uczen-obecnosc'),
        document.getElementById('uczen-uwaga'),
        document.getElementById('uczen-usprawiedliwienie')
    ];

    try {
        const querySnapshot = await db.collection('uczniowie').get();
        const uczniowie = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            uczniowie.push({ id: doc.id, imie: data.imie, nazwisko: data.nazwisko });
        });

        selectElements.forEach(select => {
            select.innerHTML = ''; // Czyści istniejące opcje
            uczniowie.forEach(uczen => {
                const option = document.createElement('option');
                option.value = uczen.id;
                option.textContent = `${uczen.imie} ${uczen.nazwisko}`;
                select.appendChild(option);
            });
        });
    } catch (error) {
        console.error("Błąd przy pobieraniu uczniów:", error);
    }
}

// Dodawanie oceny
document.getElementById('form-ocena').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczenId = document.getElementById('uczen-ocena').value;
    const przedmiot = document.getElementById('przedmiot').value;
    const ocena = parseInt(document.getElementById('ocena').value);

    try {
        await db.collection('oceny').add({ uczenId, przedmiot, ocena });
        alert(`Dodano ocenę dla ucznia ID: ${uczenId}: ${ocena} z ${przedmiot}`);
        document.getElementById('form-ocena').reset();
    } catch (error) {
        console.error("Błąd przy dodawaniu oceny:", error);
    }
});

// Dodawanie obecności
document.getElementById('form-obecnosc').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczenId = document.getElementById('uczen-obecnosc').value;
    const obecnosc = document.getElementById('obecnosc').value;

    try {
        await db.collection('obecnosci').add({ uczenId, obecnosc });
        alert(`Dodano obecność dla ucznia ID: ${uczenId}: ${obecnosc}`);
        document.getElementById('form-obecnosc').reset();
    } catch (error) {
        console.error("Błąd przy dodawaniu obecności:", error);
    }
});

// Dodawanie uwagi
document.getElementById('form-uwaga').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczenId = document.getElementById('uczen-uwaga').value;
    const uwaga = document.getElementById('uwaga').value;

    try {
        await db.collection('uwagi').add({ uczenId, uwaga });
        alert(`Dodano uwagę dla ucznia ID: ${uczenId}`);
        document.getElementById('
