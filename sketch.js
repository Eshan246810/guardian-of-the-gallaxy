let FORM =1;
let PLAY = 2;
let END = 0;
let END2 = 3;
let gameSate = FORM; 
let backgroundImg;
let start;
let end;
let spaceShip;
let lazer , weapons;
let bar;
let skrull,invaders;
let lives = 5;
let kills = 0;
function preload(){
  backgroundImg = loadImage("backgroundImg.png");
  lazerimg =loadImage("lazer.jpeg")
}
function setup() {
  createCanvas(800,400);
  spaceShip = createSprite(100, 200, 10, 10);
  start = createSprite(400,250,30,30);
  end = createSprite(400,200,20,20);
  bar = createSprite(2,200,5,400);
  invaders = new Group();
  weapons = new Group();
  lives =5;
  kills =0;
}
function draw() {
  background(backgroundImg);
  fill('red');
  if(gameSate===FORM){
    text('your Mission : destroy all incoming enemy troop carriers',250,150);
    spaceShip.visible = false;
    start.vivible = true;
    end.visible = false;
    if(mousePressedOver(start)){
      gameSate = PLAY;
    }
  }
  if(gameSate===PLAY){
  text('lives left: '+ lives,250,370);
  text('kills: '+kills,350,370 );
  spaceShip.visible = true;
  start.visible = false;
  end.visible = false;
  if(keyWentDown('SPACE')){
   lazer = createSprite(spaceShip.x,spaceShip.y,20,5);
   lazer.addImage("lazerImg",lazerimg);
   lazer.scale = 0.2
   lazer.velocityX = 20;
   lazer.lifetime = 35;
   weapons.add(lazer);
  }  
  if(keyDown('W') && spaceShip.y > 10){
   spaceShip.y -=15;
  }
  if(keyDown('S') && spaceShip.y <390){
   spaceShip.y +=15;
  }
  if(keyDown('A') && spaceShip.x > 10){
   spaceShip.x -= 15;
  }
  if(keyDown('D') && spaceShip.x < 390){
   spaceShip.x +=15;
  }
  if (frameCount % 35 === 0) {
   skrull = createSprite(750,200,30,30);
   skrull.y = Math.round(random(1,350));
   skrull.velocityX = -7;
   skrull.lifetime = 250;
   invaders.add(skrull);
  }
  for(var i=0; i<invaders.length ; i++){
    if(invaders.get(i).isTouching(bar)){
      lives-=1;
      invaders.get(i).destroy(); 
     }
  }
  for(var i=0; i<invaders.length ; i++){
    if(invaders.get(i).isTouching(weapons)){
      kills+=1;
      invaders.get(i).destroy(); 
     }
  }
  for(var e=0; e<weapons.length ; e++){
    if(weapons.get(e).isTouching(invaders)){
      weapons.get(e).destroy(); 
     }
  }

 /* if(invaders.isTouching(bar)){
   lives-=1; 
  }*/
 //if(invaders.isTouching(weapons)){
   //kills+=1;
  //}  
  if(lives<1){
    gameSate = END;
  }
  if(kills>19){
    gameSate = END2;
  }
 }
 if(gameSate === END2){
  spaceShip.visible = false;
  end.visible = true;
  text('Mission Successful: Enemy troop cariers have retreated',250,150);
  fill('blue');
  text('press button to restart',250,200);
  //invaders.setlifetimeEach(-1);
  if(mousePressedOver(end)){
    reset();
  }
}
 if(gameSate===END){
  spaceShip.visible = false;
  end.visible = true;
  text('Mission failed: too many ships crosed the borders',250,150);
  fill('blue');
  text('press button to restart',250,200);
  //invaders.setlifetimeEach(-1);
  if(mousePressedOver(end)){
    reset();
  }
 }
  drawSprites();
}
function reset(){
  gameSate = PLAY;
  end.visible = false;
  lives = 5;
  kills = 0;
}