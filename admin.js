firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        db.collection("users").doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                const userRole = doc.data().role;
                if (userRole !== 'nauczyciel') {
                    // Jeśli użytkownik nie jest nauczycielem, przekieruj go
                    window.location.href = "uczen.html"; // Lub inna strona
                }
            }
        }).catch((error) => {
            console.error("Błąd przy pobieraniu roli:", error);
        });
    } else {
        // Użytkownik niezalogowany, przekieruj na stronę logowania
        window.location.href = "login.html";
    }
});
