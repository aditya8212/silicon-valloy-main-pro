const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var canvas;
var gameState = "start";
var john,body;
var score = 0;

var distance = 0;

var laserarr = [];

function preload(){
	
	johnimg = loadImage("images/john.png");
	coinsimg = loadImage("images/jet_coins.png");
	firstback = loadImage("images/jetpackback1.jpg");
	zapperimg = loadImage("images/NewZapper.png");
	missile = loadImage("images/mis.png");
	ground = loadImage("images/jet gru.jpg");
	back = loadImage("images/grun.png");
	play = loadImage("images/play.png");
	johnZ = loadImage("images/johnzapp.png");
	johnFall = loadImage("images/johnfall.png")
	laserimg = loadImage("images/laser1.jpg");
	storyi = loadImage("images/storyimage.png");
	backtext = loadImage("images/backimage.png");
	explosionI = loadImage("images/johnfall.png");
	storyback = loadImage("images/backimg (story).jpg");
	losti = loadImage("images/abab.png");
	resetBi = loadImage("images/resetb.png");
	bulletimg = loadImage("images/bullet.png");

}

function setup(){
 
	canvas = createCanvas(1200,700);

	engine = Engine.create();
    world = engine.world;

	missileG = new Group();
	bulletsG = new Group();
	zapperG = new Group();
	coinsG = new Group();	

	backi = createSprite(1200,430);
	backi.addImage(back);
	backi.velocityX = -5;
	backi.scale = 2.2;
	
	gru = createSprite(1200, 660, 2400, 50);
	gru.addImage(ground); 
	gru.scale = 1.55;
	gru.velocityX = -5;

	gruinvinsible = createSprite(600,600,1200,5);
	gruinvinsible.visible = false;

	gruinvinsible2 = createSprite(600,30,1200,10);
	gruinvinsible2.visible = false;

	john = createSprite(100,500,10,10);
	john.addImage(johnimg);
	john.scale = 0.15;

	playbutton = createSprite(570,490,10,10);
	playbutton.addImage(play);
	playbutton.scale = 0.5;

	storybutton = createSprite(570,550,40,20);
	storybutton.addImage(storyi);
	storybutton.scale = 0.3;

	backbutton = createSprite(990,550,40,20);
	backbutton.addImage(backtext);
	backbutton.scale = 0.3;

	resetbutton = createSprite(990,500,40,20);
	resetbutton.addImage(resetBi);
	resetbutton.scale = 0.2;
}

function draw() {
  
	background("black");

	Engine.update(engine);

if(gameState === "start"){
	
	background(firstback);

	john.visible = false;
	gru.visible = false;
	backi.visible = false;
	storybutton.visible = true;
	playbutton.visible = true;
	backbutton.visible = false;
	resetbutton.visible = false;

	drawSprites();

	if(mousePressedOver(playbutton)){
		gameState = "play";

	}

	if(mousePressedOver(storybutton)){
		gameState = "story";
	
	}
	
}

if(gameState === "play"){
	
	background("black");

	gru.visible = true;
	john.visible = true;
	playbutton.visible = false;
	backi.visible = true;
	storybutton.visible = false;
	backbutton.visible = false;
	resetbutton.visible = false;

	if(keyDown("space")){
		john.velocityY = -10;
		bullets();

	}

	if(frameCount%300===0){
		 laserarr.push(new LASER(random(100,400)));
		
		} 
		 for (var j = 0; j < laserarr.length; j++) {
			  laserarr[j].display(); 

			console.log(laserarr[j].Visiblity);

			if(john.y<=laserarr[j].body.position.y+10 && john.y >= laserarr[j].body.position.y - 10 &&
				laserarr[j].Visiblity > 10){
				
			   		gameState = "burnt"
					   
			}
		
			 }

	john.velocityY = john.velocityY+1;

	john.collide(gruinvinsible);

	spawnMissile();
	zapper();
	coinsF();

	if(john.isTouching(zapperG)){
		gameState = "burnt"

	}

	if(frameCount%4 === 0){
		distance = distance+1;
		
	}

	if(john.isTouching(missileG)){
		gameState = "exploded"

	}

	if(gru.x < 0){
		gru.x = 1200;
	
	}

	if(backi.x < 0){
		backi.x = 1200;
	
	}

	for(var a = 0;a<coinsG.length;a=a+1){
		if(coinsG.get(a).isTouching(john)){
            coinsG.get(a).destroy();
			score = score+0.5;

        }

	}

	john.collide(gruinvinsible2);

	drawSprites();

	fill("white");
	textSize(20);
	text("score: "+score,john.x-20,john.y-50);
	
	for (var j = 0; j < laserarr.length; j++){ 
		 laserarr[j].display(); 
	}

}

if(gameState === "story"){
	john.visible = false;
	gru.visible = false;
	backi.visible = false;
	playbutton.visible = false;
	storybutton.visible = false;
	backbutton.visible = true;
	resetbutton.visible = false;

	background(storyback);

	textSize(20);
	fill("red");
	text("STORY",550,50);

	textSize(20);
	fill("maroon");
	text("OBJECTIVE",530,250);
	
	textSize(15);
	fill(" black");
	text("The objective of the game is to travel as far as possible, collect coins, and avoid hazards such as zappers, missiles and high-intensity body beams.",50,300);
	
	textSize(15);
	fill(" black");
	text("John works as a salesman for a gramophone-making company, but the business is about to go bankrupt due to low sales. One day, as he walks down a street,",50,100);

	textSize(15);
	fill(" black");
	text("sad because of the low sales, he finds one of the top secret laboratories of Legitimate Research, and sees the Machinegun jetpack inside. Dreaming of using the jetpack to ",50,120);

	textSize(15);
	fill(" black");
	text("do good, John bursts through the wall of the laboratory and steals the experimental jetpack from the clutches of the scientists, thus beginning the game.",50,140);

	textSize(20);
	fill("red");
	text("CONTROLS",530,420);

	textSize(15);
	fill(" black");
	text("controls: spacebar ",520,460);

	if(mousePressedOver(backbutton)){
		gameState = "start"

	}

	drawSprites();

}

	if(gameState === "burnt"){

		background(losti);

		john.visible = true
		gru.visible = true;
		backi.visible = false;
		playbutton.visible = false;
		storybutton.visible = false;
		backbutton.visible = false;
		resetbutton.visible = true;
		
		john.addImage(johnZ);

		gru.velocityX = 0;
		john.velocityY = 3;

		zapperG.destroyEach();

		coinsG.destroyEach();

		missileG.destroyEach();

		laserarr.pop();

		john.collide(gruinvinsible);

		if(mousePressedOver(resetbutton)){
			gameState = "play";
			john.addImage(johnimg);
			gru.velocityX = -5;
			score = 0;
			distance = 0;

		}

		drawSprites();

		fill("white");
		textSize(20);
		text("score: "+score,john.x-20,john.y-50);

		fill("white");
		textSize(20);
		text("distance: "+distance,john.x-20,john.y-100);
		
	}

	if(gameState === "exploded"){

		background(losti);

		john.visible = true
		gru.visible = true;
		backi.visible = false;
		playbutton.visible = false;
		storybutton.visible = false;
		backbutton.visible = false;
		resetbutton.visible = true;

		john.addImage(explosionI);

		gru.velocityX = 0;
		john.velocityY = 3;

		zapperG.destroyEach();

		coinsG.destroyEach();

		missileG.destroyEach();

		john.collide(gruinvinsible);

		if(mousePressedOver(resetbutton)){
			gameState = "play";
			john.addImage(johnimg);
			gru.velocityX = -5;
			score = 0;
			distance = 0;

		}

		drawSprites();

		fill("white");
		textSize(20);
		text("score: "+score,john.x-20,john.y-50);

		fill("white");
		textSize(20);
		text("distance: "+distance,john.x-20,john.y-100);

	}

}



function bullets(){
	if(frameCount%3 === 0){
		bul = createSprite(john.x,john.y+10,8,15);
		bul.velocityY = +20;
		bul.shapeColor = "yellow";
		bul.addImage(bulletimg);
		bulletsG.add(bul);
		
		bul2 = createSprite(john.x-10,john.y+10,8,15);
		bul2.velocityY = +20;
		bul2.velocityX = -3;
		bul2.shapeColor = "yellow";
		bul2.addImage(bulletimg);
		bulletsG.add(bul2);

		bul3 = createSprite(john.x+10,john.y+10,8,15);
		bul3.velocityY = +20;
		bul3.velocityX = +3;
		bul3.shapeColor = "yellow";
		bul3.addImage(bulletimg);
		bulletsG.add(bul3);

		bulletsG.setLifetimeEach(45);
		bulletsG.setScaleEach(0.03);

	}

}



function coinsF(){
	if(frameCount%310 === 0){
		//letter c

		var y = random(100,400);

		for(var j=0;j<=8;j++){
			coins = createSprite(1200,y+20*j,10,10);
			coins.addImage(coinsimg);
			
			coinsG.add(coins);

		  }
		  
		  for(var i = 0;i<=5;i++){
			for(var j=0;j<2;j++){
			  coins = createSprite(1200+i*20,y+160*j,10,10);
			  coins.addImage(coinsimg);
			 
			  coinsG.add(coins)

			}
		  }

		  //letter o
		for(var i = 0;i<2;i++){
			for(var j=0;j<=8;j++){
				coins = createSprite(1340+100*i,y+20*j,10,10);
				coins.addImage(coinsimg);
				
				coinsG.add(coins);
			}
		}
	
		for(var i = 0;i<=5;i++){
			for(var j=0;j<2;j++){
				coins = createSprite(1340+i*20,y+160*j,10,10);
				coins.addImage(coinsimg);
				
				coinsG.add(coins)
			}
		}

		//letter i 
		for(var j=0;j<=8;j++){
			coins = createSprite(1475,y+20*j,10,10);
			coins.addImage(coinsimg);
			
			coinsG.add(coins);
		  }

		   //letter n
  		for(var i = 0;i<2;i++){
    		for(var j=0;j<=8;j++){
      			coins = createSprite(1510+100*i,y+20*j,10,10);
				coins.addImage(coinsimg);
				
      			coinsG.add(coins);
    		}
  		}

		  for(var i = 1; i <= 7; i++) {
			for(var j = 1; j <= i; j++) { 
			  if(j == i){
				coins = createSprite(1520+10*i,y+20*j,10,10);
				coins.addImage(coinsimg);
				
				coinsG.add(coins);
			  }
			}
		  }

		  coinsG.setVelocityXEach(-5); 
		  coinsG.setScaleEach(0.2);
		  coinsG.setLifetimeEach(350);
	  
	}

}
 