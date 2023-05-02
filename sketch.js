let numParticipantes = 99; 
let angulo = 0; 
let velocidad = 0; 
let aceleracion = 0; 
let ganador = 0; 
let sortear = false; 
let colores = []; 


function setup() {
  createCanvas(600, 600); 
  angleMode(DEGREES);
  textAlign(CENTER, CENTER); 
  textSize(250); 
  textFont("Arial");
  generarColores();
  let botonParticipantes = createButton("Cambiar número de participantes");
  botonParticipantes.position(100, 650); 
  botonParticipantes.mousePressed(cambiarParticipantes); 

  let botonSortear = createButton("Sortear la ruleta");
  botonSortear.position(400, 650); 
  botonSortear.mousePressed(iniciarSorteo);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  dibujarRuleta();
  //dibujarFlecha(); 
  if (sortear) { 
    girarRuleta();
    mostrarGanador();
  }
}


function generarColores() {
  colores = [];
  for (let i = 0; i < numParticipantes; i++) {
    let c = color(floor(random(255)), floor(random(255)), floor(random(255))); 
    colores.push(c); 
  }
}


function cambiarParticipantes() {
  let valor = prompt("Ingrese el número de participantes entre 1 y 150"); 
  valor = parseInt(valor); 
  if (valor >= 1 && valor <=150) {
    numParticipantes = valor; 
    generarColores(); 
    angulo = 0; 
    velocidad = 0;
    aceleracion = 0; 
    ganador = 0;
    sortear = false; 
    loop();
  } else { 
    alert("El valor ingresado no es válido"); 
  }
}

function iniciarSorteo() {
   velocidad = random(10,20); 
   aceleracion = random(-0.05,-0.01); 
   sortear = true; 
}


function dibujarRuleta() {
   let anguloInicial = angulo; 
   let anguloFinal = angulo + (360 / numParticipantes); 
   for (let i = numParticipantes -1 ; i >=0 ; i--) { 
      fill(colores[i]); 
      arc(0,0,width,width,anguloInicial,anguloFinal); 
      push();
      rotate((anguloInicial + anguloFinal) /2 );
      fill(0);  
      textSize(20);
      text(i+1, width/2 - 20 ,0); 
      pop(); 
      anguloInicial += (360 / numParticipantes); 
      anguloFinal += (360 / numParticipantes);  
   }
}

function dibujarFlecha() {
   fill(0);   
   triangle(-10,-height/2,10,-height/2,0,-height/2 +20 );
}

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

function mostrarGanador() {
   let indiceGanador = floor((angulo %360 ) / (360 / numParticipantes));
   ganador = numParticipantes - indiceGanador; 
   fill(0);  
   text(ganador,0 ,0 ); 
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
