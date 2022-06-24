//*recupero il buttun dal dom e lo assoccio ad una variabile
let btnPlay = document.getElementById('play_btn');

//? recupero il parent di dove voglio inserire gli elementi creati
let gridContainer = document.querySelector('.grid_container');


//*creo addEvenLIsener sul btn
btnPlay.addEventListener('click',function(){

    //*creo le due variabili di difficolta vuote
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

//!chiamo la funzione con i paremetri che voglio inserire
    serialNumber(gridSize , difficult);

    
} )


//!creo la funzione del cilo piu la creazione di un elemento div     
function serialNumber (ncels , diff ){

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

            //?aggiungo la classe box_active per il cambio colore
            addToToggleClass(newBox,'box_active'); 

            //*stampo in console il numero dell'elemento selezionato
            console.log(`hai clicccato l'elemento ${i}`);
        }
        //! aggiunta parametro di .addEventListener per non rendere piu cliccabile un elemento
        , {once: true});
        
    }
}

//? creo la funzone toggle per aggiungere o rimuovere una classe
function addToToggleClass(elemnt , className){
    elemnt.classList.toggle(className);
}
