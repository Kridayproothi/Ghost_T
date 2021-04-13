var tower,towerImg
var door,doorImg,doorsGroup
var climber,climberImg,climbersGroup
var ghost,ghostImg
var invisibleBlock,invisibleBlocksGroup
var gameState="play"
function preload(){
  towerImg=loadImage("tower.png")
  doorImg=loadImage("door.png")
  climberImg=loadImage("climber.png")
  ghostImg=loadImage("ghost-standing.png")
}

function setup (){
  createCanvas (600,600) 
  tower= createSprite (300,300)
  tower.addImage(towerImg)
  tower.velocityY=1
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale=0.4
  
  
  
  doorsGroup=new Group()
  climbersGroup=new Group()
  invisibleBlocksGroup=new Group()
  
 
}
function draw(){
  background(0)
  if(gameState==="play"){
      if(tower.y>400){
    tower.y=300
  }
  
  if(keyDown("left")){
     ghost.x=ghost.x-3
     }
  if(keyDown("right")){
    ghost.x=ghost.x+3
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5
  }
  ghost.velocityY=ghost.velocityY+0.8
 
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
     
     }
  if(invisibleBlocksGroup.isTouching(ghost)||ghost.y>600){
     ghost.destroy()
    gameState="end"
     }
    spawnDoors()
    drawSprites()
  }
  if(gameState==="end"){
     stroke("yellow")
     fill("yellow")
    textSize(30)
    text("game over",230,250)
  }
 
  
  
 
}
function spawnDoors(){
  if(frameCount%240==0){
     door=createSprite(200,-50)
    door.addImage(doorImg)
    door.velocityY=1
    door.x=Math.round(random(120,400))
    door.lifetime=800
    doorsGroup.add(door)
    
    climber=createSprite(200,10)
  climber.addImage(climberImg)
    climber.velocityY=1
    climber.x=door.x
    climber.lifetime=800
    climbersGroup.add(climber)
     ghost.depth=door.depth
    ghost.depth=ghost.depth+1
    
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    invisibleBlocksGroup.add(invisibleBlock)
   invisibleBlock.x=door.x
    invisibleBlock.velocityY=1
  }
}