//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, dogHappy;
function preload()
{
	dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
}


function draw() {  
  background(46,139,87);
  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);

}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1
  
  }
  database.ref('/').update({
    Food:x
  })
}


