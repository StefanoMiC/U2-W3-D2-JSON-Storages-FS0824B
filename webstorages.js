// MOTORI DI STORAGE DEL BROWSER
// 1) localStorage --> permanenza dei dati finché l'utente non li cancella esplicitamente, tramite svuotamento dei dati di navigazione
// 2) sessionStorage --> permanenza dei dati anche dopo un refresh, e finché il tab del browser non viene chiuso

// entrambi i motori utilizzano gli stessi metodi:
// .setItem("key", value) --> questo metodo SALVERA' il valore nella chiave corrispondente all'interno dell'area di memoria dedicata per quel dominio.
// .getItem("key") --> cercherà un elemento tramite la sua chiave specifica, se non la trovasse ci restituirebbe null

// .removeItem("key") --> rimuove un elemento pre-esistente
// .clear() --> rimuove tutti i dati nello storage (local/session) per quel dominio

// N.B. I valori ritornati dagli storage sono SEMPRE STRINGHE!

// 1. settiamo un valore nello storage
// window.localStorage.setItem()

const LIVE_LECTURE_KEY = "isLectureLiveNow";

// oggi possiamo usare direttamente le funzioni globali:
localStorage.setItem(LIVE_LECTURE_KEY, true);

const areWeLiveNow = function () {
  // 2) ricavare il valore dal localStorage
  const areWeLive = localStorage.getItem(LIVE_LECTURE_KEY);
  console.log(areWeLive);

  if (areWeLive === "true") {
    console.log("Siamo Live!");
  } else if (areWeLive === "false") {
    console.log("Lezione offline.");
  }
};

areWeLiveNow();

const removeLive = function () {
  localStorage.removeItem(LIVE_LECTURE_KEY);
};

// numbers
localStorage.setItem("numItem", 13);
const numFromStorage = localStorage.getItem("numItem");
console.log(typeof numFromStorage);
// console.log(numFromStorage + 10);
console.log(parseInt(numFromStorage) + 10);

// arrays
localStorage.setItem("arrItem", JSON.stringify([78, 29, 100, 9, 2, 54]));
const arrFromStorage = localStorage.getItem("arrItem");
// con il parse convertiamo la stringa dell'array (in formato JSON) in un vero array
const JSONToArr = JSON.parse(arrFromStorage);
// a questo punto siamo liberi di fare il push
JSONToArr.push(51);
console.log(JSONToArr);

// objects
const myObj = { name: "Stefano", surname: "Miceli" };
localStorage.setItem("objItem", JSON.stringify(myObj));
const objFromStorage = localStorage.getItem("objItem");
const JSONToObj = JSON.parse(objFromStorage); // questa stringa di oggetto in formato JSON torna ad essere un vero oggetto JS!
console.log(JSONToObj);

JSONToObj.name = "Paperino";
console.log(JSONToObj.name);
console.log(myObj.name);

// dates
localStorage.setItem("dateItem", new Date().toISOString());
const dateFromStorage = localStorage.getItem("dateItem");
const convertedStorageDateStr = new Date(dateFromStorage);
console.log(convertedStorageDateStr.getDate());
