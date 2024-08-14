const d = document;
const textarea = d.getElementById("myTextarea");
const imagen = d.getElementById("result__img");
const resultadotext = d.getElementById("result__text");
const resulttitle = document.getElementById("resultTitle");
const buttonencrip = d.getElementById("encriptarBtn");
const buttondesencrip = d.getElementById("desencriptarBtn");
const buttoncopiar = d.getElementById("copiarBtn");
const errorMessage = document.getElementById("error-message");

// Llaves de encriptación
const llaves = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

// Función para encriptar el mensaje
function encriptarMensaje(mensaje) {
  let mensajeEncriptado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    let encriptada = letra;
    for (let j = 0; j < llaves.length; j++) {
      if (letra === llaves[j][0]) {
        encriptada = llaves[j][1];
        break;
      }
    }
    mensajeEncriptado += encriptada;
  }
  return mensajeEncriptado;
}

// Función para desencriptar el mensaje
function desencriptarMensaje(mensaje) {
  let mensajeDesencriptado = mensaje;
  for (let i = 0; i < llaves.length; i++) {
    let regex = new RegExp(llaves[i][1], "g");
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
  }
  return mensajeDesencriptado;
}

// Función para validar el mensaje
function validarMensaje(mensaje) {
  // Expresión regular para detectar acentos y caracteres especiales
  const tieneAcentosOEspeciales = /[áéíóúüñ]/i.test(mensaje);
  // Expresión regular para permitir solo letras minúsculas y espacios
  const regex = /^[a-z\s]+$/;
  return !tieneAcentosOEspeciales && regex.test(mensaje);
}

// Manejador de evento para encriptar
buttonencrip.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textarea.value.trim();
  
  if (validarMensaje(mensaje)) {
    let mensajeEncriptado = encriptarMensaje(mensaje.toLowerCase());
    resultadotext.textContent = mensajeEncriptado;
    buttoncopiar.classList.remove("hidden");
    resulttitle.textContent = "El resultado es:";
    errorMessage.classList.add("hidden");
  } else {
    errorMessage.textContent = "El mensaje debe estar en minúsculas y no contener caracteres especiales ni tildes.";
    errorMessage.classList.remove("hidden");
    resultadotext.textContent = "";
    resulttitle.textContent = "";
    buttoncopiar.classList.add("hidden");
    imagen.style.display = "none";
  }
});

// Manejador de evento para desencriptar
buttondesencrip.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textarea.value.trim();
  
  if (validarMensaje(mensaje)) {
    let mensajeDesencriptado = desencriptarMensaje(mensaje.toLowerCase());
    resultadotext.textContent = mensajeDesencriptado;
    buttoncopiar.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  } else {
    errorMessage.textContent = "El mensaje debe estar en minúsculas y no contener caracteres especiales ni tildes.";
    errorMessage.classList.remove("hidden");
    resultadotext.textContent = "";
    resulttitle.textContent = "";
    buttoncopiar.classList.add("hidden");
    imagen.style.display = "none";
  }
});

// Manejador de evento para copiar el texto
buttoncopiar.addEventListener("click", () => {
  let textoCopiado = resultadotext.textContent;
  navigator.clipboard.writeText(textoCopiado).then(() => {
    imagen.style.display = "block";
    resulttitle.textContent = "El texto se copió";
  });
});
