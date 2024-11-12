const teacher = {
  name: "Stefano",
  surname: "Miceli",
  teaching: true,
  hasWebcam: true,
  numOfStudents: 28,
  location: {
    state: "Italy",
    region: "FVG",
    coords: {
      lat: 45.827,
      lon: 33.3892
    }
  },
  batchCode: "FS0824B",
  courseUnits: ["HTML & CSS", "JS 1", "JS 2", "UX&UI", "Bootstrap", "SASS", "JS 3"]
};

const objToString = teacher.toString();
console.log(objToString);

// metodo per convertire correttamente un oggetto in stringa, senza usare il metodo default .toString() che produrrebbe '[object, Object]'
const objToJSONString = JSON.stringify(teacher);
console.log(objToJSONString);

const JSONToObj = JSON.parse(objToJSONString);
console.log(JSONToObj);

const teacherClone = JSON.parse(JSON.stringify(teacher)); // sarebbe meglio non usare questo metodo di clonazione nel 2024 (e oltre)
// piuttosto facciamo così:

const teacherCloneBetter = structuredClone(teacher); // clonazione profonda come prima, ma più performante
