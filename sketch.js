let numParticipantes = 99; // Número de participantes por defecto
let angulo = 0; // Ángulo inicial de la ruleta
let velocidad = 0; // Velocidad inicial de la ruleta
let aceleracion = 0; // Aceleración inicial de la ruleta
let ganador = 0; // Número ganador inicial
let sortear = false; // Bandera para indicar si se sortea la ruleta
let colores = []; // Arreglo para almacenar los colores de los arcos

// Función que se ejecuta una vez al inicio del programa
function setup() {
  createCanvas(600, 600); // Crear un lienzo de 600 x 600 pixeles
  angleMode(DEGREES); // Usar el modo de ángulos en grados
  textAlign(CENTER, CENTER); // Alinear el texto al centro
  textSize(250); // Establecer el tamaño de fuente a 150 pixeles
  textFont("Arial"); // Establecer el tipo de fuente a Arial
  generarColores(); // Llamar a la función que genera los colores de los arcos

  // Crear un botón para cambiar el número de participantes
  let botonParticipantes = createButton("Cambiar número de participantes");
  botonParticipantes.position(100, 650); // Posicionar el botón debajo del lienzo
  botonParticipantes.mousePressed(cambiarParticipantes); // Asignar la función que se ejecuta al presionar el botón

  // Crear un botón para sortear la ruleta
  let botonSortear = createButton("Sortear la ruleta");
  botonSortear.position(400, 650); // Posicionar el botón debajo del lienzo
  botonSortear.mousePressed(iniciarSorteo); // Asignar la función que se ejecuta al presionar el botón
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
}

// Función que inicia el sorteo de la ruleta asignando valores aleatorios a la velocidad y la aceleración 
function iniciarSorteo() {
   velocidad = random(10,20); // Asignar un valor aleatorio entre 10 y 20 a la velocidad 
   aceleracion = random(-0.05,-0.01); // Asignar un valor aleatorio entre -0.05 y -0.01 a la aceleración 
   sortear = true; // Cambiar la bandera de sorteo a verdadero 
}

// Función que dibuja la ruleta circular dividida en arcos iguales según el número de participantes 
function dibujarRuleta() {
   let anguloInicial = angulo; // Guardar el ángulo inicial de la ruleta 
   let anguloFinal = angulo + (360 / numParticipantes); // Calcular el ángulo final del primer arco 
   for (let i = numParticipantes -1 ; i >=0 ; i--) { // Para cada participante en orden inverso 
      fill(colores[i]); // Rellenar con el color correspondiente al arco 
      arc(0,0,width,width,anguloInicial,anguloFinal); // Dibujar un arco con los ángulos calculados 
      push(); // Guardar el estado actual del lienzo 
      rotate((anguloInicial + anguloFinal) /2 );// Rotar el lienzo según el ángulo medio del arco 
      fill(0); // Rellenar con color negro 
      textSize(20); // Establecer el tamaño de fuente a 20 pixeles 
      text(i+1, width/2 - 20 ,0); // Escribir el número del participante en el borde del arco 
      pop(); // Restaurar el estado anterior del lienzo 
      anguloInicial += (360 / numParticipantes); // Incrementar el ángulo inicial en una fracción del círculo 
      anguloFinal += (360 / numParticipantes);  
   }
}

// Función que dibuja la flecha indicadora triangular que apunta al centro de la parte superior del lienzo 
function dibujarFlecha() {
   fill(0);   
   triangle(-10,-height/2,10,-height/2,0,-height/2 +20 );
}

// Función que gira la ruleta según la velocidad y la aceleración asignadas 
function girarRuleta() {
   angulo += velocidad;   
   velocidad += aceleracion; 
   if (velocidad <=0 ) { 
      velocidad =0 ; 
      aceleracion =0 ; 
      sortear = false; 
      noLoop(); 
   }
}

// Función que muestra el número ganador según la posición de la flecha indicadora 
function mostrarGanador() {
   let indiceGanador = floor((angulo %360 ) / (360 / numParticipantes));
   ganador = numParticipantes - indiceGanador; 
   fill(0);  
   text(ganador,0 ,0 ); 
}
