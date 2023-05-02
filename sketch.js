}

// Función que se ejecuta en cada fotograma del programa
function draw() {
  background(255); // Pintar el fondo de blanco
  translate(width / 2, height / 2); // Trasladar el origen de coordenadas al centro del lienzo
  dibujarRuleta(); // Llamar a la función que dibuja la ruleta
  //dibujarFlecha(); // Llamar a la función que dibuja la flecha indicadora
  if (sortear) { // Si se está sorteando la ruleta
    girarRuleta(); // Llamar a la función que gira la ruleta
    mostrarGanador(); // Llamar a la función que muestra el número ganador
  }
}

// Función que genera los colores de los arcos según el número de participantes
function generarColores() {
  colores = []; // Vaciar el arreglo de colores
  for (let i = 0; i < numParticipantes; i++) { // Para cada participante
    let c = color(floor(random(255)), floor(random(255)), floor(random(255))); // Generar un color aleatorio
    colores.push(c); // Agregar el color al arreglo de colores
  }
}

// Función que cambia el número de participantes según el valor ingresado por el usuario
function cambiarParticipantes() {
  let valor = prompt("Ingrese el número de participantes entre 1 y 150"); // Pedir al usuario que ingrese un valor
  valor = parseInt(valor); // Convertir el valor a un número entero
  if (valor >= 1 && valor <=150) { // Si el valor es válido
    numParticipantes = valor; // Asignar el valor al número de participantes
    generarColores(); // Generar los colores nuevamente según el nuevo número de participantes
    angulo = 0; // Reiniciar el ángulo de la ruleta a cero
    velocidad = 0; // Reiniciar la velocidad de la ruleta a cero
    aceleracion = 0; // Reiniciar la aceleración de la ruleta a cero
    ganador = 0; // Reiniciar el número ganador a cero
    sortear = false; // Reiniciar la bandera de sorteo a falso
    loop(); // Reanudar el bucle principal del programa 
  } else { // Si el valor no es válido 
    alert("El valor ingresado no es válido"); // Mostrar un mensaje de alerta al usuario 
  }