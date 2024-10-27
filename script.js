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

// Inicjalizacja Firebase i Firestore
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Funkcja dodawania ucznia
document.getElementById('form-uczen').addEventListener('submit', async function(event) {
    event.preventDefault();
    const imie = document.getElementById('uczen-imie').value;
    const nazwisko = document.getElementById('uczen-nazwisko').value;

    try {
        await db.collection('uczniowie').add({ imie, nazwisko });
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
        document.getElementById('form-uwaga').reset();
    } catch (error) {
        console.error("Błąd przy dodawaniu uwagi:", error);
    }
});

// Dodawanie usprawiedliwienia
document.getElementById('form-usprawiedliwienie').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczenId = document.getElementById('uczen-usprawiedliwienie').value;
    const usprawiedliwienie = document.getElementById('usprawiedliwienie').value;

    try {
        await db.collection('usprawiedliwienia').add({ uczenId, usprawiedliwienie });
        alert(`Dodano usprawiedliwienie dla ucznia ID: ${uczenId}`);
        document.getElementById('form-usprawiedliwienie').reset();
    } catch (error) {
        console.error("Błąd przy dodawaniu usprawiedliwienia:", error);
    }
});


// Naładowanie uczniów na stronie
dodajUczniowDoSelect();

// Funkcja przeglądania ocen
document.getElementById('form-przeglad-ocen').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczenId = document.getElementById('uczen-przeglad').value;

    const ocenyLista = document.getElementById('oceny-lista');
    ocenyLista.innerHTML = ''; // Czyści poprzednie oceny

    try {
        const querySnapshot = await db.collection('oceny').where('uczenId', '==', uczenId).get();
        if (querySnapshot.empty) {
            ocenyLista.innerHTML = 'Brak ocen dla tego ucznia.';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const ocenaElement = document.createElement('p');
            ocenaElement.textContent = `Ocena: ${data.ocena} z ${data.przedmiot}`;
            ocenyLista.appendChild(ocenaElement);
        });
    } catch (error) {
        console.error("Błąd przy pobieraniu ocen:", error);
    }
});

// Funkcja dodająca uczniów do select w przeglądzie ocen
async function dodajUczniowDoSelectPrzeglad() {
    const select = document.getElementById('uczen-przeglad');

    try {
        const querySnapshot = await db.collection('uczniowie').get();
        select.innerHTML = ''; // Czyści istniejące opcje
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const option = document.createElement('option');
            option.value = doc.id; // ID ucznia
            option.textContent = `${data.imie} ${data.nazwisko}`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Błąd przy pobieraniu uczniów:", error);
    }
}

// Wywołanie funkcji, aby naładować uczniów
dodajUczniowDoSelectPrzeglad();

async function dodajUczniowDoSelectPrzeglad() {
    const select = document.getElementById('uczen-przeglad');

    try {
        const querySnapshot = await db.collection('uczniowie').get();
        select.innerHTML = ''; // Czyści istniejące opcje
        if (querySnapshot.empty) {
            console.log("Brak uczniów w bazie danych.");
            return;
        }
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const option = document.createElement('option');
            option.value = doc.id; // ID ucznia
            option.textContent = `${data.imie} ${data.nazwisko}`;
            select.appendChild(option);
        });
        console.log("Uczniowie załadowani:", select.innerHTML);
    } catch (error) {
        console.error("Błąd przy pobieraniu uczniów:", error);
    }
}


document.getElementById('form-przeglad-ocen').addEventListener('submit', async function(event) {
    event.preventDefault();
    const uczenId = document.getElementById('uczen-przeglad').value;

    const ocenyLista = document.getElementById('oceny-lista');
    ocenyLista.innerHTML = ''; // Czyści poprzednie oceny

    try {
        const querySnapshot = await db.collection('oceny').where('uczenId', '==', uczenId).get();
        if (querySnapshot.empty) {
            ocenyLista.innerHTML = 'Brak ocen dla tego ucznia.';
            console.log("Brak ocen dla ucznia o ID:", uczenId);
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const ocenaElement = document.createElement('p');
            ocenaElement.textContent = `Ocena: ${data.ocena} z ${data.przedmiot}`;
            ocenyLista.appendChild(ocenaElement);
            console.log("Pobrana ocena:", data);
        });
    } catch (error) {
        console.error("Błąd przy pobieraniu ocen:", error);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Twoja logika
    sendResponse({ success: true });
    return true; // Oznacza, że odpowiedź jest asynchroniczna
});

try {
    // Kod do pobrania danych
} catch (error) {
    console.error("Błąd:", error);
}

firebase.initializeApp(firebaseConfig).then(() => {
    console.log("Firebase pomyślnie zainicjalizowany");
}).catch(error => {
    console.error("Błąd podczas inicjalizacji Firebase:", error);
});
