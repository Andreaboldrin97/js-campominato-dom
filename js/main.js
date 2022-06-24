// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
// (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba

//* variabili create scoop globale
//? variabili create scoop locale 
//! if , richiami function 
//!commenti personali all'interno 




//*recupero il buttun dal dom e lo assoccio ad una variabile
let btnPlay = document.getElementById('play_btn');

//? recupero il parent di dove voglio inserire gli elementi creati
let gridContainer = document.querySelector('.grid_container');

//*creo l'array vuoto della blackList dei numeri randomici
let blackListN = [];


//*creo addEvenLIsener sul btn
btnPlay.addEventListener('click',function(){

    //?creo le due variabili di difficolta vuote
    let gridSize;
    let difficult

    //?recupero il value dell'input del'user_choice
    let userChoice = document.getElementById('user_choice').value ;
    console.log(userChoice)

 //! if sulla scelta del cliente
if(userChoice === 'hard'){
    //!numero di caselle
   gridSize = 49;
   difficult = 'hard'
  

}else if(userChoice === 'medium'){
    //!numero di caselle
   gridSize = 81;
   difficult = 'medium'

}else{
    //!numero di caselle
   gridSize = 100;
   difficult = 'easy'
}
console.log(gridSize);

//!dichiaro la blackListN vuota in modo che ogni volta che premo play non si sovrascrive ma ne genera una nuova
    blackListN=[];

//?creo un ciclo per creare 16 Nrandom
    for(let i = 1 ; i <= 16 ; i++){
        //! chiamo la funzione per generare i numeri random in base alla grandezza della gridSize
        randomUniqueN(blackListN , 1 , gridSize)
    }
    console.log(blackListN)

//!chiamo la funzione con i paremetri che voglio inserire
serialNumber(gridSize , difficult , blackListN);
    
} )


//!creo la funzione del cilo piu la creazione di un elemento div     
function serialNumber (ncels , diff , listNrandom){

    //!svuoto il contenitore dell'html in modo che ogno volta che premo play
    //!svuota il contenuto senza sovrascriverlo 
    gridContainer.innerHTML= '';

    //?creo un ciclo for iniziannizandolo a 0 fino 
    for(let i = 1 ; i <= ncels ; i++){
        //? creo l'elemto da inportare nell'html
        let newBox =document.createElement('div');

        //?gli assegno la classe che voglio inportare
        newBox.classList.add('box');

         //? dichiaro l'elemento creato al valore di i
        newBox.innerHTML = i;

        //!in base alla difficolta si aggiunge una classe relativa alla grandezza dei box
        if( diff == 'hard'){
            newBox.classList.add('box','box_hard');
         }else if(diff  == 'medium'){
            newBox.classList.add('box','box_medium');
         
         }else{
            
         }
        //?importo l'elemento creato
        gridContainer.append(newBox);

        //? creo l'evento al clik dei box creati
        newBox.addEventListener('click',function(){
            //!creiamo la bomba 
            //se i è incluso nella lista dei numeri random alllora
            if(listNrandom.includes(i)){
                //?aggiungo la classe box_bomb per il cambio colore
                addToToggleClass(newBox,'box_bomb'); 
            } else{
                //?aggiungo la classe box_active per il cambio colore
                addToToggleClass(newBox,'box_active'); 
            }


            //*stampo in console il numero dell'elemento selezionato
            console.log(`hai clicccato l'elemento ${i}`);
        }
        //! aggiunta parametro di .addEventListener per non rendere piu cliccabile un elemento
        , {once: true});
        
    }
}

//* creo la funzone toggle per aggiungere o rimuovere una classe
function addToToggleClass(elemnt , className){
    elemnt.classList.toggle(className);
}


//*creo la funzione per generare Nrandom 
function randomUniqueN ( blackList , minN , maxN){
    
    //? creo un variabile vuota per il numero e una per la validita 
    //!la var della validità la indico come falsa 
    let randomN ;
    let isValidN = false ;
         //? creo un ciclo while per far in modo di chiedere un numero non presente nella blackLIst
        while (isValidN === false){
            //? associo la var randomN alla formula del numero randomico
            randomN = Math.floor(Math.random()*(maxN - minN) + minN);

            //!se il numero generato non è incluso nella blackLIst allora il numero è valido 
            if(!blackList.includes(randomN)){
                isValidN = true; 
            }
        }
           //!pusho il risultato all'interno della blackList
           blackList.push(randomN); 

             //!ritorna il valore di del numero valido
         return randomN;

    }
