
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba

//* variabili create scoop globale
//? variabili create scoop locale 
//! if , richiami function 
//!commenti personali all'interno 




//*recupero il buttun dal dom e lo assoccio ad una variabile
let btnPlay = document.getElementById('play_btn');

//? recupero il parent di dove voglio inserire i box creati
let gridContainer = document.querySelector('.grid_container');

//? recupero il parent di dove voglio inserire lo score del punteggio creati
let conteinerScore = document.querySelector('#score');

//? recupero la stringa del punteggio
let scoreUser = document.querySelector('.score_box');

//? recupero la stringa del reset-message
let resetGameMessage = document.querySelector('#reset-game-message');

//? recupero la stringa del messagio del risultato della partita per l'user
let outcome = document.querySelector('#outcome');



//*creo l'array vuoto della blackList dei numeri randomici
let blackListN = [];












//*creo addEvenLIsener sul btn
btnPlay.addEventListener('click',function(){

    //?creo le due variabili di difficolta vuote
    let gridSize;
    let difficult;
    let  minPointsToWin;
   
    //!riporto la griglia ad attiva
    gridContainer.classList.remove("inactive");
    scoreUser.classList.add(`d-none`);
    resetGameMessage.classList.add(`d-none`);

    //?recupero il value dell'input del'user_choice
    let userChoice = document.getElementById('user_choice').value ;
    // console.log(userChoice)

 //! if sulla scelta del cliente
if(userChoice === 'hard'){
    //!numero di caselle
   gridSize = 49;
   difficult = 'hard';
}else if(userChoice === 'medium'){
    //!numero di caselle
   gridSize = 81;
   difficult = 'medium';
}else{
    //!numero di caselle
   gridSize = 100;
   difficult = 'easy';
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

    //!svuoto il contenitore dell'html in modo che ogno volta che premo play
    //!svuota il contenuto senza sovrascriverlo 
    conteinerScore.innerHTML= '';





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
                minPointsToWin = 33;
                
            }else if(diff  == 'medium'){
                newBox.classList.add('box','box_medium');
                minPointsToWin = 65;
            }else{
                minPointsToWin = 84;
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

                        //se l'user prene una bomba
                        //?aggiungo la classe inactive  per rendere in attiva la griglia
                        addToToggleClass(gridContainer,'inactive'); 

                        scoreUser.classList.remove(`d-none`);
                        resetGameMessage.classList.remove(`d-none`);  
                        outcome.innerHTML=(`mi dispiace hai perso`);
                    } else{
                        //?aggiungo la classe box_active per il cambio colore
                        addToToggleClass(newBox,'box_active'); 
                    }

                    //*stampo in console il numero dell'elemento selezionato
                    // console.log(`hai clicccato l'elemento ${i}`);
                    //prendo tutti gli elementi creati con classe active per sapere quanti sono
                    let scoreBox = document.querySelectorAll('.box_active');
                    // console.log(scoreBox);
                    //il punteggio sarà della lunghezza degli elementi con classe box_active
                    conteinerScore.innerHTML= (`${scoreBox.length} su ${minPointsToWin}`);
                    console.log(minPointsToWin);
                    if(minPointsToWin == scoreBox.length){
                        //?aggiungo la classe inactive  per rendere in attiva la griglia
                        addToToggleClass(gridContainer,'inactive'); 
                        scoreUser.classList.remove(`d-none`);
                        resetGameMessage.classList.remove(`d-none`);
                        outcome.innerHTML=(`wow hai vinto`);
                    }
                
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


    }


  