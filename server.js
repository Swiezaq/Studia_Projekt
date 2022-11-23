// =================================================================================================
// Uruchomienie serwera
// =================================================================================================

// Importujemy model, pokazując scieżkę z której ma zassać importa
const Zamowienie = require('./Model/Zamowienie');

// Zasysamy pliczek connect_db.js
require('./connect_db')

// Zaimportowanie express
const express = require('express')

// Zainicjowanie express
const app = express()

// Path - umożliwiamy naszemu node.js śmiganie na plikach,
// używa się do operacji związanych ze ścieżkami plików w aplikacji
const path = require('path')

// Ustawienie stałej wartości portu = 3000
const PORT = 3000

// Import connect_db do obecnego pliku
const connectDB = require('./connect_db')

// Zasysamy nową paczuszkę
var bodyParser = require('body-parser')

// Dekoder URL
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Express wsio co i jak
// http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express

// Ustawiamy silnik szablonów
app.set("view engine", "ejs")

// Wskazujemy gdzie są pliczki / - wskazuje po prostu obecny folder
// To jest GET tylko w wykonaniu frameworku express
// __dirname, "nazwa pliku" odnośimy się do ścieżki z taką nazwą pliku
app.use('/Public', express.static(path.join(__dirname, 'Public')))

// Zasysamy nasz html ze stronką formularza pod postacią index.ejs

app.get('/',(req, res)=>{
    res.render('pages/index', {})
})

// Zasysamy nasz html ze stronką admina pod postacią admin.ejs
app.get('/admin',(req, res)=>{
    res.render('pages/admin', {})
})

app.post('/', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
    // Tworzymy nowy model (new) za pomocą schemy którą ustawiliśmy w Zamowienie.js
    const noweZamowienie = new Zamowienie(req.body);
    // Zapisujemy zamowienie wraz ze schemą w bazie (funkcja Mongoose)
    noweZamowienie.save()
    // Po przeslaniu formularza, wczytujemy na nowo nasz index.html
    .then(item => {
        res.sendFile(path.join(__dirname+'/views/pages/index.ejs',));        
        })
        
        // Gdy wywali błąd, wyswietla poniższy tekst + czego dotyczy błąd (err.message)
        .catch(err => {
        res.status(400).send("Unable to save to database"+" "+`${err.message}: `);
        });  
    }
);

// Tworzymy routa do wysyłania zamówienia
app.get('/zamowienia',(req, res)=>{
    console.log('zamowienia')
    // Funckja find - wyszukuje interesujące nas pozycje
    let zamowieniePobierz = Zamowienie.find({}, (err,zamowieniaOtrzymane)=>{
        if (err){
            console.log(err.message)
        }
        else{
            // Gdy nie ma błędu, wysyłamy odpowiedź z zamówieniami z databazy na przeglądarkę
            res.json(zamowieniaOtrzymane)
        }
    })
})


// Łączenie z bazą danych i odpalenie programu
// Robimy machniu funkcji, "async" która dopiero po jej zakończeniu puszcza kolejną funkcję
const start = async()=>{
    try {
        // Czekaj na connectDB, jak się uda to śmiga kolejny krok, czyli app.listen
        await connectDB()
        console.log('Server is connected to database...')

        // Ruszyła maszyna, pokazuje to console logiem
        app.listen(PORT,()=>{console.log(`Server is listening ${PORT}...`)})
    } catch (error) {
        // Wyświetlamy error w konsoli wraz z treścią błędu, gdy coś się wykrzaczy
        console.log(error.message)
    }
}

// Wysołujemy funkcję "Start" i modlimy się, aby zadziałała
start()

// Dirname podaje nam ścieżkę pliku
console.log(__dirname, 'Public')
