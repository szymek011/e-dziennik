// Konfiguracja Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCtn4fGznbbw9omCQd1TbeOlUBQr1ESIrc",
    authDomain: "obowiazki-domowe.firebaseapp.com",
    projectId: "obowiazki-domowe",
    storageBucket: "obowiazki-domowe.appspot.com",
    messagingSenderId: "415821973840",
    appId: "1:415821973840:web:d57e4c84dfbacc1114c455"
};

// Inicjalizacja Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();




document.getElementById('form-uczen').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Pobierz dane z formularza
    const imie = document.getElementById('imie').value;
    const nazwisko = document.getElementById('nazwisko').value;

    // Sprawdź, czy baza uczniów istnieje w localStorage
    let uczniowie = JSON.parse(localStorage.getItem('uczniowie')) || [];

    // Dodaj nowego ucznia do bazy
    uczniowie.push({ imie, nazwisko });
    localStorage.setItem('uczniowie', JSON.stringify(uczniowie));

    alert(`Dodano ucznia: ${imie} ${nazwisko}`);
    document.getElementById('form-uczen').reset();
});

document.getElementById('form-ocena').addEventListener('submit', function(event) {
    event.preventDefault();

    const uczen = document.getElementById('uczen-ocena').value;
    const przedmiot = document.getElementById('przedmiot').value;
    const ocena = document.getElementById('ocena').value;

    let oceny = JSON.parse(localStorage.getItem('oceny')) || [];
    oceny.push({ uczen, przedmiot, ocena });
    localStorage.setItem('oceny', JSON.stringify(oceny));

    alert(`Dodano ocenę dla ${uczen}: ${ocena} z ${przedmiot}`);
    document.getElementById('form-ocena').reset();
});

document.getElementById('form-obecnosc').addEventListener('submit', function(event) {
    event.preventDefault();

    const uczen = document.getElementById('uczen-obecnosc').value;
    const data = document.getElementById('data').value;
    const status = document.getElementById('obecnosc').value;

    let obecnosci = JSON.parse(localStorage.getItem('obecnosci')) || [];
    obecnosci.push({ uczen, data, status });
    localStorage.setItem('obecnosci', JSON.stringify(obecnosci));

    alert(`Dodano obecność dla ${uczen} na dzień ${data}: ${status}`);
    document.getElementById('form-obecnosc').reset();
});

function wyswietlDane() {
    const listaOcen = document.getElementById('lista-ocen');
    const listaObecnosci = document.getElementById('lista-obecnosci');

    const oceny = JSON.parse(localStorage.getItem('oceny')) || [];
    const obecnosci = JSON.parse(localStorage.getItem('obecnosci')) || [];

    listaOcen.innerHTML = '<h3>Oceny</h3>';
    oceny.forEach(ocena => {
        listaOcen.innerHTML += `<p>${ocena.uczen} - ${ocena.przedmiot}: ${ocena.ocena}</p>`;
    });

    listaObecnosci.innerHTML = '<h3>Obecności</h3>';
    obecnosci.forEach(obecnosc => {
        listaObecnosci.innerHTML += `<p>${obecnosc.uczen} - ${obecnosc.data}: ${obecnosc.status}</p>`;
    });
}

// Dodawanie ocen do Firestore
document.getElementById('form-ocena').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczen = document.getElementById('uczen-ocena').value;
    const przedmiot = document.getElementById('przedmiot').value;
    const ocena = document.getElementById('ocena').value;

    await db.collection('oceny').add({
        uczen,
        przedmiot,
        ocena
    });

    alert(`Dodano ocenę dla ${uczen}: ${ocena} z ${przedmiot}`);
    document.getElementById('form-ocena').reset();
    wyswietlDane(); // Odczytaj ponownie dane
});

// Odczytywanie danych z Firestore
async function wyswietlDane() {
    const listaOcen = document.getElementById('lista-ocen');
    listaOcen.innerHTML = '<h3>Oceny</h3>';
    const snapshot = await db.collection('oceny').get();
    snapshot.forEach(doc => {
        const data = doc.data();
        listaOcen.innerHTML += `<p>${data.uczen} - ${data.przedmiot}: ${data.ocena}</p>`;
    });
}

// Wywołaj funkcję przy załadowaniu strony
document.addEventListener('DOMContentLoaded', wyswietlDane);
