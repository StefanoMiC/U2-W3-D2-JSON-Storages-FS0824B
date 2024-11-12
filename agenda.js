class AgendaEvent {
  constructor(img, name, date) {
    this.eventImg = img;
    this.eventName = name;
    this.eventDate = date;
  }
}

const removeCol = function (e) {
  // funzione che si attiva al click su una qualsiasi card

  // prendiamo e convertiamo l'array aggiornato al momento del click
  const existingAppointments = JSON.parse(localStorage.getItem("appointments"));

  // col è esattamente la col cliccata
  const col = e.currentTarget;
  // h5 è l'h5 specifico di quella colonna
  const h5 = col.querySelector("h5");
  const nameOfClickedCard = h5.innerText; // nome evento della card cliccata

  // procedura per ricavare la posizione dell'oggetto corrispondente alla card cliccata
  // stiamo mettendo insieme due cose che da sole non si relazionerebbero, un nodo del dom da una parte e
  // un oggetto in un array che non ha relazioni dirette con il nodo

  // tramite il metodo findIndex riusciamo a valutare se un qualche oggetto dell'array ha lo stesso eventName del testo dell'h5 della card
  const indexFound = existingAppointments.findIndex(appointment => appointment.eventName === nameOfClickedCard);
  // se trova corrispondenza ci restituisce la posizione trovata, altrimenti ci dà -1

  //   in caso di -1 sappiamo di non dover procedere
  if (indexFound !== -1) {
    // se sarà diverso da -1 invece useremo il valore trovato per eliminarlo tramite uno splice
    existingAppointments.splice(indexFound, 1);

    // ad ogni rimozione controlliamo a che punto è l'array, se risulta vuoto è arrivato
    // il momento di ripristinare l'alert e rimuovere la chiave appointments
    // cosicché al prossimo riavvio della pagina il getItem dia null
    if (existingAppointments.length === 0) {
      localStorage.removeItem("appointments");
      generateAlert();
    } else {
      // se non era l'ultimo elemento allora procediamo ad aggiornare la collezione di appuntamenti salvata nel localStorage
      localStorage.setItem("appointments", JSON.stringify(existingAppointments));
    }
  }

  // infine rimuoviamo anche visivamente l'elemento dalla pagina
  col.remove();
};

const generateAlert = function () {
  const container = document.querySelector(".container");

  const alert = document.createElement("div");
  alert.className = "alert alert-info";
  alert.role = "alert";
  alert.innerText = "Nessun elemento precedente trovato";

  container.appendChild(alert);
};

const generateCard = function (obj) {
  // il contenitore delle card
  const cardRow = document.getElementById("card-row");

  const col = document.createElement("col");
  col.className = "col";

  col.onclick = removeCol; // ⚠️non chiamare assolutamente questa funzione!!!  verrà chiamata dall'evento click

  col.innerHTML = `
                <div class="card">
                    <img src=${obj.eventImg} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${obj.eventName}</h5>
                        <p class="card-text">${obj.eventDate}</p>
                    </div>
                </div>
                `;

  cardRow.appendChild(col);
};

window.addEventListener("DOMContentLoaded", function () {
  const events = [];

  const form = document.querySelector("form");

  // i campi input
  const inputImg = document.getElementById("event-img");
  const inputName = document.getElementById("event-name");
  const inputDate = document.getElementById("event-date");

  // dopo che il DOM si è creato vado a prendere il form e gli aggancio un evento di tipo submit
  form.onsubmit = function (e) {
    e.preventDefault(); // abbiamo appena evitato un refresh inutile

    // se un alert è presente al momento del submit è verosimilmente al momento del primo inserimento del primo appuntamento,
    const alert = document.querySelector(".alert");
    if (alert) {
      // in quel caso lo rimuoviamo
      alert.remove();
    }

    // creiamo un oggetto a partire dal modello della classe AgendaEvent
    const appointment = new AgendaEvent(inputImg.value, inputName.value, inputDate.value);
    events.push(appointment); // inseriamo l'appuntamento nella collezione temporanea events

    // events viene inviato nel localStorage e crea una nuova condizione di "memoria" dei nostri appuntamenti,
    // con sempre un nuovo elemento ad ogni submit del form
    localStorage.setItem("appointments", JSON.stringify(events));

    // generiamo anche graficamente la card grazie a questa funzione generateCard
    generateCard(appointment);
  };

  // al primissimo caricamento di pagina questa variabile conterrà null
  const appointmentsFromStorage = localStorage.getItem("appointments");

  // l'if non ci farà il reinserimento di un un dato se non presente
  if (appointmentsFromStorage) {
    // se ho trovato un dato nello storage allora saremo qui dentro
    // a questo punto possiamo riconvertirlo in oggetto
    const previousEvents = JSON.parse(appointmentsFromStorage);
    // generateCard viene chiamata tante volte in automatico quanti sono gli appuntamenti trovati nel localStorage
    previousEvents.forEach(appointment => generateCard(appointment));
  } else {
    // in caso di assenza di elementi precedenti si scatena un alert
    generateAlert();
  }
});
