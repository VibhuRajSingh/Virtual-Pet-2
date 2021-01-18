//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock; 
var feed,addFood;
var fedTime;
var lastfed=0;
var foodObj;


function preload()
{
  //load images here
  dogIMG  = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodObj = new Food();

  dog = createSprite(250,300,10,10);
  dog.addImage(dogIMG);
  dog.scale = 0.2
  foodStock =  database.ref('Food');
  foodStock.on("value",readStock);
  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
 background(46,139,87);

 foodObj.display();
 fedTime = database.ref('feedTime');
 fedTime.on("value",function(data){
 lastFed = data.val();
 })
fill("white");
textSize(15);
 if(lastfed>=12){
   text("lastfed:"+lastfed%12+"pm",350,30)
 }
 else if(lastfed===0){
   text("last fed:12am",350,30)
 }
 else{
text("lastfed:"+lastfed+"am",350,30);
 }
 
 drawSprites();

  //add styles here
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
else{
  x=x-1;
}

database.ref('/').update({
  Food:x
})
}
