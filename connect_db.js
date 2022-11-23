// =================================================================================================
// Połączenie z bazą DB
// =================================================================================================

// Zasysamy mongoose do naszego serwerka
const mongoose = require('mongoose')

// Przypisujemy do database adres naszej stronki z bazą danych
// w linku strony, po "[...]mongodb.net/nazwa" wpisujemy nazwe naszej bazy danych na serwerku mongo, czyli u nas ZakupyGTX
const database = 'mongodb+srv://Jan:Kowalski@kolokwiumurz.qnmbadt.mongodb.net/ZakupyGTX?retryWrites=true&w=majority'

// Tworzymy zmienną connectDB która łączy nas z bazą danych mongose
const connectDB = ()=>{
    return mongoose.connect(database)
}

// export modułu do innych plików
module.exports = connectDB