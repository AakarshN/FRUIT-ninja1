var court, back
var sword, knife
var score = 0
var PLAY=1
var END=0
var gameState=1
var rand, rand1, rand2
var fruit, monst
var fruitA, fruitB, fruitC, fruitD
var monster1, monster2, alienGroup
var donefor, gameover, over
var slash

function preload() {

  back= loadImage("texture_11.png");
  knife= loadImage("sword.png");
  fruitA= loadImage("fruit1.png");
  fruitB= loadImage("fruit2.png");
  fruitC= loadImage("fruit3.png");
  fruitD= loadImage("fruit4.png");
  monster1= loadImage("alien1.png");
  monster2= loadImage("alien2.png");
  donefor= loadImage("gameover.png");
  gameover= loadSound("gameover.mp3");
  slash= loadSound("knifeSwooshSound.mp3")
}

function setup() {

  createCanvas(550, 500);



  court = createSprite(300, 300, 550, 500);
  court.addImage(back);
  court.scale= 1.5

  sword= createSprite(300,300,20,40);
  sword.addImage(knife);
  sword.scale= 0.5
  
  over= createSprite(300,250);
  over.addImage(donefor);
  over.visible= false;
  
  fruitGroup= new Group();
  alienGroup= new Group();
  
}

function draw() {
  
  

  sword.y=World.mouseY;
  sword.x=World.mouseX;
  drawSprites();
  if(gameState=== PLAY){
    fruits();
    alien();
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score= score+ 1;
      slash.play();
    }
    
    if(alienGroup.isTouching(sword)){
      gameState= 0;
      gameover.play();
    }
  }
  
  if(gameState===0){
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    sword.visible= false
    over.visible= true
    
  }
  textSize= 40;
  text("Score:"+ score, 550,30);
  
}

function fruits(){
  
  if(frameCount%60===0){
     
   
  rand= Math.round(random(0,550))
  rand1= Math.round(random(1,4))
  //var rand2= random(rand, rand1);
    fruit= createSprite( rand,2,20,20);
    fruit.velocityY= 9
    
    if(rand<300){
      //fruit.velocityY= fruit.velocityY + 4;
      fruit.velocityX= 3 + score/3
    }
    
    else{
      
      fruit.velocityX= -(3+ score/3)
      //fruit.velocityY= fruit.velocityY + 4;  
       }
    
    switch(rand1){
      case 1: fruit.addImage(fruitA);
              break;
      case 2: fruit.addImage(fruitB);
              break;
      case 3: fruit.addImage(fruitC);
              break;
      case 4: fruit.addImage(fruitD);
        
    }
    
    fruit.scale= 0.27
    
    fruitGroup.add(fruit);
  
 // switch(rand2) {
    //case 1: fruit.velocityY= fruit.velocityY+4
            //fruit.velocityX= 9;
           // break;
    //case 2: fruit.velocityY= fruit.velocityY+4
            //fruit.velocityX= -9;
            //break;
    //default: break;
 // }
    
  }
  
}

function alien(){
 if(frameCount%80===0){
  monst = createSprite(rand,498,10,20);
  monst.velocityY= -(7+ score/10)
  var rand2= Math.round(random(1,2))
  
  switch(rand2){
    case 1: monst.addImage(monster1);
            break;
    case 2: monst.addImage(monster2);      
      
      
  }
   alienGroup.add(monst);
   monst.bounceOff(fruit);
 }
  
  
}