// Przypisujemy do naszej nazwy "guzikZamowienia" guzik z naszego HTML odpowiedzialny za wyświetlanie zamówień
const guzikZamowienia = document.getElementById('Guzik_Zamowieniaaa')

// Przedstawia zassane zamowienia z serwerka
let zamowieniaX;

// Ustawiamy event "kliknięcie" w efekcie którego wywoływana jest funkcja "PokaZamowienia()"
// (e)=> funkcja strzałkowa uruchamiająca wcześniej zdefiniowaną funkcję (inaczej anonimowa)
guzikZamowienia.addEventListener('click', (e)=>{
    PokaZamowienia()
})

// Tworzymy funkcję "PokaZamowienia", wysyła zapytanie do serwera i otrzymujemy w odpowiedzi json, 
// który zamieniany jest w obiekt (czyli zasysamy te nasze zamowienia z bazy danych)
// async - funkcja asynchroniczna,  dzięki niej zamiast iść od góry do dołu w kodzie, 
// Pozwala ona aby funkcja zaczekała, lub odczekała do czasu uzyskania odpowiedzi i dopiero śmigała dalej
async function  PokaZamowienia(){

    // Gdy się pojawi błąd, to robi to co ustawimy, czyli u nas wyświetla w konsoli "console.log(error.message)"
    try {
        // Fetch, API przeglądarkowe, które obsługuje HTTP requesty
        const response = await fetch('/zamowienia')
        // Fetch daje mi responda na serwerku js
        let zamowienia = await response.json()
        zamowieniaX = await zamowienia
        } catch (error) {
        console.log(error.message)
        }

        // Zamieniamy otrzymany obiekt na tablicę (np key to jest id formularza, np "Imie", natomiast Value, to wartość którą tam wpisano, np "Paweł")
        let zamowieniaWyswietl = [];
        for (const[key,value]of Object.entries(zamowieniaX)){
            for(const[key,value2]of Object.entries(value)){
		zamowieniaWyswietl.push(value2)
            }            
        };

        let wiersze = document.getElementById('wiersze');
        let jedenWiersz;

        // Tworzymy naszą tabelę z danymi
        for(let i = 0; i< zamowieniaWyswietl.length; i++){
            
            // Sprawiamy, aby ID było poprawnie wskazywane, dzielimy przez 13
            if(i%13===0){
                jedenWiersz = document.createElement('tr');
                let pierwszaKomorka = document.createElement('td');
                pierwszaKomorka.innerHTML = i/13;
                jedenWiersz.appendChild(pierwszaKomorka);
     
            } else if(i%13!==12){
                let jednaKomorka = document.createElement('td');
                jednaKomorka.innerHTML=zamowieniaWyswietl[i];
                jedenWiersz.appendChild(jednaKomorka);
            }else{
                wiersze.appendChild(jedenWiersz);
            }
        }
}

// ====================================================================================================================
// JS dla strony admina
// ====================================================================================================================


// ======================================= Ustawianie godziny ============================================
// Skrypt tworzący zegarek
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('Czas').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }
  
  // Funkcja dodająca "0" przed pojedyńczą cyferką (czyli mniejsza od 10)
  function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
  }

// Wyświetlenie godzin otwarcia sklepu
const Otwarcie = document.getElementById('Od')
const Zamkniecie = document.getElementById('Do')
const Zatwiedz_Czas = document.getElementById('Zegareczek')

// Ustawiamy ręcznie czas, a następnie klikamy magiczny guziczek
Zatwiedz_Czas.addEventListener('click', (e)=>{
    console.log(Otwarcie.value, Zamkniecie.value)
    localStorage.setItem('Otwarcie',Otwarcie.value)    
    localStorage.setItem('Zamkniecie',Zamkniecie.value) 
    })

// Ustawienie godzin otwarcia sklepu
function Sklep_Status(){
    const Godzina_Owtarcia =  localStorage.getItem('Otwarcie')
    const Godzina_Zamkniecia =  localStorage.getItem('Zamkniecie')
    // Gdy sklep nieczynny to:
    document.getElementById('ALARM').innerHTML = `Sklep nieczynny. <br> Fomularz zostanie rozpatrzony jutro od godziny ${Godzina_Owtarcia}`

    // Pobierany systemową datę (godziny i minut, a następnie oddzielamy je ":"")
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    const godzina =  h + ":" + m

    // Gdy sklep czynny to:
    if (godzina >= Godzina_Owtarcia && godzina <= Godzina_Zamkniecia){
        document.getElementById('Krzykacz').style.backgroundColor='rgb(6, 155, 6)'
        document.getElementById('ALARM').innerHTML = `Sklep czynny do godziny: ${Godzina_Zamkniecia}`
    }
}

// ======================================= Ustawianie ilości sztuk ============================================

// Wyświetlenie ilości sztuk GTX na magazynie
const Ile = document.getElementById('Ile')
const Ile_Ma_Byc = document.getElementById('Ustaw_Ile')
const Zatwiedz_Ilosc = document.getElementById('Ilościomierz')

// Ustawiamy ręcznie ilość sztuk na magazynie, a następnie klikamy magiczny guziczek
Zatwiedz_Ilosc.addEventListener('click', (e)=>{
    console.log(Ile.value, Ile_Ma_Byc.value)

    // Jeśli wincyj lub równo 0, wtedy zapisuje
    if(Ile_Ma_Byc.value >= 0){
        Ile.innerHTML = Ile_Ma_Byc.value
        localStorage.setItem('Ile',Ile_Ma_Byc.value)   
    }
    // Jeśli mniej jak 0, wtedy rzuca w nas alertem
    else if(Ile_Ma_Byc.value < 0){
        alert('Wartość nie może być ujemna!')
    }
    // Jeśli cokolwiek innego, również rzuca w nas alertem
    else  {
        alert('Wprowadź prawidłowe dane!')
    }
    })


function Tester_Zera(){
    let MAGAZYN = localStorage.getItem('Ile')
    if (MAGAZYN == 0){


        // Gdy 0 na magazynie, wyłączamy pole Input
        let x = document.querySelectorAll('Input')
        x.forEach((Wylacz)=>{
            Wylacz.setAttribute('disabled','')              
        }) 
        
        // Gdy 0 na magazynie, wyłączamy pole TextArea
        let y = document.querySelectorAll('TextArea')
        y.forEach((Wylacz)=>{
            Wylacz.setAttribute('disabled','')  
        })

        // Gdy 0 na magazynie, wyłączamy guziczek od zamówień
        let z = document.querySelectorAll('Button')
        z.forEach((Wylacz)=>{
            Wylacz.setAttribute('disabled','')
            document.getElementById('Guzik').style.backgroundColor='red'
        
        })
    }
}

// ====================================================================================================================
// Robocik sprzątajacy
// ====================================================================================================================

function ROBOT(){
// Tworzymy tablicę 2-wymiarową
let coords = [[],[]]
// X i Y, ustawiamy pozycje startowe
let positionX = 5
let positionY = 5

// Ustawienie szansy na to, że robocik się ruszy przy następnym ruchu
const chanceToMove = 0.5;
// Ustawienie szansy na to, czy zmieni kierunek
const changeDirChance = 0.51;

// Deklaracja zmiennych do ruszania się robota
let moving;
let moveRight;
let moveUp;

// Ustawienie granicy po której może się poruszać robocik
function Clamp(num, min, max){
   let  min_num = Math.min(max, num)
   let value = Math.max(min , min_num)
    return value
}

// Funkcja wykonująca ruch w zależności od tego co wylosuje, po osi X
function MoveX(){
    if(moveRight == true){
        positionX++ 
    } else {
        positionX--
    }
}

// Funkcja wykonująca ruch w zależności od tego co wylosuje, po osi Y
function MoveY(){
    if(moveUp == true){
        positionY++
    } else {
        positionY--
    } 
}


// Wszystko co znajduje się w funkcji wykonuje się po zadanym czasie 1s (1000ms)
let pozycja;
setInterval(() => {
    // Ustawiamy kolorek startowy takis sam jak kolor tła
     if(pozycja){
         pozycja.style.backgroundColor='rgba(0, 150, 255, 0.9)'
     }
let moveMoveMove = Math.random()
let directionx = Math.random()
let directiony = Math.random()
    if(directionx > changeDirChance){
        moveRight = false;
    }else{
        moveRight=true
    }
    if(directiony > changeDirChance){
        moveUp = false;
    }else{
        moveUp=true
    }
    if(moveMoveMove > chanceToMove) {
        moving = true;
        MoveX()
        MoveY()
    }else{
        moving=false;
    }
    coords = [[Clamp(positionX, 1, 10)], [Clamp(positionY,1 ,10)]]
    let kordy_stringX = Clamp(positionX.toString(),1,10)
    let kordy_stringY = Clamp(positionY.toString(),1,10)
    let kordy_string = `${kordy_stringX}x${kordy_stringY}`
    pozycja = document.getElementById(kordy_string)
    // Ustawiamy kolorek na czerwony, aby oznaczyć ruch robota sprzątającego
    pozycja.style.backgroundColor='red'
    console.log(kordy_string)
}, 1000);
}
