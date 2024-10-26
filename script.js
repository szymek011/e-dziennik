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

// Funkcja dodawania oceny do Firestore
document.getElementById('form-ocena').addEventListener('submit', async function(event) {
    event.preventDefault(); // Zapobiega przeładowaniu strony po wysłaniu formularza
    const uczen = document.getElementById('uczen-ocena').value;
    const przedmiot = document.getElementById('przedmiot').value;
    const ocena = document.getElementById('ocena').value;

    try {
        // Zapis oceny do Firestore
        await db.collection('oceny').add({
            uczen: uczen,
            przedmiot: przedmiot,
            ocena: parseInt(ocena) // Zamienia ocenę na liczbę całkowitą
        });
        alert(`Dodano ocenę dla ${uczen}: ${ocena} z ${przedmiot}`);
        document.getElementById('form-ocena').reset(); // Czyści formularz po dodaniu oceny
        wyswietlOceny(); // Aktualizuje listę ocen na stronie
    } catch (error) {
        console.error("Błąd przy zapisie do Firestore:", error);
    }
});

// Funkcja wyświetlania ocen
async function wyswietlOceny() {
    const listaOcen = document.getElementById('lista-ocen');
    listaOcen.innerHTML = '<h3>Oceny</h3>'; // Czyści istniejące dane przed dodaniem nowych

    try {
        const querySnapshot = await db.collection('oceny').get();
        querySnapshot.forEach((doc) => {
            const ocenaData = doc.data();
            listaOcen.innerHTML += `<p>${ocenaData.uczen} - ${ocenaData.przedmiot}: ${ocenaData.ocena}</p>`;
        });
    } catch (error) {
        console.error("Błąd przy pobieraniu danych z Firestore:", error);
    }
}

// Wyświetlenie ocen przy załadowaniu strony
wyswietlOceny();
