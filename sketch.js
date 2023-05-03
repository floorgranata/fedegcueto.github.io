  let numParticipantes = 100; 
  let angulo = 0; 
  let velocidad = 0; 
  let aceleracion = 0; 
  let ganador = 0; 
  let sortear = false; 
  let colores = []; 
  let logo;

  function preload() {
    logo = loadImage("logo.png");
  }

  function setup() {
    let cnv = createCanvas(600, 600);
    cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER); 
    textSize(250); 
    textFont("Arial");
    generarColores();
    let botonParticipantes = createButton("P");
    botonParticipantes.position(width/2 - botonParticipantes.width - 10, height - 55); 
    botonParticipantes.mousePressed(cambiarParticipantes); 

    let botonSortear = createButton("Sortear");
    botonSortear.position(width/2 + 10, height -70); 
    botonSortear.mousePressed(iniciarSorteo);
    botonSortear.style('background-color', '#30E17B');
  botonSortear.style('border', 'none');
  botonSortear.style('color', 'white');
  botonSortear.style('padding', '10px');  
  }

  function draw() {
    
    translate(width / 2, height / 2);
    dibujarRuleta();
    //dibujarFlecha(); 
    if (sortear) { 
      girarRuleta();
      mostrarGanador();
    }
    dibujarLogo(); 
  }


  function generarColores() {
    colores = ['#30E17B', 'black']; // especifica los colores que quieras aquí
    // También puedes definir los colores como objetos color de p5.js
    colores = [color('#30E17B'), color('black')];
    while (colores.length < numParticipantes) {
      colores.push(random(colores)); // duplica los colores existentes para llenar el array
    } }


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
    velocidad = random(15,20); 
    aceleracion = random(-0.05,-0.03); 
    sortear = true; 
  }

  function dibujarRuleta() {
    let anguloInicial = angulo;
    let anguloFinal = angulo + (360 / numParticipantes);
    let colIndex = 0; // variable para controlar el color actual
    for (let i = numParticipantes - 1; i >= 0; i--) {
      let c = colIndex % 2 === 0 ? color(0, 0, 0) : color(48, 225, 123); // intercalamos los colores
      fill(c);
      arc(0, 0, width, width, anguloInicial, anguloFinal);
      push();
      rotate((anguloInicial + anguloFinal) / 2);
      fill(255);
      textSize(20);
      text(i + 1, width / 2 - 20, 0);
      pop();
      anguloInicial += (360 / numParticipantes);
      anguloFinal += (360 / numParticipantes);
      colIndex++; // avanzamos al siguiente color
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
    
    stroke(255);
    strokeWeight(5);
    fill(0);
    text(ganador,0 ,0 ); 
    noStroke();
  }

  function dibujarLogo() {
    if (!logo) { // si la imagen no se ha cargado todavía, cargarla
      logo = loadImage("logo.jpg");
    }
    // dibujar el logo debajo del número grande del centro
    push();
    translate(0, 150);
    image(logo, -logo.width/2, 0);
    pop();
  }
