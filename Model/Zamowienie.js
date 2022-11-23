// =================================================================================================
// Utworzenie modelu (Odpowiedzialny za to, co może się znajdować w naszej bazie danych)
// =================================================================================================

// Import mongoose do naszego serwerka (zapraszamy go do obecnego pliku Zamowienie.js)
const mongoose = require('mongoose')

// Przypisujemy do "Schema" nasze mongoose.Schema, opisujące wszystkie nasze pozycje wraz z wartosciami
// To wszystko jest od strony serwera, następuje tam sprawdzenie danych, gdy jest git, przechodzi dalej (do bazy danych)
// W inny przypadku wypluje błąd
const zamowienieSchema = mongoose.Schema({
    Imie: {
        // Wybieramy typ, czyli String
        type: String,
        // Wybieramy czy pole jest wymagane (true, czyli jest)
        required: true,
        minLength: 3,
    },
    Nazwisko: {
        type: String,
        required: true,
        minLength: 3,
      },
      email: {
        type: String,
        required: true,
      },
      Numer_telefonu: {
        type: String,
        required: true,
      },
      Adres: {
        type: String,
        required: true,
      },
      Kod_pocztowy: {
        type: String,
        required: true,
      },
      Kraj: {
        type: String,
        required: true,
      },
      Opcja_platnosci: {
        type: String,
        required: true,
      },
      Numer_karty: {
        type: Number,
        required: true,
      },
      Kod_bezpieczenstwa: {
        type: Number,
        required: true,
      },
      Wlasciciel_karty: {
        type: String,
        required: true,
      },
})

// Eksportujemy nasz model, czyli całość którą mamy powyżej
module.exports = mongoose.model('Zamowienie', zamowienieSchema);