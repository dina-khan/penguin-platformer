/*
Game Project Final Submission.
Candidate Number: YG1403
*/

var Penguin_x;//x position of game character
var Penguin_y;//y position of game character
var floorPos_y;

//boolean variables for character interaction
var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var treePos_y;
var tree_x; // array of x positions of trees

var clouds = []; //array of objects for clouds

var mountains = []; //array of objects for mountains

var collectables = [];//array of objects for collectables

var canyons = []; //array of objects for canyon

var canyons_2 = []; //array of objects for the second type of canyon

var cameraPosX;//variable to implement scrolling

var game_score;//variable to keep track of score

var flagpole;//flagpole object

var lives;//variable to keep track of lives

var platforms;

var enemies;

var gameover;//boolean variable used to play game over sound

var red_fish_x_pos;//x position of red fish
var green_fish_x_pos;//x position of green fish

var snowballs = [];//array of objects of snowballs

function preload()
{
    soundFormats('mp3','wav');

    jumpingSound = loadSound('assets/jump.mp3');
    landingSound = loadSound('assets/ground.mp3');
    snowflakeSound = loadSound('assets/snowflake.mp3');
    screamSound = loadSound('assets/scream.mp3');
    plummetingSound = loadSound('assets/dive.mp3');
    levelCompleteSound = loadSound('assets/applause.wav');
    gameOverSound = loadSound('assets/gameover.mp3');
    
    jumpingSound.setVolume(0.2);
    landingSound.setVolume(1);
    snowflakeSound.setVolume(0.3);
    screamSound.setVolume(0.2);
    plummetingSound.setVolume(0.5);
    levelCompleteSound.setVolume(1);
    gameOverSound.setVolume(2); 
}

function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    lives = 3; 
    startGame();
}

function startGame()
{  
    Penguin_x = width/2;
	Penguin_y = floorPos_y;
    
    isLeft=false;
    isRight=false;
    isFalling=false;
    isPlummeting=false;
    
    cameraPosX = 0;
    
    //array for x positions of trees
    tree_x = [-1520, -1400, -900, -500, 0, 120, 900, 1400, 2000, 2120, 2900, 3500, 4000, 4500];
    treePos_y = 432;
    
    //array of objects of clouds
    clouds = [{x_pos:-2000, y_pos:35, size:0.4},
               {x_pos:-1800, y_pos:-60, size:1.25},
               {x_pos:-1400, y_pos:-80, size:1},
               {x_pos:-1000, y_pos:-70, size:0.9},
               {x_pos:-1000, y_pos:-30, size:1.3},
               {x_pos:-700, y_pos:0, size:0.3},
               {x_pos:-700, y_pos:20, size:0.7},
               {x_pos:-500, y_pos:-100, size:1},
               {x_pos:-300, y_pos:-50, size:1.2},
               {x_pos:-50, y_pos:-40, size:0.5},
               {x_pos:0, y_pos:0, size:1},
               {x_pos:300, y_pos:-50, size:1.2},
               {x_pos:700, y_pos:20, size:0.7},
               {x_pos:700, y_pos:0, size:0.3},
               {x_pos:1000, y_pos:-70, size:0.9},
               {x_pos:1000, y_pos:0, size:1.3},
               {x_pos:1400, y_pos:-80, size:1},
               {x_pos:1800, y_pos:-60, size:1.25},
               {x_pos:2000, y_pos:35, size:0.4},
               {x_pos:2200, y_pos:-10, size:0.4},
               {x_pos:2500, y_pos:-65, size:1.4},
               {x_pos:3000, y_pos:5, size:1.6},
               {x_pos:3500, y_pos:20, size:0.5},
               {x_pos:3600, y_pos:0, size:1.2}]
  
    //array of objects of mountains
    mountains = [{x_pos:-1800, y_pos:0, size:1.2},
                 {x_pos:-1500, y_pos:0, size:0.5},
                 {x_pos:-1000, y_pos:0, size:1},
                 {x_pos:0, y_pos:0, size:0.8},
                 {x_pos:500, y_pos:0, size:1},
                 {x_pos:1500, y_pos:0, size:0.5},
                 {x_pos:1800, y_pos:0, size:1.2},
                 {x_pos:3000, y_pos:0, size:1.1},
                 {x_pos:4000, y_pos:0, size:0.8}]
    
    
    //array of objects of collectables
    collectables = [{x_pos:-1495, y_pos:215, size: 70, isFound:false},
                    {x_pos:-1365, y_pos:285, size: 40, isFound:false},
                    {x_pos:-1275, y_pos:325, size: 30, isFound:false},
                    {x_pos:-575, y_pos:325, size: 30, isFound:false},
                    {x_pos:-255, y_pos:215, size: 70, isFound:false},
                    {x_pos:0, y_pos:330, size: 30,isFound:false},
                    {x_pos:165, y_pos:375, size: 20, isFound:false},
                    {x_pos:225, y_pos:325, size: 50, isFound:false},
                    {x_pos:285, y_pos:375, size: 20, isFound:false},
                    {x_pos:625, y_pos:395, size: 10, isFound:false},
                    {x_pos:645, y_pos:375, size: 20, isFound:false},
                    {x_pos:685, y_pos:350, size: 30, isFound:false},
                    {x_pos:755, y_pos:315, size: 50, isFound:false},
                    {x_pos:825, y_pos:350, size: 30, isFound:false},
                    {x_pos:855, y_pos:375, size: 20, isFound:false},
                    {x_pos:865, y_pos:395, size: 10, isFound:false},
                    {x_pos:1435, y_pos:325, size: 30, isFound:false},
                    {x_pos:1585, y_pos:215, size: 50, isFound:false},
                    {x_pos:1735, y_pos:115, size: 100, isFound:false},
                    {x_pos:1885, y_pos:215, size: 50, isFound:false},
                    {x_pos:2035, y_pos:325, size: 30, isFound:false},
                    {x_pos:2793, y_pos:325, size: 50, isFound:false},
                    {x_pos:2995, y_pos:285, size: 30, isFound:false},
                    {x_pos:3045, y_pos:235, size: 50, isFound:false},
                    {x_pos:3095, y_pos:285, size: 30, isFound:false},
                    {x_pos:3717, y_pos:325, size: 50, isFound:false}]
    
    //array of objects for the first type of canyons
    canyons = [ {x_pos:-2331, width:60},
                {x_pos:-828, width:60},
                {x_pos:695, width:100},
                {x_pos:1719, width:100},
                {x_pos:2743, width:100},
                {x_pos:3767, width:100}]
    
    //array of objects for the second type of canyons
    canyons_2 = [{x_pos:-1802, width:80},
                 {x_pos:-1323, width:50},
                 {x_pos:-300, width:100},
                 {x_pos:200, width:50},
                 {x_pos:1224, width:50},
                 {x_pos:2248, width:50},
                 {x_pos:3272, width:50},
                 {x_pos:4295, width:80}]
    
    platforms = [];
    
    platforms.push(createPlatforms(330,370,170));
    platforms.push(createPlatforms(1320,360,200));
    platforms.push(createPlatforms(1500,280,150));
    platforms.push(createPlatforms(1800,280,150));
    platforms.push(createPlatforms(1980,360,200));
    platforms.push(createPlatforms(1675,210,100));
    platforms.push(createPlatforms(2250,350,170));
    platforms.push(createPlatforms(500,300,170));
    platforms.push(createPlatforms(2900,350,300));
    platforms.push(createPlatforms(0,350,50));
    platforms.push(createPlatforms(-300,360,100));
    platforms.push(createPlatforms(-750,300,150));
    platforms.push(createPlatforms(-600,350,50));
    platforms.push(createPlatforms(-2000,350,250));
    platforms.push(createPlatforms(-1300,350,50));
    platforms.push(createPlatforms(-1600,280,200));
    platforms.push(createPlatforms(-1400,320,100));
    platforms.push(createPlatforms(3600,370,200));
    
    enemies = [];
    
    enemies.push(new Enemy(-1655,430,230));
    enemies.push(new Enemy(-695,430,60));
    enemies.push(new Enemy(0,430,30));
    enemies.push(new Enemy(345,360,20));
    enemies.push(new Enemy(565,420,70));
    enemies.push(new Enemy(1495,350,50));
    enemies.push(new Enemy(1745,260,50));
    enemies.push(new Enemy(1925,350,50));
    enemies.push(new Enemy(2095,420,100));
    enemies.push(new Enemy(2945,420,100));
    enemies.push(new Enemy(3035,340,10));
    
    flagpole = {isReached: false, x_pos:4000};
    
    game_score = 0;
    
    snowball_y_pos = -1000;
    red_fish_x_pos = 1024;
    green_fish_x_pos = 0;
    
    gameover = false;
}

function draw()
{      
    //I called these functions before push() so that the sky, water and fish do not scroll with the rest of the background.
    drawSunset();
    drawFishAnimation();
    
    //This ensures that the game character remains in the center of the screen
    cameraPosX = Penguin_x - width/2;
    
    //implementing scrolling
    push();
    translate(-cameraPosX,0);

    drawMountains();

    drawClouds();

    drawTrees();

    drawSnowfallAnimation();

    //rendering the first type of canyons
    for (var i=0;i<canyons.length;i++)
    {  
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }

    //rendering the second type of canyons
    for (var i=0;i<canyons_2.length;i++)
    {
        drawCanyon2(canyons_2[i]);
        checkCanyon2(canyons_2[i]);
    }
    
    //rendering collectables
    for (var i=0;i<collectables.length;i++)
    {
        if(collectables[i].isFound==false)
        {
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);  
        }
    }
    
    //checking if the flagpole has been reached
    if (flagpole.isReached == false)
    {
         checkFlagpole();
    }
    renderFlagpole();
    
    //rendering platforms
    for(var i=0;i<platforms.length;i++)
        {
            platforms[i].draw();
        }

    //loop for rendering enemy fireballs and checking collision 
    for (var i=0;i<enemies.length;i++)
        {
            enemies[i].draw();//rendering enemies

            var isContact = enemies[i].checkContact(Penguin_x,Penguin_y);//returns true if the character collides with the enemy

            if(isContact == true)
                {
                    if (lives>0)
                        {
                            screamSound.play();//sound effect for collision with enemy fireball
                            lives-=1; //reducing lives by 1
                            startGame();//resetting the game
                            break;
                        }
                }
        }
    
    drawGameCharacter();
    
    pop();

    //PENGUIN INTERACTION CODE//
    checkCharacterInteraction();
    
    //I called these functions after pop() so that the lives and scoreboard do not scroll with the rest of the scenery.
    drawLives();
    
    drawScoreCounter();

    checkPlayerDie();//checks if the character has fallen in the canyon
        
    if(lives<1)
    {
        gameOverText();//displays game over text
        endGame();//this function ensures the character cannot move sideways after the game is over
        
        //this conditional statement ensures that the game over sound is only played once
        if (gameover == false)
        {
            gameOverSound.play();
            gameover = true;//Setting the gameover variable to true after the game over sound is played ensures that the sound does not replay continuously after the game is over.  
        }
        return;
    }

    if(flagpole.isReached==true)
    {
        levelCompleteText();//displays level complete text
        endGame();//this function ensures that the character does not move sideways after the level is complete 
            
        return;
    }
        
}

function keyPressed()
{
    
    if (keyCode == 65)
    {
        isLeft=true;
    }
    
    if(keyCode == 68)
    {
        isRight = true;
    }
    
    if(keyCode == 87)
    {
        //traversing the platforms array
        for(var i=0; i<platforms.length; i++)
        {
            //this conditional statement enables the penguin to jump if it is on the floor or on a platform
            if(Penguin_y == floorPos_y || platforms[i].checkContact(Penguin_x,Penguin_y) == true)
            {
                Penguin_y-=100;
                jumpingSound.play();//sound effect for jumping
            }
        }
        
    } 
}

function keyReleased()
{
    if (keyCode == 65)
    {
        isLeft=false;
    }
    
    else if(keyCode == 68)
    {
        isRight = false;
    }
}

function drawMountains()
{
        //loop to traverse the array of objects for mountains
        for(var i=0;i<mountains.length;i++)
        {
            fill(153,90,248);//medium shade 
        
            triangle (mountains[i].x_pos+388-(388-50)*mountains[i].size,mountains[i].y_pos+432,
                     mountains[i].x_pos+388,mountains[i].y_pos+432-(432-250)*mountains[i].size,
                     mountains[i].x_pos+388+(800-388)*mountains[i].size,mountains[i].y_pos+432);
            
            triangle (mountains[i].x_pos+750+(947-750)*mountains[i].size,mountains[i].y_pos+432,
                     mountains[i].x_pos+750,mountains[i].y_pos+432-(432-270)*mountains[i].size,
                     mountains[i].x_pos+750-(750-500)*mountains[i].size,mountains[i].y_pos+432);

            fill(191,152,250);//light shade
            
            triangle (mountains[i].x_pos+388,mountains[i].y_pos+432-(432-250)*mountains[i].size,
                     mountains[i].x_pos+388-(388-334)*mountains[i].size,mountains[i].y_pos+432,
                     mountains[i].x_pos+388-(388-50)*mountains[i].size,mountains[i].y_pos+432);

             triangle (mountains[i].x_pos+750,mountains[i].y_pos+432-(432-270)*mountains[i].size,
                      mountains[i].x_pos+750-(750-500)*mountains[i].size,mountains[i].y_pos+432,
                      mountains[i].x_pos+750-(750-660)*mountains[i].size,mountains[i].y_pos+432);

            fill(124,44,245);//dark shade
            
            triangle (mountains[i].x_pos+0*mountains[i].size,mountains[i].y_pos+432,
                     mountains[i].x_pos+200,mountains[i].y_pos+432-(432-280)*mountains[i].size,
                     mountains[i].x_pos+200+(450-200)*mountains[i].size,mountains[i].y_pos+432);

            triangle (mountains[i].x_pos+600-(600-430)*mountains[i].size,mountains[i].y_pos+432,
                     mountains[i].x_pos+600, mountains[i].y_pos+432-(432-250)*mountains[i].size,
                     mountains[i].x_pos+600+(800-600)*mountains[i].size, mountains[i].y_pos+432);

            triangle (mountains[i].x_pos+850-(850-600)*mountains[i].size,mountains[i].y_pos+432,
                     mountains[i].x_pos+850,mountains[i].y_pos+432-(432-315)*mountains[i].size,
                     mountains[i].x_pos+850+(1024-850)*mountains[i].size,mountains[i].y_pos+432);

            fill(153,90,248);// medium shade

            triangle (mountains[i].x_pos+199,mountains[i].y_pos+432-(432-280)*mountains[i].size,
                     mountains[i].x_pos+200+(256-199)*mountains[i].size,mountains[i].y_pos+432,
                     mountains[i].x_pos+199+(448-199)*mountains[i].size,mountains[i].y_pos+432);

            triangle (mountains[i].x_pos+600,mountains[i].y_pos+432-(432-249)*mountains[i].size,
                     mountains[i].x_pos+600+(626-600)*mountains[i].size,mountains[i].y_pos+432,
                     mountains[i].x_pos+600+(800-600)*mountains[i].size,mountains[i].y_pos+432);

             triangle (mountains[i].x_pos+850+(890-850)*mountains[i].size,mountains[i].y_pos+432,
                      mountains[i].x_pos+850,mountains[i].y_pos+432-(432-315)*mountains[i].size,
                      mountains[i].x_pos+850+(1024-850)*mountains[i].size,mountains[i].y_pos+432);
        }
}

function drawClouds()
{
    //loop to traverse array of cloud objects
    for (var i=0;i<clouds.length;i++)
    {
        fill(237,154,231,150);

        beginShape();
            curveVertex(clouds[i].x_pos-160*clouds[i].size,clouds[i].y_pos+200*clouds[i].size);
            curveVertex(clouds[i].x_pos,clouds[i].y_pos+200*clouds[i].size);
            curveVertex(clouds[i].x_pos-30*clouds[i].size,clouds[i].y_pos+185*clouds[i].size);
            curveVertex(clouds[i].x_pos-53*clouds[i].size,clouds[i].y_pos+190*clouds[i].size);
            curveVertex(clouds[i].x_pos-85*clouds[i].size,clouds[i].y_pos+175*clouds[i].size);
            curveVertex(clouds[i].x_pos-115*clouds[i].size,clouds[i].y_pos+190*clouds[i].size);
            curveVertex(clouds[i].x_pos-135*clouds[i].size,clouds[i].y_pos+185*clouds[i].size);
        endShape(CLOSE);
   }

}

function drawTrees()
{
    //loop to traverse the array of x positions of trees
    for (var i=0;i<tree_x.length;i++)
    {
        fill(5,65,64);//dark green structure

        triangle(tree_x[i]-50,treePos_y,
                 tree_x[i],treePos_y-100,
                 tree_x[i]+50,treePos_y);

        triangle(tree_x[i]-40,treePos_y-32,
                 tree_x[i],treePos_y-132,
                 tree_x[i]+40,treePos_y-32);

        quad(tree_x[i]-32,treePos_y-62,
             tree_x[i]-3,treePos_y-122
             ,tree_x[i]+2,treePos_y-149,
             tree_x[i]+32,treePos_y-62);

        fill(190,190,190);//shadow on the lowest layer of snow

            beginShape();
                vertex(tree_x[i]-40,treePos_y-22);
                vertex(tree_x[i]-50,treePos_y-2);
                vertex(tree_x[i]-25,treePos_y-12);
                vertex(tree_x[i]-18,treePos_y);
                vertex(tree_x[i],treePos_y-17);
                vertex(tree_x[i]+20,treePos_y);
                vertex(tree_x[i]+25,treePos_y-22);
                vertex(tree_x[i]+50,treePos_y);
                vertex(tree_x[i]+35,treePos_y-32);
                vertex(tree_x[i]+32,treePos_y-27);
                vertex(tree_x[i]+25,treePos_y-32);
                vertex(tree_x[i]-18,treePos_y-25);
                vertex(tree_x[i]-35,treePos_y-32);
            endShape(CLOSE);

        fill(255);//lowest layer of snow

            beginShape();
                vertex(tree_x[i]-40,treePos_y-22);
                vertex(tree_x[i]-50,treePos_y-2);
                vertex(tree_x[i]-30,treePos_y-17);
                vertex(tree_x[i]-18,treePos_y);
                vertex(tree_x[i]-3,treePos_y-25);
                vertex(tree_x[i]+20,treePos_y);
                vertex(tree_x[i]+26,treePos_y-27);
                vertex(tree_x[i]+50,treePos_y);
                vertex(tree_x[i]+35,treePos_y-32);
                vertex(tree_x[i]+32,treePos_y-27);
                vertex(tree_x[i]+25,treePos_y-32);
                vertex(tree_x[i]-18,treePos_y-25);
                vertex(tree_x[i]-35,treePos_y-32);
            endShape(CLOSE);

        fill(210,210,210);//shadow on third layer of snow

            beginShape();
                vertex(tree_x[i]+32,treePos_y-49);
                vertex(tree_x[i]+36,treePos_y-34);
                vertex(tree_x[i]+17,treePos_y-42);
                vertex(tree_x[i]+10,treePos_y-22);
                vertex(tree_x[i]-5,treePos_y-47);
                vertex(tree_x[i]-28,treePos_y-21);
                vertex(tree_x[i]-30,treePos_y-47);
                vertex(tree_x[i]-38,treePos_y-39);
                vertex(tree_x[i]-30,treePos_y-55);
            endShape(CLOSE);

        fill(255);//third layer of snow

             beginShape();
                vertex(tree_x[i]+32,treePos_y-49);
                vertex(tree_x[i]+36,treePos_y-34);
                vertex(tree_x[i]+12,treePos_y-47);
                vertex(tree_x[i]+10,treePos_y-22);
                vertex(tree_x[i]-12,treePos_y-54);
                vertex(tree_x[i]-28,treePos_y-21);
                vertex(tree_x[i]-30,treePos_y-49);
                vertex(tree_x[i]-38,treePos_y-39);
                vertex(tree_x[i]-30,treePos_y-55);
            endShape(CLOSE);

        fill(231,231,231);//shadow on second layer of snow

            beginShape();
                vertex(tree_x[i]-23, treePos_y-80);
                vertex(tree_x[i]-29, treePos_y-64);
                vertex(tree_x[i]-20, treePos_y-68);
                vertex(tree_x[i]-17, treePos_y-50);
                vertex(tree_x[i]-2, treePos_y-70);
                vertex(tree_x[i]+13, treePos_y-51);
                vertex(tree_x[i]+29, treePos_y-66);
                vertex(tree_x[i]+14, treePos_y-72);
                vertex(tree_x[i]-5, treePos_y-72);
            endShape(CLOSE);

        fill(255);//second layer of snow

            beginShape();
                vertex(tree_x[i]-23, treePos_y-80);
                vertex(tree_x[i]-28, treePos_y-70);
                vertex(tree_x[i]-20, treePos_y-73);
                vertex(tree_x[i]-17, treePos_y-50);
                vertex(tree_x[i]-9, treePos_y-73);
                vertex(tree_x[i]+13, treePos_y-51);
                vertex(tree_x[i]+21, treePos_y-69);
                vertex(tree_x[i]+14, treePos_y-72);
                vertex(tree_x[i]-5, treePos_y-72);
            endShape(CLOSE);

        fill(231,231,231);//shadow on topmost layer of snow

            beginShape();
                vertex(tree_x[i]+3, treePos_y-150);
                vertex(tree_x[i]+1, treePos_y-127);
                vertex(tree_x[i]-25, treePos_y-91);
                vertex(tree_x[i]-9, treePos_y-92);
                vertex(tree_x[i]+1, treePos_y-65);
                vertex(tree_x[i]+11, treePos_y-82);
                 vertex(tree_x[i]+25,treePos_y-89);
           endShape(CLOSE);

        fill(255);//top most layer of snow

            beginShape();
                vertex(tree_x[i]+3, treePos_y-150);
                vertex(tree_x[i]+2, treePos_y-130);
                vertex(tree_x[i]-2, treePos_y-110);
                vertex(tree_x[i]-10, treePos_y-101);
                vertex(tree_x[i]+2, treePos_y-78);
                vertex(tree_x[i]+11, treePos_y-86);
                vertex(tree_x[i]+25, treePos_y-89);
            endShape(CLOSE);

    } 
}

function drawCollectable(t_collectable)
{
    if(t_collectable.isFound == false)
    {   
        //light purple circles around snowflake
        noStroke();
        fill(255,0,255,50); 
        
        ellipse(t_collectable.x_pos,t_collectable.y_pos,
                t_collectable.size,t_collectable.size);
        
        ellipse(t_collectable.x_pos,t_collectable.y_pos,
                60*t_collectable.size/50,60*t_collectable.size/50);

        //////////////////BLUE OUTLINE OF SNOWFLAKE//////////////////
        
        //central circle of snowflake
        stroke(0,255,255);
        strokeWeight(5*t_collectable.size/50);
        noFill();

        ellipse(t_collectable.x_pos,t_collectable.y_pos,
                10*t_collectable.size/50,10*t_collectable.size/50);

        //arrowhead shapes on top branch of snowflake
        strokeWeight(4*t_collectable.size/50);
        stroke(0,255,255);
        noFill();
        
        beginShape();
            vertex(t_collectable.x_pos-5*t_collectable.size/50,
                   t_collectable.y_pos-23*t_collectable.size/50);
            vertex(t_collectable.x_pos,
                   t_collectable.y_pos-19*t_collectable.size/50);
            vertex(t_collectable.x_pos+5*t_collectable.size/50,
                   t_collectable.y_pos-23*t_collectable.size/50);
        endShape();

        beginShape();
            vertex(t_collectable.x_pos-5*t_collectable.size/50,
                   t_collectable.y_pos-17*t_collectable.size/50);
            vertex(t_collectable.x_pos,
                   t_collectable.y_pos-13*t_collectable.size/50);
            vertex(t_collectable.x_pos+5*t_collectable.size/50,
                   t_collectable.y_pos-17*t_collectable.size/50);
        endShape();

        //arrowhead shapes on bottom branch of snowflake
        beginShape();
             vertex(t_collectable.x_pos-5*t_collectable.size/50,
                    t_collectable.y_pos+23*t_collectable.size/50);
            vertex(t_collectable.x_pos,
                   t_collectable.y_pos+19*t_collectable.size/50);
            vertex(t_collectable.x_pos+5*t_collectable.size/50,
                   t_collectable.y_pos+23*t_collectable.size/50);
        endShape();

        beginShape();
            vertex(t_collectable.x_pos-5*t_collectable.size/50,
                   t_collectable.y_pos+17*t_collectable.size/50);
            vertex(t_collectable.x_pos,
                   t_collectable.y_pos+13*t_collectable.size/50);
            vertex(t_collectable.x_pos+5*t_collectable.size/50,
                   t_collectable.y_pos+17*t_collectable.size/50);
        endShape();

        //arrowhead shapes on right branch of snowflake
        beginShape();
            vertex(t_collectable.x_pos+23*t_collectable.size/50,
                   t_collectable.y_pos-5*t_collectable.size/50);
            vertex(t_collectable.x_pos+19*t_collectable.size/50,
                   t_collectable.y_pos);
            vertex(t_collectable.x_pos+23*t_collectable.size/50,
                   t_collectable.y_pos+5*t_collectable.size/50);
        endShape();

        beginShape();
            vertex(t_collectable.x_pos+17*t_collectable.size/50,
                   t_collectable.y_pos-5*t_collectable.size/50);
            vertex(t_collectable.x_pos+13*t_collectable.size/50,
                   t_collectable.y_pos);
            vertex(t_collectable.x_pos+17*t_collectable.size/50,
                   t_collectable.y_pos+5*t_collectable.size/50);
        endShape();

        //arrowhead shapes on left branch of snowflake
        beginShape();
            vertex(t_collectable.x_pos-23*t_collectable.size/50,
                   t_collectable.y_pos-5*t_collectable.size/50);
            vertex(t_collectable.x_pos-19*t_collectable.size/50,
                   t_collectable.y_pos);
            vertex(t_collectable.x_pos-23*t_collectable.size/50,
                   t_collectable.y_pos+5*t_collectable.size/50);
        endShape();

        beginShape();
            vertex(t_collectable.x_pos-17*t_collectable.size/50,
                   t_collectable.y_pos-5*t_collectable.size/50);
            vertex(t_collectable.x_pos-13*t_collectable.size/50,
                   t_collectable.y_pos);
            vertex(t_collectable.x_pos-17*t_collectable.size/50,
                   t_collectable.y_pos+5*t_collectable.size/50);
        endShape();

        //top branch of snowflake
         line(t_collectable.x_pos,t_collectable.y_pos-25*t_collectable.size/50,
              t_collectable.x_pos,t_collectable.y_pos-5*t_collectable.size/50);

        //bottom branch of snowflake
        line(t_collectable.x_pos,t_collectable.y_pos+5*t_collectable.size/50,
             t_collectable.x_pos,t_collectable.y_pos+25*t_collectable.size/50);

        //left branch of snowflake
        line(t_collectable.x_pos-25*t_collectable.size/50,t_collectable.y_pos,
             t_collectable.x_pos-5*t_collectable.size/50,t_collectable.y_pos);

        //right branch of snowflake
        line(t_collectable.x_pos+5*t_collectable.size/50,t_collectable.y_pos,
             t_collectable.x_pos+25*t_collectable.size/50,t_collectable.y_pos);

        //tear drop shape at top right of snowflake
        arc (t_collectable.x_pos+10*t_collectable.size/50,
             t_collectable.y_pos-10*t_collectable.size/50,
             8*t_collectable.size/50,8*t_collectable.size/50, 0, PI+HALF_PI);

        beginShape();
            vertex(t_collectable.x_pos+11*t_collectable.size/50,
                   t_collectable.y_pos-14*t_collectable.size/50);
            vertex(t_collectable.x_pos+14*t_collectable.size/50,
                    t_collectable.y_pos-14*t_collectable.size/50); 
            vertex(t_collectable.x_pos+14*t_collectable.size/50,
                    t_collectable.y_pos-11*t_collectable.size/50); 
        endShape();

         //tear drop shape at top left of snowflake
        arc(t_collectable.x_pos-10*t_collectable.size/50,
                t_collectable.y_pos-10*t_collectable.size/50,
                8*t_collectable.size/50,8*t_collectable.size/50,TWO_PI-HALF_PI,PI);

        beginShape();
            vertex(t_collectable.x_pos-11*t_collectable.size/50,
                   t_collectable.y_pos-(295-281)*t_collectable.size/50);
            vertex(t_collectable.x_pos-14*t_collectable.size/50,
                   t_collectable.y_pos-14*t_collectable.size/50);
            vertex(t_collectable.x_pos-14*t_collectable.size/50,
                   t_collectable.y_pos-11*t_collectable.size/50); 
        endShape();

        //tear drop shape at bottom left of snowflake
        arc(t_collectable.x_pos-10*t_collectable.size/50,
            t_collectable.y_pos+10*t_collectable.size/50,
            8*t_collectable.size/50,8*t_collectable.size/50,PI,HALF_PI);

        beginShape();
            vertex(t_collectable.x_pos-14*t_collectable.size/50,
                   t_collectable.y_pos+11*t_collectable.size/50);
            vertex(t_collectable.x_pos-(335-321)*t_collectable.size/50,
                   t_collectable.y_pos+14*t_collectable.size/50);
            vertex(t_collectable.x_pos-11*t_collectable.size/50,
                   t_collectable.y_pos+14*t_collectable.size/50);
        endShape();

        //tear drop shape at bottom right of snowflake
        arc(t_collectable.x_pos+10*t_collectable.size/50,
            t_collectable.y_pos+10*t_collectable.size/50,
            8*t_collectable.size/50,8*t_collectable.size/50,HALF_PI,TWO_PI);

        beginShape();
            vertex(t_collectable.x_pos+14*t_collectable.size/50,
                   t_collectable.y_pos+11*t_collectable.size/50);
            vertex(t_collectable.x_pos+14*t_collectable.size/50,
                   t_collectable.y_pos+14*t_collectable.size/50);
            vertex(t_collectable.x_pos+11*t_collectable.size/50,
                   t_collectable.y_pos+14*t_collectable.size/50);
        endShape();

        //bottom left branch     
        line(t_collectable.x_pos-7*t_collectable.size/50,
             t_collectable.y_pos+7*t_collectable.size/50,
             t_collectable.x_pos-4*t_collectable.size/50,
             t_collectable.y_pos+4*t_collectable.size/50);
        //top right branch
        line(t_collectable.x_pos+4*t_collectable.size/50,
             t_collectable.y_pos-4*t_collectable.size/50,
             t_collectable.x_pos+7*t_collectable.size/50,
             t_collectable.y_pos-7*t_collectable.size/50); 

        //top left branch
         line(t_collectable.x_pos-7*t_collectable.size/50,
              t_collectable.y_pos-7*t_collectable.size/50,
              t_collectable.x_pos-4*t_collectable.size/50,
              t_collectable.y_pos-4*t_collectable.size/50);
        //bottom right branch
        line(t_collectable.x_pos+4*t_collectable.size/50,
             t_collectable.y_pos+4*t_collectable.size/50,
             t_collectable.x_pos+7*t_collectable.size/50,
             t_collectable.y_pos+7*t_collectable.size/50);

        //////////////////////////WHITE CENTER//////////////////////
        strokeWeight(2*t_collectable.size/50)
        stroke(255);
        noFill();

           //arrowhead shapes on top branch of snowflake
         beginShape();
            vertex(t_collectable.x_pos-5*t_collectable.size/50,
                   t_collectable.y_pos-23*t_collectable.size/50);
            vertex(t_collectable.x_pos,
                   t_collectable.y_pos-19*t_collectable.size/50);
            vertex(t_collectable.x_pos+5*t_collectable.size/50,
                   t_collectable.y_pos-23*t_collectable.size/50);
        endShape();

        beginShape();
            vertex(t_collectable.x_pos-5*t_collectable.size/50,
                   t_collectable.y_pos-17*t_collectable.size/50);
            vertex(t_collectable.x_pos,
                   t_collectable.y_pos-13*t_collectable.size/50);
            vertex(t_collectable.x_pos+5*t_collectable.size/50,
                   t_collectable.y_pos-17*t_collectable.size/50);
        endShape();

        //arrowhead shapes on bottom branch of snowflake
        beginShape();
             vertex(t_collectable.x_pos-5*t_collectable.size/50,
                    t_collectable.y_pos+23*t_collectable.size/50);
            vertex(t_collectable.x_pos,
                   t_collectable.y_pos+19*t_collectable.size/50);
            vertex(t_collectable.x_pos+5*t_collectable.size/50,
                   t_collectable.y_pos+23*t_collectable.size/50);
        endShape();

        beginShape();
            vertex(t_collectable.x_pos-5*t_collectable.size/50,
                   t_collectable.y_pos+17*t_collectable.size/50);
            vertex(t_collectable.x_pos,
                   t_collectable.y_pos+13*t_collectable.size/50);
            vertex(t_collectable.x_pos+5*t_collectable.size/50,
                   t_collectable.y_pos+17*t_collectable.size/50);
        endShape();

        //arrowhead shapes on right branch of snowflake
        beginShape();
            vertex(t_collectable.x_pos+23*t_collectable.size/50,
                   t_collectable.y_pos-5*t_collectable.size/50);
            vertex(t_collectable.x_pos+19*t_collectable.size/50,
                   t_collectable.y_pos);
            vertex(t_collectable.x_pos+23*t_collectable.size/50,
                   t_collectable.y_pos+5*t_collectable.size/50);
        endShape();

        beginShape();
            vertex(t_collectable.x_pos+17*t_collectable.size/50,
                   t_collectable.y_pos-5*t_collectable.size/50);
            vertex(t_collectable.x_pos+13*t_collectable.size/50,
                   t_collectable.y_pos);
            vertex(t_collectable.x_pos+17*t_collectable.size/50,
                   t_collectable.y_pos+5*t_collectable.size/50);
        endShape();

        //arrowhead shapes on left branch of snowflake
        beginShape();
            vertex(t_collectable.x_pos-23*t_collectable.size/50,
                   t_collectable.y_pos-5*t_collectable.size/50);
            vertex(t_collectable.x_pos-19*t_collectable.size/50,
                   t_collectable.y_pos);
            vertex(t_collectable.x_pos-23*t_collectable.size/50,
                   t_collectable.y_pos+5*t_collectable.size/50);
        endShape();

        beginShape();
            vertex(t_collectable.x_pos-17*t_collectable.size/50,
                   t_collectable.y_pos-5*t_collectable.size/50);
            vertex(t_collectable.x_pos-13*t_collectable.size/50,
                   t_collectable.y_pos);
            vertex(t_collectable.x_pos-17*t_collectable.size/50,
                   t_collectable.y_pos+5*t_collectable.size/50);
        endShape();

        //top branch of snowflake
         line(t_collectable.x_pos,t_collectable.y_pos-25*t_collectable.size/50,
              t_collectable.x_pos,t_collectable.y_pos-5*t_collectable.size/50);

        //bottom branch of snowflake
        line(t_collectable.x_pos,t_collectable.y_pos+5*t_collectable.size/50,
             t_collectable.x_pos,t_collectable.y_pos+25*t_collectable.size/50);

        //left branch of snowflake
        line(t_collectable.x_pos-25*t_collectable.size/50,t_collectable.y_pos,
             t_collectable.x_pos-5*t_collectable.size/50,t_collectable.y_pos);

        //right branch of snowflake
        line(t_collectable.x_pos+5*t_collectable.size/50,t_collectable.y_pos,
             t_collectable.x_pos+25*t_collectable.size/50,t_collectable.y_pos);

        //tear drop shape at top right of snowflake
        arc (t_collectable.x_pos+10*t_collectable.size/50,
             t_collectable.y_pos-10*t_collectable.size/50,
             8*t_collectable.size/50,8*t_collectable.size/50, 0, PI+HALF_PI);

        beginShape();
            vertex(t_collectable.x_pos+11*t_collectable.size/50,
                   t_collectable.y_pos-14*t_collectable.size/50);
            vertex(t_collectable.x_pos+14*t_collectable.size/50,
                    t_collectable.y_pos-14*t_collectable.size/50); 
            vertex(t_collectable.x_pos+14*t_collectable.size/50,
                    t_collectable.y_pos-11*t_collectable.size/50); 
        endShape();

         //tear drop shape at top left of snowflake
        arc(t_collectable.x_pos-10*t_collectable.size/50,
                t_collectable.y_pos-10*t_collectable.size/50,
                8*t_collectable.size/50,8*t_collectable.size/50,TWO_PI-HALF_PI,PI);

        beginShape();
            vertex(t_collectable.x_pos-11*t_collectable.size/50,
                   t_collectable.y_pos-(295-281)*t_collectable.size/50);
            vertex(t_collectable.x_pos-14*t_collectable.size/50,
                   t_collectable.y_pos-14*t_collectable.size/50);
            vertex(t_collectable.x_pos-14*t_collectable.size/50,
                   t_collectable.y_pos-11*t_collectable.size/50); 
        endShape();

        //tear drop shape at bottom left of snowflake
        arc(t_collectable.x_pos-10*t_collectable.size/50,
            t_collectable.y_pos+10*t_collectable.size/50,
            8*t_collectable.size/50,8*t_collectable.size/50,PI,HALF_PI);

        beginShape();
            vertex(t_collectable.x_pos-14*t_collectable.size/50,
                   t_collectable.y_pos+11*t_collectable.size/50);
            vertex(t_collectable.x_pos-(335-321)*t_collectable.size/50,
                   t_collectable.y_pos+14*t_collectable.size/50);
            vertex(t_collectable.x_pos-11*t_collectable.size/50,
                   t_collectable.y_pos+14*t_collectable.size/50);
        endShape();

        //tear drop shape at bottom right of snowflake
        arc(t_collectable.x_pos+10*t_collectable.size/50,
            t_collectable.y_pos+10*t_collectable.size/50,
            8*t_collectable.size/50,8*t_collectable.size/50,HALF_PI,TWO_PI);

        beginShape();
            vertex(t_collectable.x_pos+14*t_collectable.size/50,
                   t_collectable.y_pos+11*t_collectable.size/50);
            vertex(t_collectable.x_pos+14*t_collectable.size/50,
                   t_collectable.y_pos+14*t_collectable.size/50);
            vertex(t_collectable.x_pos+11*t_collectable.size/50,
                   t_collectable.y_pos+14*t_collectable.size/50);
        endShape();

        //bottom left branch     
        line(t_collectable.x_pos-7*t_collectable.size/50,
             t_collectable.y_pos+7*t_collectable.size/50,
             t_collectable.x_pos-4*t_collectable.size/50,
             t_collectable.y_pos+4*t_collectable.size/50);
        //top right branch
        line(t_collectable.x_pos+4*t_collectable.size/50,
             t_collectable.y_pos-4*t_collectable.size/50,
             t_collectable.x_pos+7*t_collectable.size/50,
             t_collectable.y_pos-7*t_collectable.size/50); 

        //top left branch
         line(t_collectable.x_pos-7*t_collectable.size/50,
              t_collectable.y_pos-7*t_collectable.size/50,
              t_collectable.x_pos-4*t_collectable.size/50,
              t_collectable.y_pos-4*t_collectable.size/50);
        //bottom right branch
        line(t_collectable.x_pos+4*t_collectable.size/50,
             t_collectable.y_pos+4*t_collectable.size/50,
             t_collectable.x_pos+7*t_collectable.size/50,
             t_collectable.y_pos+7*t_collectable.size/50);

        //////////CIRCLES AT THE CORNERS OF SNOWFLAKE/////////
        fill(255);
        stroke(0,255,255);
        strokeWeight(1*t_collectable.size/50);

        //top right corner
            ellipse(t_collectable.x_pos+19*t_collectable.size/50,
                    t_collectable.y_pos-19*t_collectable.size/50,
                    3*t_collectable.size/50,3*t_collectable.size/50);

        //bottom left corner
            ellipse(t_collectable.x_pos-19*t_collectable.size/50,
                    t_collectable.y_pos+19*t_collectable.size/50,
                    3*t_collectable.size/50,3*t_collectable.size/50);

        //top left corner
            ellipse(t_collectable.x_pos-19*t_collectable.size/50,
                    t_collectable.y_pos-19*t_collectable.size/50,
                    3*t_collectable.size/50,3*t_collectable.size/50);

        //bottom right corner
            ellipse(t_collectable.x_pos+19*t_collectable.size/50,
                    t_collectable.y_pos+19*t_collectable.size/50,
                    3*t_collectable.size/50,3*t_collectable.size/50);

        //CIRCLE AT THE CENTER OF SNOWFLAKE//
        noFill();
        strokeWeight(2*t_collectable.size/50);
        stroke(255);
        
        ellipse(t_collectable.x_pos,t_collectable.y_pos,
                 10*t_collectable.size/50,10*t_collectable.size/50);
    }
}

function checkCollectable(t_collectable)
{
    if(dist (Penguin_x,Penguin_y-40,t_collectable.x_pos,t_collectable.y_pos)<t_collectable.size)
    {
        t_collectable.isFound=true;
        game_score+=1;//incrementing score
        snowflakeSound.play();//sound effect for collecting the snowflakes
    }    
}

function drawCanyon(t_canyon)
{
    noStroke();
    //GLACIER INSIDE THE CANYON//
    fill(31,242,248,150);//highlights at the edges of the glacier
    triangle(t_canyon.x_pos-38,538,t_canyon.x_pos-6,521,t_canyon.x_pos-8,535);
    triangle(t_canyon.x_pos-8,535,t_canyon.x_pos-6,520,t_canyon.x_pos-21,495);
    triangle(t_canyon.x_pos+55,511,t_canyon.x_pos+53,523,t_canyon.x_pos+65,529);

    fill(40,186,198,150);//shadows at the edges of the glacier
    
    triangle(t_canyon.x_pos+54,510,t_canyon.x_pos+53,523,t_canyon.x_pos+82,497);

    beginShape();
        vertex(t_canyon.x_pos-11,553);
        vertex(t_canyon.x_pos+65,527);
        vertex(t_canyon.x_pos+72,540);
        vertex(t_canyon.x_pos+45,543);
        vertex(t_canyon.x_pos+38,557);
        vertex(t_canyon.x_pos+20,549);
    endShape(CLOSE);

    fill(147,249,251,150);

    //small piece of ice broken off the glacier
    beginShape();
        vertex(t_canyon.x_pos-20,516);
        vertex(t_canyon.x_pos-45,520);
        vertex(t_canyon.x_pos-35,515);
        vertex(t_canyon.x_pos-35,505);
    endShape(CLOSE);

    //top of the glacier
    beginShape();
        vertex(t_canyon.x_pos-10,553);
        vertex(t_canyon.x_pos-38,538);
        vertex(t_canyon.x_pos-6,521);
        vertex(t_canyon.x_pos-20,495);
        vertex(t_canyon.x_pos+31,468);
        vertex(t_canyon.x_pos+83,495);
        vertex(t_canyon.x_pos+55,512);
        vertex(t_canyon.x_pos+65,530);
    endShape(CLOSE);
    
    //ICE TO THE RIGHT SIDE OF THE CANYON//    
    fill(147,249,251,150);

    beginShape();
        vertex(t_canyon.x_pos+5+t_canyon.width,432);
        vertex(t_canyon.x_pos-12+t_canyon.width,454);
        vertex(t_canyon.x_pos+75+t_canyon.width,505);
        vertex(t_canyon.x_pos+35+t_canyon.width,530);
        vertex(t_canyon.x_pos+84+t_canyon.width,576);
        vertex(t_canyon.x_pos+329,576);
        vertex(t_canyon.x_pos+329,432);
    endShape(CLOSE);

    fill(31,242,248,150);//highlights of ice at right edge of the canyon
    
    triangle (t_canyon.x_pos-12+t_canyon.width,454,
             t_canyon.x_pos+75+t_canyon.width,505,
             t_canyon.x_pos+65+t_canyon.width,530);

    triangle (t_canyon.x_pos+75+t_canyon.width,505,
              t_canyon.x_pos+65+t_canyon.width,530,
              t_canyon.x_pos+35+t_canyon.width,530);

    triangle (t_canyon.x_pos+25+t_canyon.width,432,
              t_canyon.x_pos+5+t_canyon.width,432,
              t_canyon.x_pos-12+t_canyon.width,454);
    
    //ICE TO THE LEFT SIDE OF THE CANYON//

    fill(147,249,251,150);//top of ice to the left side of the canyon
    
    beginShape();
        vertex(t_canyon.x_pos-245,432);
        vertex(t_canyon.x_pos,432);
        vertex(t_canyon.x_pos-30,460);
        vertex(t_canyon.x_pos-45,455);
        vertex(t_canyon.x_pos-145,465);
        vertex(t_canyon.x_pos-125,445);
        vertex(t_canyon.x_pos-45,500);
        vertex(t_canyon.x_pos-95,510);
        vertex(t_canyon.x_pos-140,495);
        vertex(t_canyon.x_pos-145,520);
        vertex(t_canyon.x_pos-75,556);
        vertex(t_canyon.x_pos-195,576);
        vertex(t_canyon.x_pos-245,576);
    endShape(CLOSE);

    fill(40,186,198,150);//shadows of ice at left edge of the canyon

    triangle (t_canyon.x_pos-125,520,
             t_canyon.x_pos-140,495,
             t_canyon.x_pos-145,520);

    triangle (t_canyon.x_pos-95,510,
             t_canyon.x_pos-45,500,
             t_canyon.x_pos-105,540);

    triangle (t_canyon.x_pos-75,556,
             t_canyon.x_pos-195,576,
             t_canyon.x_pos-65,576);

    triangle (t_canyon.x_pos-45,455,
             t_canyon.x_pos-105,480,
             t_canyon.x_pos-102,460);

    quad (t_canyon.x_pos,432,
         t_canyon.x_pos-30,460,
         t_canyon.x_pos-35,470,
         t_canyon.x_pos-5,450);

    fill(31,242,248,150);//higlights of ice at left edge of the canyon
    
    quad (t_canyon.x_pos-35,470,
         t_canyon.x_pos-30,460,
         t_canyon.x_pos-45,455,
         t_canyon.x_pos-105,480);	

    quad (t_canyon.x_pos-125,520,
          t_canyon.x_pos-105,540,
          t_canyon.x_pos-95,510,
          t_canyon.x_pos-140,495);

    triangle(t_canyon.x_pos-105,480,
             t_canyon.x_pos-102,461,
             t_canyon.x_pos-45,500);     
}

function checkCanyon(t_canyon)
{
    //conditional statement to detect collision with the canyon
     if ((Penguin_x>t_canyon.x_pos && Penguin_x<t_canyon.x_pos+t_canyon.width) && 
         (Penguin_y>=floorPos_y)) 
            {
                //This conditional statement ensures that the plummeting sound effect is only played once while falling down the canyon
                if (isPlummeting == false)
                    {
                        plummetingSound.play();
                        isPlummeting=true;//setting the isPlummeting variable to true after the plummeting sound is played ensures that the sound effect is not replayed continuously while the penguin falls down the canyon
                    } 
            }
}

function drawCanyon2(t_canyon_2)
{
    noStroke();
    //ICE TO THE RIGHT OF CANYON TYPE 2//
            
    fill(147,249,251,150);// top of glacier to the right side of canyon type 2

    beginShape();
        vertex(t_canyon_2.x_pos+t_canyon_2.width,480);	
        vertex(t_canyon_2.x_pos+20+t_canyon_2.width,450);
        vertex(t_canyon_2.x_pos+t_canyon_2.width,432);
        vertex(t_canyon_2.x_pos+200+t_canyon_2.width,432);
        vertex(t_canyon_2.x_pos+200+t_canyon_2.width,576);
        vertex(t_canyon_2.x_pos+50+t_canyon_2.width,576);
        vertex(t_canyon_2.x_pos-10+t_canyon_2.width,550);
        vertex(t_canyon_2.x_pos+50+t_canyon_2.width,500);	
    endShape(CLOSE);

    fill(31,242,248,150);//highlights of ice at the right edge of canyon type 2

    triangle(t_canyon_2.x_pos+50+t_canyon_2.width,576,
             t_canyon_2.x_pos-10+t_canyon_2.width,550,
             t_canyon_2.x_pos+10+t_canyon_2.width,576);

    triangle(t_canyon_2.x_pos+20+t_canyon_2.width,450,
             t_canyon_2.x_pos+t_canyon_2.width,480,
             t_canyon_2.x_pos+20+t_canyon_2.width,470);

    triangle(t_canyon_2.x_pos+20+t_canyon_2.width,450,
             t_canyon_2.x_pos+t_canyon_2.width,432,
             t_canyon_2.x_pos+20+t_canyon_2.width,470);

    //ice broken off the right edge of canyon type 2
    beginShape();
        vertex(t_canyon_2.x_pos-10+t_canyon_2.width,515);
        vertex(t_canyon_2.x_pos+t_canyon_2.width,510);
        vertex(t_canyon_2.x_pos-1+t_canyon_2.width,505);
        vertex(t_canyon_2.x_pos+10+t_canyon_2.width,515);
        vertex(t_canyon_2.x_pos+t_canyon_2.width,525);
    endShape(CLOSE);

    fill(31,242,248,150);
    
    triangle(t_canyon_2.x_pos-10+t_canyon_2.width,515,
             t_canyon_2.x_pos-10+t_canyon_2.width,520,
             t_canyon_2.x_pos+t_canyon_2.width,525);

    triangle(t_canyon_2.x_pos+t_canyon_2.width,510,
             t_canyon_2.x_pos-1+t_canyon_2.width,505,
             t_canyon_2.x_pos-10+t_canyon_2.width,520);	

    fill(147,249,251,150);
    
    triangle(t_canyon_2.x_pos-25+t_canyon_2.width,538,
             t_canyon_2.x_pos-22+t_canyon_2.width,530,
             t_canyon_2.x_pos-15+t_canyon_2.width,530);

    fill(40,186,198,150);
    
    triangle(t_canyon_2.x_pos-25+t_canyon_2.width,538,
             t_canyon_2.x_pos-18+t_canyon_2.width,536,
             t_canyon_2.x_pos-15+t_canyon_2.width,530);
    
    //ICE TO THE LEFT OF CANYON TYPE 2//
            
    fill(147,249,251,150);//top of ice to the left side of canyon type 2

    beginShape();
        vertex(t_canyon_2.x_pos-200,576);
        vertex(t_canyon_2.x_pos-200,432);
        vertex(t_canyon_2.x_pos-4,432);
        vertex(t_canyon_2.x_pos-23,445);
        vertex(t_canyon_2.x_pos-6,490);
        vertex(t_canyon_2.x_pos-10,502);
        vertex(t_canyon_2.x_pos-23,498);
        vertex(t_canyon_2.x_pos-20,505);
        vertex(t_canyon_2.x_pos-24,522);
        vertex(t_canyon_2.x_pos-63,550);
        vertex(t_canyon_2.x_pos-5,576);
    endShape(CLOSE);

    fill(40,186,198,150);//shadows of ice to the left of canyon type 2

     beginShape();
        vertex(t_canyon_2.x_pos-4,432);
        vertex(t_canyon_2.x_pos-23,445);
        vertex(t_canyon_2.x_pos-30,465);
    endShape(CLOSE);

    beginShape();
        vertex(t_canyon_2.x_pos-24,522);
        vertex(t_canyon_2.x_pos-63,550);
        vertex(t_canyon_2.x_pos-65,565);
     endShape(CLOSE);

    fill(31,242,248,150);//higlights of ice to the left of canyon type 2

     beginShape();
        vertex(t_canyon_2.x_pos-23,445);
        vertex(t_canyon_2.x_pos-30,465);
        vertex(t_canyon_2.x_pos-6,490);
    endShape(CLOSE);

    beginShape();
        vertex(t_canyon_2.x_pos-63,550);
        vertex(t_canyon_2.x_pos-65,565);
        vertex(t_canyon_2.x_pos-5,576);
    endShape(CLOSE);                      
}

function checkCanyon2(t_canyon_2)
{
    //conditional statement to detect collision with the canyon
    if ((Penguin_x>t_canyon_2.x_pos && Penguin_x<t_canyon_2.x_pos+t_canyon_2.width) 
         && (Penguin_y>=floorPos_y))
    { 
        if (isPlummeting == false)
        {
            plummetingSound.play();
            isPlummeting=true;//setting the isPlummeting variable to true after the plummeting sound is played ensures that the sound effect is not replayed continuously while the penguin falls down the canyon
        } 
    }
}

function drawGameCharacter()
{    
            if(isLeft && isFalling)
            {
                //SHADOW BENEATH PENGUIN
                fill(0,50);
                    ellipse(Penguin_x-4, Penguin_y-9, 40, 10);

                //FOOT
                fill(255,128,0);
                stroke(0); 
                    arc(Penguin_x, Penguin_y-15, 14, 14, PI/15, PI-PI/15);

                //TOES
                fill(192,192,192);
                    arc(Penguin_x+5, Penguin_y-15, 5, 4, PI/9, PI);
                    arc(Penguin_x, Penguin_y-15, 5, 4, 0, PI);
                    arc(Penguin_x-5, Penguin_y-15, 5, 4, 0, PI-PI/9);

                //BLACK STRUCTURE
                fill(0);
                    ellipse (Penguin_x-8, Penguin_y-55, 25, 25);//top
                    ellipse (Penguin_x-17, Penguin_y-39, 10, 45);//left side
                    ellipse (Penguin_x-3, Penguin_y-39, 23, 47);//right side
                    ellipse (Penguin_x-9, Penguin_y-21, 22, 15);//bottom

                //FEATHERS ON TOP OF HEAD
                fill(0);
                noStroke();
                    arc(Penguin_x-11, Penguin_y-68,6,12,PI+HALF_PI,TWO_PI,CHORD);
                    arc(Penguin_x-8, Penguin_y-74,6,12,HALF_PI,PI,CHORD);
                    arc(Penguin_x+-4.5, Penguin_y-68,6,12,PI,PI+HALF_PI,CHORD);
                    arc(Penguin_x+-7.5, Penguin_y-74,6,12,0,HALF_PI,CHORD);

                //WHITE MIDDLE
                fill(255);
                stroke(0);
                    ellipse(Penguin_x-18,Penguin_y-40,10,40);

                //SHADOW ON PENGUIN
                noStroke();
                fill(0,50);
                    ellipse(Penguin_x-18,Penguin_y-40,10,40);

                fill(255);
                    ellipse(Penguin_x-19,Penguin_y-40,6,37);

               //HORIZONTAL PORTION OF SCARF
                fill(0);
                    arc(Penguin_x-6,Penguin_y-40,35,10,0,PI,CHORD);
                    rect(Penguin_x-24,Penguin_y-50,35,10);

                fill(217,0,82);
                    arc(Penguin_x-5,Penguin_y-40,30,8,0,PI,CHORD);
                    rect(Penguin_x-23,Penguin_y-50,33,10);

                fill(0);
                    arc(Penguin_x-5,Penguin_y-50,31,8,0,PI,CHORD);

                fill(255);
                    quad(Penguin_x-14.5,Penguin_y-51,Penguin_x-21.5,Penguin_y-51,
                         Penguin_x-22,Penguin_y-49,Penguin_x-14.5,Penguin_y-48);

                fill(0,50);
                    quad(Penguin_x-14,Penguin_y-51,Penguin_x-13,Penguin_y-47,
                         Penguin_x-16,Penguin_y-48,Penguin_x-16.5,Penguin_y-51);

                //LOOP FOR PATTERN ON HORIZONTAL PORTION OF SCARF
                stroke(255);
                fill(255);
                    //this nested for loop creates a pattern of polka dots that repeat horizontally and vertically, and lines that repeat horizontally
                    for(var b=Penguin_x-19;b<Penguin_x+20;b+=7)
                    {
                        for(var a=Penguin_y-44;a<Penguin_y-37;a+=4)
                        {
                        
                            ellipse(b,a,2,2);
                            line(b-3,Penguin_y-38,b-3,Penguin_y-45);    
                        }
                    }

                //HANGING PORTION OF SCARF
                stroke(0);
                fill(217,0,82);
                    quad(Penguin_x-4,Penguin_y-49,Penguin_x+6,Penguin_y-51,
                         Penguin_x+20,Penguin_y-35,Penguin_x+12,Penguin_y-30);

                //PATTERN ON HANGING PORTION OF SCARF
                fill(255);
                stroke(255);
                    line(Penguin_x,Penguin_y-47,Penguin_x+6,Penguin_y-49);
                    line(Penguin_x+4,Penguin_y-42,Penguin_x+10,Penguin_y-44);
                    ellipse(Penguin_x+5,Penguin_y-46,2,2);
                    ellipse(Penguin_x+10,Penguin_y-40,2,2);

                //TASSLES ON SCARF
                fill(217,0,82);
                stroke(0);
                    arc(Penguin_x+14,Penguin_y-30,2,8,TWO_PI-PI/3,PI);
                    arc(Penguin_x+18,Penguin_y-33,2,8,TWO_PI-PI/3,PI);

                //GLASSES
                fill(26,2,119);
                    arc(Penguin_x-16,Penguin_y-55,13,17,0,PI,CHORD);

                //REFLECTION ON GLASSES
                fill(255,150);
                noStroke();
                    quad(Penguin_x-19,Penguin_y-55,Penguin_x-16,Penguin_y-55,
                         Penguin_x-19,Penguin_y-48,Penguin_x-23,Penguin_y-50);
                    quad(Penguin_x-15,Penguin_y-55,Penguin_x-13,Penguin_y-55,
                         Penguin_x-17,Penguin_y-45,Penguin_x-19,Penguin_y-45);

                //ARMS
                fill(0);
                    arc(Penguin_x-14,Penguin_y-32, 20,10.5,PI,PI+PI/2+PI/3);
                    arc(Penguin_x+10,Penguin_y-32, 20,10.5,TWO_PI-PI/2-PI/3,TWO_PI);

                fill(255);
                    arc(Penguin_x-12,Penguin_y-33, 18,5,PI,PI+PI/2+PI/3);
                    arc(Penguin_x+8,Penguin_y-33, 18,5,TWO_PI-PI/2-PI/3,TWO_PI);

                //FOOT
                fill(255,128,0);
                stroke(0); 
                    arc(Penguin_x-15,Penguin_y-11,14,14,PI/15,PI-PI/15);

                //TOES
                fill(192,192,192);
                    arc(Penguin_x-20,Penguin_y-11,5,4,PI/9,PI);
                    arc(Penguin_x-15,Penguin_y-11,5,4,0,PI);
                    arc(Penguin_x-10,Penguin_y-11,5,4,0,PI-PI/9);

                //LEGS
                strokeWeight(2);
                stroke(0);
                    line(Penguin_x,Penguin_y-10,Penguin_x-10,Penguin_y-15);
                    line(Penguin_x-10,Penguin_y-15,Penguin_x-15,Penguin_y-9);

                strokeWeight(1);
                stroke(255,128,0);
                    line(Penguin_x,Penguin_y-10,Penguin_x-5,Penguin_y-13);
                    line(Penguin_x-10,Penguin_y-15,Penguin_x-15,Penguin_y-9);
                noStroke();
            }
            else if(isRight && isFalling)
            {  
                //SHADOW BENEATH PENGUIN
                fill(0,50);
                    ellipse (Penguin_x-4,Penguin_y-9,40,10);

                //FOOT
                fill(255,128,0);
                stroke(0); 
                    arc (Penguin_x,Penguin_y-15,14,14,PI/15,PI-PI/15);

                //TOES
                fill(192,192,192);
                    arc (Penguin_x+5,Penguin_y-15,5,4,PI/9,PI);
                    arc (Penguin_x,Penguin_y-15,5,4,0,PI);
                    arc (Penguin_x-5,Penguin_y-15,5,4,0,PI-PI/9);

                //BLACK STRUCTURE
                fill(0);
                    ellipse (Penguin_x+8,Penguin_y-55,25,25);
                    ellipse (Penguin_x+17,Penguin_y-39,10,45);
                    ellipse (Penguin_x+3,Penguin_y-39,23,47);
                    ellipse (Penguin_x+9,Penguin_y-21,22,15);

                //FEATHERS ON TOP OF HEAD
                noStroke();
                    arc(Penguin_x+5,Penguin_y-68,6,12,PI+HALF_PI,TWO_PI,CHORD);
                    arc(Penguin_x+8,Penguin_y-74,6,12,HALF_PI,PI,CHORD);
                    arc(Penguin_x+11.5,Penguin_y-68,6,12,PI,PI+HALF_PI,CHORD);
                    arc(Penguin_x+8.5,Penguin_y-74,6,12,0,HALF_PI,CHORD);

                //WHITE MIDDLE
                fill(255);
                stroke(0);
                    ellipse(Penguin_x+18,Penguin_y-40,10,40);

               //SHADOW ON PENGUIN
                noStroke();
                fill(0,50);
                     ellipse(Penguin_x+18,Penguin_y-40,10,40);
                
                fill(255);
                    ellipse(Penguin_x+19,Penguin_y-40,6,37);

               //HORIZONTAL PORTION OF SCARF
                fill(0);
                    arc(Penguin_x+6.5,Penguin_y-40,35,10,0,PI,CHORD);
                    rect(Penguin_x-12,Penguin_y-50,35,10);

                fill(217,0,82);
                    arc(Penguin_x+7,Penguin_y-40,30,8,0,PI,CHORD);
                    rect(Penguin_x-11,Penguin_y-50,33,10);

                fill(0);
                    arc(Penguin_x+7,Penguin_y-50,31,8,0,PI,CHORD);

                fill(255);
                    quad(Penguin_x+14.5,Penguin_y-51,Penguin_x+21.5,Penguin_y-51,
                         Penguin_x+22,Penguin_y-49,Penguin_x+14.5,Penguin_y-48);
                
                fill(0,50);
                    quad(Penguin_x+14,Penguin_y-51,Penguin_x+13,Penguin_y-47,
                         Penguin_x+16,Penguin_y-48,Penguin_x+16.5,Penguin_y-51);

                //LOOP FOR PATTERN ON HORIZONTAL PORTION OF SCARF
                stroke(255);
                fill(255);
                    //this nested for loop creates a pattern of polka dots that repeat horizontally and vertically, and lines that repeat horizontally
                    for(var b=Penguin_x-16;b<Penguin_x+20;b+=7)
                    {
                        for(var a=Penguin_y-44;a<Penguin_y-37;a+=4)
                        {
                            ellipse(b,a,2,2);
                            line(b-3,Penguin_y-38,b-3,Penguin_y-45);    
                        }
                    }

                //HANGING PORTION OF SCARF
                stroke(0);
                fill(217,0,82);
                    quad(Penguin_x-10,Penguin_y-51,Penguin_x,Penguin_y-49,
                         Penguin_x-12,Penguin_y-30,Penguin_x-20,Penguin_y-35);

                //PATTERN ON HANGING PORTION OF SCARF
               fill(255);
               stroke(255);
                    line(Penguin_x-3,Penguin_y-47,Penguin_x-9,Penguin_y-49);
                    line(Penguin_x-7,Penguin_y-42,Penguin_x-13,Penguin_y-44);
                    ellipse(Penguin_x-7,Penguin_y-46,2,2);
                    ellipse(Penguin_x-12,Penguin_y-40,2,2);

                //SCARF TASSLES
                fill(217,0,82);
                stroke(0);
                    arc(Penguin_x-14,Penguin_y-31,2,8,0,PI+PI/3);
                    arc(Penguin_x-18,Penguin_y-33,2,8,0,PI+PI/3);

                //GLASSES
                fill(26,2,119);
                    arc(Penguin_x+16,Penguin_y-55,13,17,0,PI,CHORD);

                //REFLECTION ON GLASSES
                fill(255,150);
                noStroke();
                    quad(Penguin_x+19,Penguin_y-55,Penguin_x+16,Penguin_y-55,
                         Penguin_x+19,Penguin_y-48,Penguin_x+23,Penguin_y-50);
                    quad(Penguin_x+15,Penguin_y-55,Penguin_x+13,Penguin_y-55,
                         Penguin_x+17,Penguin_y-45,Penguin_x+19,Penguin_y-45);

                //ARMS
                fill(0);//black outline
                    arc(Penguin_x-10,Penguin_y-32,  20,10.5,PI,PI+PI/2+PI/3);
                    arc(Penguin_x+14,Penguin_y-32,  20,10.5,TWO_PI-PI/2-PI/3,TWO_PI);

                fill(255);//white center
                arc(Penguin_x-8,Penguin_y-33,  18,5,PI,PI+PI/2+PI/3);
                arc(Penguin_x+12,Penguin_y-33,  18,5,TWO_PI-PI/2-PI/3,TWO_PI);

                 //FOOT
                fill(255,128,0);
                stroke(0); 
                    arc(Penguin_x+15,Penguin_y-11,14,14,PI/15,PI-PI/15);

                //TOES
                fill(192,192,192);
                    arc(Penguin_x+20,Penguin_y-11,5,4,PI/9,PI);
                    arc(Penguin_x+15,Penguin_y-11,5,4,0,PI);
                    arc(Penguin_x+10,Penguin_y-11,5,4,0,PI-PI/9);

                //LEGS
                strokeWeight(2);
                stroke(0);
                    line(Penguin_x,Penguin_y-10,Penguin_x+10,Penguin_y-15);
                    line(Penguin_x+10,Penguin_y-15,Penguin_x+15,Penguin_y-10);

                strokeWeight(1);
                stroke(255,128,0);
                    line(Penguin_x,Penguin_y-10,Penguin_x+5,Penguin_y-13);
                    line(Penguin_x+10,Penguin_y-15,Penguin_x+15,Penguin_y-10);
                noStroke();
            }
            else if(isLeft)
            {
                //FOOT
                fill(255,128,0);
                stroke(0); 
                    arc(Penguin_x-15,Penguin_y-1,14,14,PI+PI/15,TWO_PI-PI/15);

                //TOES
                fill(192,192,192);
                arc(Penguin_x-15,Penguin_y-1,5,4,PI,TWO_PI);
                arc(Penguin_x-20,Penguin_y-1,5,4,PI+PI/9,TWO_PI);
                arc(Penguin_x-10,Penguin_y-1,5,4,PI,TWO_PI-PI/9);

                //BLACK STRUCTURE
                fill(0);
                    ellipse(Penguin_x-8,Penguin_y-47,25,25);// head
                    ellipse(Penguin_x-17,Penguin_y-31,10,45);// left side
                    ellipse(Penguin_x-3,Penguin_y-31,23,47);// right side
                    ellipse(Penguin_x-9,Penguin_y-13,22,15);// bottom

                //FOOT
                fill(255,128,0);
                stroke(0);
                    arc(Penguin_x+1,Penguin_y,14,14,PI+PI/15,TWO_PI-PI/15);

                //TOES
                fill(192,192,192);
                    arc(Penguin_x+1,Penguin_y-1,5,4,PI,TWO_PI);
                    arc(Penguin_x-4,Penguin_y-1,5,4,PI+PI/9,TWO_PI);
                    arc(Penguin_x+6,Penguin_y-1,5,4,PI,TWO_PI-PI/9);

                //FEATHERS ON TOP OF HEAD
                fill(0);
                noStroke();
                    arc(Penguin_x-11,Penguin_y-60,6,12,PI+HALF_PI,TWO_PI,CHORD);
                    arc(Penguin_x-8,Penguin_y-66,6,12,HALF_PI,PI,CHORD);
                    arc(Penguin_x+-4.5,Penguin_y-60,6,12,PI,PI+HALF_PI,CHORD);
                    arc(Penguin_x+-7.5,Penguin_y-66,6,12,0,HALF_PI,CHORD);

                //SHADOW ON PEGUIN
                noStroke();
                fill(0,50);
                    ellipse(Penguin_x-18,Penguin_y-32,10,40);

                fill(255);
                    ellipse(Penguin_x-19,Penguin_y-32,6,37);

               //HORIZONTAL PORTION OF SCARF
                fill(0);
                    arc(Penguin_x-6,Penguin_y-32,35,10,0,PI,CHORD);
                    rect(Penguin_x-24,Penguin_y-42,35,10);

                fill(217,0,82);
                    arc(Penguin_x-5,Penguin_y-32,30,8,0,PI,CHORD);
                    rect(Penguin_x-23,Penguin_y-42,33,10);

                fill(0);
                    arc(Penguin_x-5,Penguin_y-42,31,8,0,PI,CHORD);

                fill(255);
                    quad(Penguin_x-14.5,Penguin_y-43,Penguin_x-21.5,Penguin_y-43,
                         Penguin_x-22,Penguin_y-41,Penguin_x-14.5,Penguin_y-40);

                fill(0,50);
                     quad(Penguin_x-14,Penguin_y-43,Penguin_x-13,Penguin_y-39,
                          Penguin_x-16,Penguin_y-40,Penguin_x-16.5,Penguin_y-43);

                //PATTERN ON HORIZONTAL PORTION OF SCARF
                stroke(255);
                fill(255);
                    //this nested for loop creates a pattern of polka dots that repeat horizontally and vertically, and lines that repeat horizontally
                    for(var b=Penguin_x-19;b<Penguin_x+20;b+=7)
                    {
                        for(var a=Penguin_y-36;a<Penguin_y-29;a+=4)
                        {
                            ellipse(b,a,2,2);
                            line(b-3,Penguin_y-30,b-3,Penguin_y-37);    
                        }
                    }

                //HANGING PORTION OF SCARF
                stroke(0);
                fill(217,0,82);
                    quad(Penguin_x-4,Penguin_y-41,Penguin_x+6,Penguin_y-43,
                         Penguin_x+20,Penguin_y-27,Penguin_x+12,Penguin_y-22);

                //PATTERN ON HANGING PORTION OF SCARF
                fill(255);
                stroke(255);
                    line(Penguin_x,Penguin_y-39,Penguin_x+6,Penguin_y-41);
                    line(Penguin_x+4,Penguin_y-34,Penguin_x+10,Penguin_y-36);
                    ellipse(Penguin_x+5,Penguin_y-38,2,2);
                    ellipse(Penguin_x+10,Penguin_y-32,2,2);

                fill(217,0,82);
                stroke(0);
                    arc(Penguin_x+14,Penguin_y-22,2,8,TWO_PI-PI/3,PI);
                    arc(Penguin_x+18,Penguin_y-25,2,8,TWO_PI-PI/3,PI);

                //GLASSES
                fill(26,2,119);
                    arc(Penguin_x-16,Penguin_y-47,13,17,0,PI,CHORD);

                //REFLECTION ON GLASSES
                fill(255,150);
                noStroke();
                    quad(Penguin_x-19,Penguin_y-47,Penguin_x-16,Penguin_y-47,
                         Penguin_x-19,Penguin_y-40,Penguin_x-23,Penguin_y-42);
                    quad(Penguin_x-15,Penguin_y-47,Penguin_x-13,Penguin_y-47,
                         Penguin_x-17,Penguin_y-37,Penguin_x-19,Penguin_y-37);

            }
            else if(isRight)
            { 
                //FOOT
                fill(255,128,0);
                stroke(0); 
                    arc(Penguin_x+16,Penguin_y-1,14,14,PI+PI/15,TWO_PI-PI/15);

                //TOES
                fill(192,192,192);
                    arc(Penguin_x+16,Penguin_y-1,5,4,PI,TWO_PI);
                    arc(Penguin_x+21,Penguin_y-1,5,4,PI+PI/9,TWO_PI);
                    arc(Penguin_x+11,Penguin_y-1,5,4,PI,TWO_PI-PI/9);

                //BLACK STRUCTURE
                fill(0);
                    ellipse(Penguin_x+8,Penguin_y-47,25,25);
                    ellipse(Penguin_x+17,Penguin_y-31,10,45);
                    ellipse(Penguin_x+3,Penguin_y-31,23,47);
                    ellipse(Penguin_x+9,Penguin_y-13,22,15);

                //FOOT
                fill(255,128,0);
                stroke(0);
                    arc(Penguin_x,Penguin_y-1,14,14,PI+PI/15,TWO_PI-PI/15);

                //TOES
                fill(192,192,192);
                    arc(Penguin_x,Penguin_y-1,5,4,PI,TWO_PI);
                    arc(Penguin_x-5,Penguin_y-1,5,4,PI+PI/9,TWO_PI);
                    arc(Penguin_x+5,Penguin_y-1,5,4,PI,TWO_PI-PI/9);

                //FEATHERS ON TOP OF HEAD
                fill(0);
                noStroke();
                    arc(Penguin_x+5,Penguin_y-60,6,12,PI+HALF_PI,TWO_PI,CHORD);
                    arc(Penguin_x+8,Penguin_y-66,6,12,HALF_PI,PI,CHORD);
                    arc(Penguin_x+11.5,Penguin_y-60,6,12,PI,PI+HALF_PI,CHORD);
                    arc(Penguin_x+8.5,Penguin_y-66,6,12,0,HALF_PI,CHORD);

                //WHITE MIDDLE
                fill(255);
                stroke(0);
                    ellipse(Penguin_x+18,Penguin_y-32,10,40);

                //SHADOW ON PENGUIN
                noStroke();
                fill(0,50);
                    ellipse(Penguin_x+18,Penguin_y-32,10,40);
                
                fill(255);
                    ellipse(Penguin_x+19,Penguin_y-32,6,37);

               //HORIZONTAL PORTION OF SCARF
                fill(0);
                    arc(Penguin_x+6.5,Penguin_y-32,35,10,0,PI,CHORD);
                    rect(Penguin_x-12,Penguin_y-42,35,10);

                fill(217,0,82);
                    arc(Penguin_x+7,Penguin_y-32,30,8,0,PI,CHORD);
                    rect(Penguin_x-11,Penguin_y-42,33,10);

                fill(0);
                    arc(Penguin_x+7,Penguin_y-42,31,8,0,PI,CHORD);

                fill(255);
                    quad(Penguin_x+14.5,Penguin_y-43,Penguin_x+21.5,Penguin_y-43,
                         Penguin_x+22,Penguin_y-41,Penguin_x+14.5,Penguin_y-40);
                
                fill(0,50);
                    quad(Penguin_x+14,Penguin_y-43,Penguin_x+13,Penguin_y-39,
                         Penguin_x+16,Penguin_y-40,Penguin_x+16.5,Penguin_y-43);

                //LOOP FOR PATTERN ON HORIZONTAL PORTION OF SCARF
                stroke(255);
                fill(255);
                    //this nested for loop creates a pattern of polka dots that repeat horizontally and vertically, and lines that repeat horizontally
                    for(var b=Penguin_x-16;b<Penguin_x+20;b+=7)
                    {
                        for(var a=Penguin_y-44+8;a<Penguin_y-37+8;a+=4)
                        {
                            ellipse(b,a,2,2);
                            line(b-3,Penguin_y-30,b-3,Penguin_y-37);    
                        }
                    }

                //HANGING PORTION OF SCARF
                stroke(0);
                fill(217,0,82);
                    quad(Penguin_x-10,Penguin_y-43,Penguin_x,Penguin_y-41,
                         Penguin_x-12,Penguin_y-22,Penguin_x-20,Penguin_y-27);

                //PATTERN ON HANGING PORTION OF SCARF
               fill(255);
               stroke(255);
                    line(Penguin_x-3,Penguin_y-47+8,Penguin_x-9,Penguin_y-41);
                    line(Penguin_x-7,Penguin_y-34,Penguin_x-13,Penguin_y-36);
                    ellipse(Penguin_x-7,Penguin_y-38,2,2);
                    ellipse(Penguin_x-12,Penguin_y-32,2,2);

                //SCARF TASSLES
                fill(217,0,82);
                stroke(0);
                    arc(Penguin_x-14,Penguin_y-23,2,8,0,PI+PI/3);
                    arc(Penguin_x-18,Penguin_y-25,2,8,0,PI+PI/3);

                //GLASSES
                fill(26,2,119);
                    arc(Penguin_x+16,Penguin_y-47,13,17,0,PI,CHORD);

                //REFLECTION ON GLASSES
                fill(255,150);
                noStroke();
                    quad(Penguin_x+19,Penguin_y-47,Penguin_x+16,Penguin_y-47,
                         Penguin_x+19,Penguin_y-40,Penguin_x+23,Penguin_y-42);
                    quad(Penguin_x+15,Penguin_y-47,Penguin_x+13,Penguin_y-47,
                         Penguin_x+17,Penguin_y-37,Penguin_x+19,Penguin_y-37);
                
                }
            else if(isFalling || isPlummeting)
            {
                //SHADOW BENEATH PENGUIN
                fill(0,50);
                    ellipse(Penguin_x,Penguin_y-9,40,10);

                //BLACK STRUCTURE
                fill(0);
                    ellipse(Penguin_x,Penguin_y-55,30,25);//head
                    ellipse(Penguin_x-12,Penguin_y-39,8,40);//left side
                    ellipse(Penguin_x+12,Penguin_y-39,8,40);//right side
                    ellipse(Penguin_x,Penguin_y-21,27,10);//bottom

                //FEATHER
                noStroke();
                    arc(Penguin_x-3,Penguin_y-68,6,12,PI+HALF_PI,TWO_PI,CHORD);
                    arc(Penguin_x,Penguin_y-74,6,12,HALF_PI,PI,CHORD);
                    arc(Penguin_x+3.5,Penguin_y-68,6,12,PI,PI+HALF_PI,CHORD);
                    arc(Penguin_x+0.5,Penguin_y-74,6,12,0,HALF_PI,CHORD);

                //WHITE MIDDLE
                fill(255);
                ellipse(Penguin_x-6,Penguin_y-40,17,40);//left side
                ellipse(Penguin_x+6,Penguin_y-40,17,40);//right side
                ellipse(Penguin_x,Penguin_y-24,22,10);//bottom

                //SHADOWS ON PENGUIN
                fill(0,50);
                    ellipse(Penguin_x+5,Penguin_y-34,7,20);
                    ellipse(Penguin_x+12,Penguin_y-30,12,20);
                    ellipse(Penguin_x-8,Penguin_y-40,15,42);

                fill(255);
                    ellipse(Penguin_x-5,Penguin_y-39,10,39);

                 fill(0,50);
                    ellipse(Penguin_x,Penguin_y-37,40,10);
                    rect(Penguin_x-3,Penguin_y-54,5,3);

               //ARMS
                fill(0);//black outline
                    arc(Penguin_x-14,Penguin_y-32,20,10.5,PI,PI+PI/2+PI/3);
                    arc(Penguin_x+14,Penguin_y-32,20,10.5,TWO_PI-PI/2-PI/3,TWO_PI);

                fill(255);//white center
                arc(Penguin_x-12,Penguin_y-33,18,5,PI,PI+PI/2+PI/3);
                  arc(Penguin_x+12,Penguin_y-33,18,5,TWO_PI-PI/2-PI/3,TWO_PI);

               //HORIZONTAL PORTION OF SCARF
                fill(0);
                    arc(Penguin_x,Penguin_y-40,35,10,0,PI,CHORD);
                    rect(Penguin_x-18,Penguin_y-50,35,10);

                fill(217,0,82);
                    arc(Penguin_x,Penguin_y-40,33,8,0,PI,CHORD);
                    rect(Penguin_x-17,Penguin_y-50,33,10);

                fill(0);
                    arc(Penguin_x,Penguin_y-50,35,9,0,PI,CHORD);

                fill(255);
                    arc(Penguin_x,Penguin_y-51,33,8,0,PI,CHORD);

                fill(0);
                quad(Penguin_x-13,Penguin_y-51,Penguin_x-16,Penguin_y-51,
                     Penguin_x-16,Penguin_y-49,Penguin_x-14,Penguin_y-48);
                quad(Penguin_x+13,Penguin_y-51,Penguin_x+16,Penguin_y-51,
                     Penguin_x+16,Penguin_y-49,Penguin_x+14,Penguin_y-48);

            //PATTERN ON HORIZONTAL PORTION OF SCARF
                stroke(255);
                fill(255);
                    //this nested for loop creates a pattern of polka dots that repeat horizontally and vertically, whereas the lines repeat horizontally.
                    for(var b=Penguin_x-16;b<Penguin_x+20;b+=7)
                    {
                        for(var a=Penguin_y-44;a<Penguin_y-37;a+=4)
                        {
                            ellipse(b,a,2,2);
                            line(b-4,Penguin_y-38,b-4,Penguin_y-45);    
                        }
                    }

                //VERTICAL PORTION OF SCARF
                noStroke();
                fill(0);
                    ellipse(Penguin_x+5,Penguin_y-37,7,18);

                fill(217,0,82);
                    ellipse(Penguin_x+5,Penguin_y-37,6,17);

                fill(0); 
                    ellipse(Penguin_x+12,Penguin_y-37,7,25);
                    ellipse(Penguin_x+8,Penguin_y-37,7,25);
                    rect(Penguin_x+8,Penguin_y-27.5,5,3);

               fill(217,0,82);
                    ellipse(Penguin_x+12,Penguin_y-37,6,23);
                    ellipse(Penguin_x+8,Penguin_y-37,6,23);
                    rect(Penguin_x+8,Penguin_y-29,3.5,4);
                
                //TASSLES ON SCARF
                stroke(0);
                strokeWeight(0.5);
                    arc(Penguin_x+9,Penguin_y-24.5,2,7,0,PI);
                    arc(Penguin_x+12,Penguin_y-24.5,2,7,0,PI);
                    arc(Penguin_x+5,Penguin_y-28,2,7,0,PI);

                //LOOP FOR PATTERN ON VERTICAL PORTION OF SCARF
                fill(255);
                stroke(255);
                strokeWeight(1);
                    //this nested for loop creates a pattern of polka dots that repeat horizontally and vertically, and lines that repeat vertically
                    for(var b=Penguin_x+7;b<Penguin_x+15;b+=3)
                    {
                        for(var a=Penguin_y-44;a<Penguin_y-28;a+=5)
                        {
                            //pattern on end of scarf hanging in front
                            ellipse(b,a+1,1,1);
                            line(Penguin_x+6,a-1,Penguin_x+13,a-1); 
                            
                            //pattern on end of scarf hanging behind
                            ellipse(Penguin_x+3,a+1,0.5,0.5);
                            line(Penguin_x+3,a+3,Penguin_x+4,a+3);
                        }
                    }

                //GLASSES
                stroke(0);
                fill(0);
                    //handles
                    arc(Penguin_x+8,Penguin_y-52,27,2,PI+HALF_PI,HALF_PI);
                    arc(Penguin_x-8,Penguin_y-52,27,2,HALF_PI,PI+HALF_PI);
                
                    //center
                    line(Penguin_x-1,Penguin_y-54,Penguin_x+1,Penguin_y-54);

                fill(26,2,119);
                    arc(Penguin_x+8,Penguin_y-55,13,17,0,PI,CHORD);//right glass
                    arc(Penguin_x-8,Penguin_y-55,13,17,0,PI,CHORD);//left glass

                //REFLECTION ON GLASSES
                fill(255,150);
                noStroke();
                    quad(Penguin_x+7,Penguin_y-55,Penguin_x+9,Penguin_y-55,
                         Penguin_x+6,Penguin_y-45,Penguin_x+4,Penguin_y-49);
                    quad(Penguin_x+10,Penguin_y-55,Penguin_x+13,Penguin_y-55,
                         Penguin_x+10,Penguin_y-45,Penguin_x+7,Penguin_y-45);
                    quad(Penguin_x-11,Penguin_y-55,Penguin_x-8,Penguin_y-55,
                         Penguin_x-11,Penguin_y-48,Penguin_x-14,Penguin_y-50);
                    quad(Penguin_x-7,Penguin_y-55,Penguin_x-5,Penguin_y-55,
                         Penguin_x-9,Penguin_y-45,Penguin_x-11,Penguin_y-45);

                //FEET
                fill(255,128,0);
                stroke(0); 
                    arc(Penguin_x-13,Penguin_y-18,14,14,PI/15,PI-PI/15);
                    arc(Penguin_x+13,Penguin_y-18,14,14,PI/15,PI-PI/15);

                //TOES
                fill(0);
                    arc(Penguin_x-13,Penguin_y-18,5,4,0,PI);
                    arc(Penguin_x-8,Penguin_y-18,5,4,PI/9,PI);

                fill(255);
                    arc(Penguin_x-18,Penguin_y-18,5,4,0,PI-PI/9);
                    arc(Penguin_x+18,Penguin_y-18,5,4,0,PI-PI/9);

               fill(0);
                    arc(Penguin_x+13,Penguin_y-18,5,4,0,PI);
                    arc(Penguin_x-8,Penguin_y-18,5,4,PI/9,PI);
                noStroke();
                }
            else
            {
                //FEET
                fill(255,128,0);
                stroke(0); 
                    arc(Penguin_x-9,Penguin_y-1,14,14,PI+PI/15,TWO_PI-PI/15);
                    arc(Penguin_x+9,Penguin_y-1,14,14,PI+PI/15,TWO_PI-PI/15);

                //TOES
                fill(192,192,192);
                
                    arc(Penguin_x-9,Penguin_y-1,5,4,PI,TWO_PI);
                    arc(Penguin_x-14,Penguin_y-1,5,4,PI+PI/9,TWO_PI);
                    arc(Penguin_x-4,Penguin_y-1,5,4,PI,TWO_PI-PI/9);
                
                    arc(Penguin_x+9,Penguin_y-1,5,4,PI,TWO_PI);
                    arc(Penguin_x+4,Penguin_y-1,5,4,PI+PI/9,TWO_PI);
                    arc(Penguin_x+14,Penguin_y-1,5,4,PI,TWO_PI-PI/9);

                //BLACK STRUCTURE
                fill(0);
                    ellipse(Penguin_x,Penguin_y-47,35,25);//head
                    ellipse(Penguin_x-14,Penguin_y-31,10,45);//left side
                    ellipse(Penguin_x+14,Penguin_y-31,10,45);//right side
                    ellipse(Penguin_x,Penguin_y-10,31,10);//bottom

                //FEATHERS ON TOP OF HEAD
                noStroke();
                    arc(Penguin_x-3,Penguin_y-60,6,12,PI+HALF_PI,TWO_PI,CHORD);
                    arc(Penguin_x,Penguin_y-66,6,12,HALF_PI,PI,CHORD);
                    arc(Penguin_x+3.5,Penguin_y-60,6,12,PI,PI+HALF_PI,CHORD);
                    arc(Penguin_x+0.5,Penguin_y-66,6,12,0,HALF_PI,CHORD);

                //WHITE MIDDLE
                fill(255);
                    ellipse(Penguin_x-7,Penguin_y-32,22,42);//left side
                    ellipse(Penguin_x+7,Penguin_y-32,22,42);//right side
                    ellipse(Penguin_x,Penguin_y-14,22,10);//bottom

                //SHADOWS ON PENGUIN
                fill(0,50);
                    ellipse(Penguin_x+5,Penguin_y-26,7,20);
                    ellipse(Penguin_x+12,Penguin_y-22,12,20);
                    ellipse(Penguin_x-10,Penguin_y-32,15,50);
                
                fill(255);
                    ellipse(Penguin_x-5,Penguin_y-31,15,42);
                
                fill(0,50);
                    ellipse(Penguin_x,Penguin_y-29,40,10);
                    rect(Penguin_x-3,Penguin_y-46,5,3);

              //HORIZONTAL SECTION OF SCARF
                fill(0);
                    arc(Penguin_x,Penguin_y-32,42,10,0,PI,CHORD);
                    rect(Penguin_x-21,Penguin_y-42,42,10);

                fill(217,0,82);
                    arc(Penguin_x,Penguin_y-32,40,8,0,PI,CHORD);
                    rect(Penguin_x-20,Penguin_y-42,40,10);

                fill(0);
                    arc(Penguin_x,Penguin_y-42,42,9,0,PI,CHORD);

                fill(255);
                    arc(Penguin_x,Penguin_y-43,40,8,0,PI,CHORD);

                fill(0);
                    quad(Penguin_x+15,Penguin_y-43,Penguin_x+18,Penguin_y-43,
                         Penguin_x+18,Penguin_y-41,Penguin_x+16,Penguin_y-40);
                    quad(Penguin_x-15,Penguin_y-43,Penguin_x-18,Penguin_y-43,
                         Penguin_x-18,Penguin_y-41,Penguin_x-16,Penguin_y-40);

                //PATTERN ON HORIZONTAL SECTION OF SCARF
                stroke(255);
                fill(255);
                    //this nested for loop creates a pattern of polka dots that repeat horizontally and vertically, and lines repeat horizontally
                    for(var b=Penguin_x-16;b<Penguin_x+20;b+=7)
                    {
                        for(var a=Penguin_y-36;a<Penguin_y-29;a+=4)
                        {
                            ellipse(b,a,2,2);
                            line(b-3,Penguin_y-30,b-3,Penguin_y-37);    
                        }
                    }

                //VERTICAL SECTION OF SCARF
                noStroke();
                fill(0);
                    ellipse(Penguin_x+7,Penguin_y-29,7,18);

                fill(217,0,82);
                    ellipse(Penguin_x+7,Penguin_y-29,6,17);

                fill(0); 
                    ellipse(Penguin_x+14,Penguin_y-29,7,25);
                    ellipse(Penguin_x+10,Penguin_y-29,7,25);
                    rect(Penguin_x+10,Penguin_y-19.5,5,3);

                fill(217,0,82);
                    ellipse(Penguin_x+14,Penguin_y-29,6,23);
                    ellipse(Penguin_x+10,Penguin_y-29,6,23);
                    rect(Penguin_x+10,Penguin_y-21,3.5,4);

                stroke(0);
                strokeWeight(0.5);
                    arc(Penguin_x+11,Penguin_y-16.5,2,7,0,PI);
                    arc(Penguin_x+14,Penguin_y-16.5,2,7,0,PI);
                    arc(Penguin_x+7,Penguin_y-20,2,7,0,PI);

               //PATTERN ON VERTICAL SECTION OF SCARF
                fill(255);
                stroke(255);
                strokeWeight(1);
                    //this nested for loop creates a pattern of polka dots that repeat horizontally and vertically, and the lines repeat vertically
                    for(var b=Penguin_x+9;b<Penguin_x+17;b+=3)
                    {
                        for(var a=Penguin_y-36;a<Penguin_y-20;a+=5)
                        {
                            //pattern on end of scarf hanging in front
                            ellipse(b,a+1,1,1);
                            
                            line(Penguin_x+8,a-1,Penguin_x+15,a-1); 
                            
                            //pattern on end of scarf hanging behind
                            ellipse(Penguin_x+6,a+1,0.5,0.5);
                            
                            line(Penguin_x+5,a+3,Penguin_x+6,a+3);
                        }
                    }

                //GLASSES
                stroke(0);
                fill(0);
                    //handles
                    arc(Penguin_x+8,Penguin_y-44,27,2,PI+HALF_PI,HALF_PI);
                    arc(Penguin_x-8,Penguin_y-44,27,2,HALF_PI,PI+HALF_PI);
                    //center
                    line(Penguin_x-2,Penguin_y-45,Penguin_x+1,Penguin_y-45);

                fill(26,2,119);
                    arc(Penguin_x+8,Penguin_y-47,13,17,0,PI,CHORD);//left glass
                    arc(Penguin_x-8,Penguin_y-47,13,17,0,PI,CHORD);//right glass

                //REFLECTION ON GLASSES
                fill(255,150);
                noStroke();
                    quad(Penguin_x+7,Penguin_y-47,Penguin_x+9,Penguin_y-47,Penguin_x+6,Penguin_y-37,Penguin_x+4,Penguin_y-41);
                
                    quad(Penguin_x+10,Penguin_y-47,Penguin_x+13,Penguin_y-47,Penguin_x+10,Penguin_y-37,Penguin_x+7,Penguin_y-37);
                
                    quad(Penguin_x-11,Penguin_y-47,Penguin_x-8,Penguin_y-47,Penguin_x-11,Penguin_y-37,Penguin_x-14,Penguin_y-42);
                
                    quad(Penguin_x-7,Penguin_y-47,Penguin_x-5,Penguin_y-47,Penguin_x-9,Penguin_y-37,Penguin_x-11,Penguin_y-37);

                //ARMS
                fill(0);
                    arc(Penguin_x-18,Penguin_y-15,10.5,30,PI-PI/3,HALF_PI+PI);
                    arc(Penguin_x+18,Penguin_y-15,10.5,30,HALF_PI+PI,TWO_PI+PI/3);
                noStroke();

	}
}

function checkCharacterInteraction()
{
    if(Penguin_y < floorPos_y )
    {
        var isContact = false;

        //loop to traverse platforms array and check contact with each platform
        for (var i=0; i<platforms.length; i++)
        {
            if(platforms[i].checkContact(Penguin_x,Penguin_y)==true)
            {
                isContact = true;
                isFalling = false;

                break;
            }
        }

        if (isContact == false)
        {
            isFalling = true;
            Penguin_y+=2;

            //this conditional statement plays the landing sound effect if the character lands on the ground.
            if (Penguin_y == floorPos_y)
            {
                landingSound.play();
            }           
        }

        //LOOP TO PLAY THE LANDING SOUND ON A PLATFORM
         for (var i=0;i<platforms.length;i++)
            {
            if (isContact == false)
                {
                    //this conditional statement plays the landing sound if the character makes contact with a platform
                    if (platforms[i].checkContact(Penguin_x,Penguin_y)==true)
                    {
                        landingSound.play();
                        isContact = true;//setting the isContact variable to true after the landing sound is played ensures that the landing sound is not replayed continuously while the character is on the platform
                    }
                }
            }
    }
    
    else 
    {
        isFalling=false;
    }

    if(isLeft)
	{

        Penguin_x -= 3;
	}

	if(isRight)
	{
        Penguin_x += 3;
    }
        
    if (isPlummeting == true)
    {
        Penguin_y+=4;
        isRight = false;//the character cannot move sideways in the canyon
        isLeft = false;
    }
}

function renderFlagpole()
{ 
    //rendering a pixellated golden gradient at the larger circular base of the flagpole
    noStroke();
    fill(160,137,27);
        rect(flagpole.x_pos-15,floorPos_y-11,30,12.5);
    fill(201,171,33);
        rect(flagpole.x_pos-10,floorPos_y-9,20,11.5);
    fill(219,187,38);
        rect(flagpole.x_pos-5,floorPos_y-9,10,12);
    fill(222,193,58);
        rect(flagpole.x_pos-3,floorPos_y-9,6,12.5);
    fill(227,204,91);
        rect(flagpole.x_pos-2,floorPos_y-9,4,13);
    fill(233,215,126);
        rect(flagpole.x_pos-1,floorPos_y-9,2,13);
    
    //black outline of larger circular base
    strokeWeight(2);
    stroke(0);
    noFill();
        arc(flagpole.x_pos,floorPos_y-1,30,10,0,PI);
        line(flagpole.x_pos-15,floorPos_y-11,flagpole.x_pos-15,floorPos_y-1);
        line(flagpole.x_pos+15,floorPos_y-11,flagpole.x_pos+15,floorPos_y-1);
    
    fill(160,137,27);
        ellipse(flagpole.x_pos,floorPos_y-13,30,10);
    
    //rendering a pixellated golden gradient at the smaller circular base of the flagpole
    noStroke();
    fill(160,137,27);
        rect(flagpole.x_pos-10,floorPos_y-22,20,11.5);   
    fill(201,171,33);
        rect(flagpole.x_pos-7,floorPos_y-22,14,10.5);
    fill(219,187,38);
        rect(flagpole.x_pos-5,floorPos_y-22,10,11);
    fill(222,193,58);
        rect(flagpole.x_pos-3,floorPos_y-22,6,11);
    fill(227,204,91);
        rect(flagpole.x_pos-2,floorPos_y-22,4,11);
    fill(233,215,126);
        rect(flagpole.x_pos-0.5,floorPos_y-22,1,11);
    
    //black outline of the smaller circular base
    stroke(0);
    noFill();
        arc(flagpole.x_pos,floorPos_y-15,20,6,0,PI);
        line(flagpole.x_pos-10,floorPos_y-24,flagpole.x_pos-10,floorPos_y-16);
        line(flagpole.x_pos+10,floorPos_y-24,flagpole.x_pos+10,floorPos_y-16);
    
    fill(160,137,27);
        ellipse(flagpole.x_pos,floorPos_y-25,20,6);
    
    //black outline of the pole
    noFill();
        arc(flagpole.x_pos,floorPos_y-27,10,3,0,PI);
        line(flagpole.x_pos-4,floorPos_y-127,flagpole.x_pos-4,floorPos_y-27);
        line(flagpole.x_pos+4,floorPos_y-127,flagpole.x_pos-4+8,floorPos_y-27);
    
    //pixellated golden gradient of the pole
    noStroke();
    fill(160,137,27);
        rect(flagpole.x_pos-3,floorPos_y-127,6,100); 
    fill(201,171,33);
        rect(flagpole.x_pos-2.5,floorPos_y-127,5,100.5); 
    fill(219,187,38);
        rect(flagpole.x_pos-2,floorPos_y-127,4,100.5);
    fill(222,193,58);
        rect(flagpole.x_pos-1.5,floorPos_y-127,3,100.8);
    fill(227,204,91);
        rect(flagpole.x_pos-1,floorPos_y-127,2,100.8);
    fill(233,215,126);
        rect(flagpole.x_pos-0.5,floorPos_y-127,1,101);
    
    //pixellated gradient of the golden sphere on top of the pole
    stroke(0);
    fill(160,137,27);
        ellipse(flagpole.x_pos,floorPos_y-130,10,10);
    noStroke();
    fill(201,171,33);
        ellipse(flagpole.x_pos,floorPos_y-130,6,6);
    fill(222,193,58);
        ellipse(flagpole.x_pos,floorPos_y-130,4,4);
    fill(233,215,126);
        ellipse(flagpole.x_pos,floorPos_y-130,2,2);

    //rendering a cyan flag if the flagpole has been reached
    if(flagpole.isReached==true)
    { 
        fill(0,255,255);
        stroke(0);
            rect(flagpole.x_pos+39.5,floorPos_y-102,30,40);
            rect(flagpole.x_pos+4.5,floorPos_y-112,50,40);
        
        noStroke();//shadows on flag
        fill(0,196,196);
             triangle(flagpole.x_pos+39.5,floorPos_y-63,
                      flagpole.x_pos+60.5,floorPos_y-71,
                      flagpole.x_pos+39.5,floorPos_y-72);
        
        stroke(0);
        fill(0,153,153);//folded portion of flag
            triangle(flagpole.x_pos+39.5,floorPos_y-63,
                     flagpole.x_pos+52.5,floorPos_y-71,
                     flagpole.x_pos+39.5,floorPos_y-72);

        fill(0,255,255);//triangular edges of flag
            triangle(flagpole.x_pos+69.5,floorPos_y-102,
                     flagpole.x_pos+89.5,floorPos_y-102,
                     flagpole.x_pos+69.5,floorPos_y-82);

            triangle(flagpole.x_pos+69.5,floorPos_y-62,
                     flagpole.x_pos+89.5,floorPos_y-62,
                     flagpole.x_pos+69.5,floorPos_y-82);

        noStroke();
             rect(flagpole.x_pos+68.5,floorPos_y-101,2,38);
        
        fill(0,196,196);//shadows on flag
            rect(flagpole.x_pos+55.5,floorPos_y-101,5,30);
            rect(flagpole.x_pos+5,floorPos_y-111,5,38);
        strokeWeight(1);
    }
    
    //rendering purple flag if the flagpole has not been reached
    else 
    {
        fill(255,0,255);
        stroke(0);
            rect(flagpole.x_pos+39.5,floorPos_y-102,30,40);
            rect(flagpole.x_pos+4.5,floorPos_y-112,50,40);

        noStroke();
        fill(196,0,196);//shadows on flag
            triangle(flagpole.x_pos+39.5,floorPos_y-63,flagpole.x_pos+60.5,floorPos_y-71,flagpole.x_pos+39.5,floorPos_y-72);

        stroke(0);
        fill(153,0,153);//folded portion of flag
            triangle(flagpole.x_pos+39.5,floorPos_y-63,
                     flagpole.x_pos+52.5,floorPos_y-71,
                     flagpole.x_pos+39.5,floorPos_y-72);

        fill(255,0,255);//triangular edges of flag
            triangle(flagpole.x_pos+69.5,floorPos_y-102,
                     flagpole.x_pos+89.5,floorPos_y-102,
                     flagpole.x_pos+69.5,floorPos_y-82);
        
            triangle(flagpole.x_pos+69.5,floorPos_y-62,
                     flagpole.x_pos+89.5,floorPos_y-62,
                     flagpole.x_pos+69.5,floorPos_y-82);
        
        noStroke();
            rect(flagpole.x_pos+68.5,floorPos_y-101,2,38);
        
        fill(196,0,196);//shadows on flag
            rect(flagpole.x_pos+55.5,floorPos_y-101,5,30);
            rect(flagpole.x_pos+5,floorPos_y-111,5,38);
        strokeWeight(1);
    }
}

function checkFlagpole()
{
    var distance = abs(Penguin_x - flagpole.x_pos)
    if (distance <11)
    {
        flagpole.isReached=true;
        levelCompleteSound.play();//sound effect for level complete
    }
}

function checkPlayerDie()
{
    //this conditional statement checks if the penguin has fallen down the canyon
    //checking if lives>0 ensures that further lives are not decremented after the game is over 
    if (Penguin_y>590 && lives>0)
    {
        lives-=1;//decrementing lives by 1
        
        //if there are lives remaining, the startGame() function resets the game
        if(lives > 0)
        {
        startGame();
        }   
    }
    
}

function drawScoreCounter()
{
    ////BASE OF SCORE COUNTER////
    noStroke();   
    fill(255,0,255,50);
    
    //light ellipses around snowflake
    ellipse(40,50,60,60);
    ellipse(40,50,45,45);
    
    //rectangle with circular side
    rect (40,27,100,46);
    arc (140,50,46,46,TWO_PI-PI/2,PI/2);
    
    ////TEXT TO DISPLAY THE SCORE////
    
    //cyan outline of text
    fill(0,255,255);
    textSize(22);
    stroke(0,255,255);
    strokeWeight(2);
        text('score: '+game_score,70,57);
    
    //white center of text
    noStroke();
    fill(255);      
        text('score: '+game_score,70,57);
    
    ////CYAN OUTLINE OF SNOWFLAKE////
    
    //center circle of snowflake
    stroke(0,255,255);
    strokeWeight(3);
    noFill();
        ellipse(40,50,7.5,7.5);
         
        //arrowhead shapes on top branch of snowflake
         beginShape();
            vertex(36.25,32.75);
            vertex(40,35.75);
            vertex(43.75,32.75);
        endShape();

        beginShape();
            vertex(36.25,37.25);
            vertex(40,40.25);
            vertex(43.75,37.25);
        endShape();

        //arrowhead shapes on bottom branch of snowflake
        beginShape();
            vertex(36.25,67.25);
            vertex(40,64.25);
            vertex(43.75,67.25);
        endShape();

        beginShape();
            vertex(36.25,62.75);
            vertex(40,59.75);
            vertex(43.75,62.75);
        endShape();

        //arrowhead shapes on right branch of snowflake
        beginShape();
            vertex(57.25,46.25);
            vertex(54.25,50);
            vertex(57.25,53.75);
        endShape();

        beginShape();
            vertex(52.75,46.25);
            vertex(49.75,50);
            vertex(52.75,53.75);
        endShape();

        //arrowhead shapes on left branch of snowflake
        beginShape();
            vertex(22.75,46.25);
            vertex(25.75,50);
            vertex(22.75,53.75);
        endShape();

        beginShape();
            vertex(27.25,46.25);
            vertex(30.25,50);
            vertex(27.25,53.75);
        endShape();

        //top branch of snowflake
        line(40,31.25,40,46.25);

        //bottom branch of snowflake
        line(40,53.75,40,68.75);

        //left branch of snowflake
        line(21.25,50,36.25,50);

        //right branch of snowflake
        line(43.75,50,58.75,50);

        //tear drop shape at top right of snowflake
        arc (47.5,42.5,6,6, 0, PI+HALF_PI);

        beginShape();
            vertex(48.25,39.5);
            vertex(50.5,39.5);
            vertex(50.5,41.75);
        endShape();

        //tear drop shape at top left of snowflake
        arc(32.5,42.5,6,6,TWO_PI-HALF_PI,PI);

        beginShape();
            vertex(31.75,39.5);
            vertex(29.5,39.5);
            vertex(29.5,41.75);
        endShape();

        //tear drop shape at bottom left of snowflake
        arc(32.5,57.5,6,6,PI,HALF_PI);

        beginShape();
            vertex(29.5,58.25);
            vertex(29.5,60.5);
            vertex(31.75,60.5);
        endShape();
    
        //tear drop shape at bottom right of snowflake
        arc(47.5,57.5,6,6,HALF_PI,TWO_PI);
    
        beginShape();
            vertex(50.5,58.25);
            vertex(50.5,60.5);
            vertex(48.25,60.5);
        endShape();

        //bottom left branch
        line(34.75,55.25,37,53);
    
        //top right branch
        line(43,47,45.25,44.75); 

        //top left branch
        line(34.75,44.75,37,47);
    
        //bottom right branch
        line(43,53,45.25,55.25);

    //////////////////////////WHITE CENTER//////////////////////
    strokeWeight(1.5);
    stroke(255);
    noFill();

         //arrowhead shapes on top branch of snowflake
         beginShape();
            vertex(36.25,32.75);
            vertex(40,35.75);
            vertex(43.75,32.75);
        endShape();

        beginShape();
            vertex(36.25,37.25);
            vertex(40,40.25);
            vertex(43.75,37.25);
        endShape();

        //arrowhead shapes on bottom branch of snowflake
        beginShape();
            vertex(36.25,67.25);
            vertex(40,64.25);
            vertex(43.75,67.25);
        endShape();

        beginShape();
            vertex(36.25,62.75);
            vertex(40,59.75);
            vertex(43.75,62.75);
        endShape();

        //arrowhead shapes on right branch of snowflake
        beginShape();
            vertex(57.25,46.25);
            vertex(54.25,50);
            vertex(57.25,53.75);
        endShape();

        beginShape();
            vertex(52.75,46.25);
            vertex(49.75,50);
            vertex(52.75,53.75);
        endShape();

        //arrowhead shapes on left branch of snowflake
        beginShape();
            vertex(22.75,46.25);
            vertex(25.75,50);
            vertex(22.75,53.75);
        endShape();

        beginShape();
            vertex(27.25,46.25);
            vertex(30.25,50);
            vertex(27.25,53.75);
        endShape();

        //top branch of snowflake
        line(40,31.25,40,46.25);

        //bottom branch of snowflake
        line(40,53.75,40,68.75);

        //left branch of snowflake
        line(21.25,50,36.25,50);

        //right branch of snowflake
        line(43.75,50,58.75,50);

        //tear drop shape at top right of snowflake
        arc (47.5,42.5,6,6, 0, PI+HALF_PI);

        beginShape();
            vertex(48.25,39.5);
            vertex(50.5,39.5);
            vertex(50.5,41.75);
        endShape();

        //tear drop shape at top left of snowflake
        arc(32.5,42.5,6,6,TWO_PI-HALF_PI,PI);

        beginShape();
            vertex(31.75,39.5);
            vertex(29.5,39.5);
            vertex(29.5,41.75);
        endShape();

        //tear drop shape at bottom left of snowflake
        arc(32.5,57.5,6,6,PI,HALF_PI);

        beginShape();
            vertex(29.5,58.25);
            vertex(29.5,60.5);
            vertex(31.75,60.5);
        endShape();
    
        //tear drop shape at bottom right of snowflake
        arc(47.5,57.5,6,6,HALF_PI,TWO_PI);
    
        beginShape();
            vertex(50.5,58.25);
            vertex(50.5,60.5);
            vertex(48.25,60.5);
        endShape();

        //bottom left branch
        line(34.75,55.25,37,53);
    
        //top right branch
        line(43,47,45.25,44.75); 

        //top left branch
        line(34.75,44.75,37,47);
    
        //bottom right branch
        line(43,53,45.25,55.25);
    
    ////CIRCLES AT THE CORNERS OF SNOWFLAKE////
    fill(255);
    stroke(0,255,255);
    strokeWeight(0.75);

        //top right corner
        ellipse(54.25,35.75, 2.25, 2.25);

        //bottom left corner
        ellipse(25.75,64.25, 2.25, 2.25);

        //top left corner
        ellipse(25.75,35.75,2.25, 2.25);

        //bottom right corner
        ellipse(54.25,64.25,2.25, 2.25);

    ////CIRCLE AT THE CENTER OF SNOWFLAKE////
    noFill();
    strokeWeight(1.5);
    stroke(255);
        ellipse(40,50,7.5,7.5);
        noStroke();
}

function drawLives()
{
    //drawing purple rectangle with circular edges around lives
    fill(255,0,255,50);
    
    rect (50,80,100,25);
    arc (150,92.5,25,25,PI+PI/2,PI/2);
    arc (50,92.5,25,25,PI/2,PI+PI/2);
    
    //loop for drawing 3 empty black hearts
    for(var i=0;i<3;i+=1)
    {
        fill(0);
        
        beginShape();
            vertex(60+i*30,90);
            vertex(70+i*30,100);
            vertex(80+i*30,90);
        endShape();
        
        arc(65+i*30,90,10,10,PI,TWO_PI);
        arc(75+i*30,90,10,10,PI,TWO_PI);
    }
    
    //This loop fills the black empty hearts with purple hearts, using the lives variable to render as many purple hearts as the number of lives remaining.
    for(var i=0;i<(lives);i+=1)
    {
        //drawing code for purple heart shapes
        stroke(0);
        fill(255,0,255);
        
        beginShape();
            vertex(60+i*30,90);
            vertex(70+i*30,100);
            vertex(80+i*30,90);
        endShape();
        
        arc(65+i*30,90,10,10,PI,TWO_PI);
        arc(75+i*30,90,10,10,PI,TWO_PI);
    }
}

function createPlatforms(x,y,length)
{
    var platform = 
        {
            x: x,
            y: y,
            length: length,
            draw: function()
                  {  
                    //drawing code for icy platforms
                    fill(147,249,251,150);
                      
                    beginShape();
                        vertex(x,y);
                        vertex(x+20*length/170,y+10);
                        vertex(x,y+20);
                        vertex(x+40*length/170,y+30);
                        vertex(x+90*length/170,y+10);
                        vertex(x+120*length/170,y+20);
                        vertex(x+length,y);
                    endShape(CLOSE);

                    fill(31,242,248,150);
                      
                    beginShape();
                        vertex(x+110*length/170,y+35);
                        vertex(x+120*length/170,y+20);
                        vertex(x+90*length/170,y+10);
                        vertex(x+65*length/170,y+10);
                    endShape(CLOSE);

                    triangle(x+65*length/170,y+10,
                             x+40*length/170,y+30,
                             x+90*length/170,y+10);
                    
                    triangle(x,y,x+14*length/170,y+20,x+20*length/170,y+10);
                    triangle(x+20*length/170,y+10,x+15*length/170,y+20,x,y+20);
                    
                    
                    fill(40,186,198,150);
                      
                    beginShape();
                        vertex(x+120*length/170,y+20);
                        vertex(x+170*length/170,y);
                        vertex(x+160*length/170,y+15);
                        vertex(x+110*length/170,y+35);
                    endShape(CLOSE);
                  },
            
            checkContact: function(penguin_x,penguin_y)
                          {
                            if(penguin_x>this.x && penguin_x<this.x+this.length)
                                {
                                    var distance = this.y-penguin_y;
                                    
                                    if (distance==0)
                                        {
                                            return true;
                                        }
                                   return false;
                                }
                            return false;
                          }
        }
    return platform;
}

function Enemy (x,y,range)
{
    this.x = x;
    this.y = y;
    this.range = range;
    this.currentX = x;
    this.increment = 1;
    
    this.update = function()
                {
                    this.currentX += this.increment;
                    if (this.currentX >= this.x + this.range)
                    {
                        this.increment = -1;
                    }
                    else if (this.currentX <this.x)
                    {
                        this.increment = 1;
                    }
                };
    
    this.draw = function ()
                {
                    this.update();

                    ///////ORANGE FLAME DRAWING CODE/////////
                    fill(255,128,0);
                    strokeWeight(2.5);
                    stroke(0);

                    arc(this.currentX+2.5,this.y-20,41.25,41.25,0,PI);
                    arc(this.currentX+4.5,this.y-20,37.5,75,-PI/3*3/4,0);
                    arc(this.currentX-3,this.y-30,30,67.5,-PI/2*3/4,0);
                    line(this.currentX+12,this.y-32,this.currentX+17,this.y-45);
                    arc(this.currentX-7,this.y-20,22.5,22.5,PI,PI+PI/4);

                    noFill();
                    arc(this.currentX-8,this.y-50,22.5,45,-PI/6,PI/2.3);

                    stroke(255,0,0);
                    arc(this.currentX-11,this.y-50,22.5,45,-PI/6,PI/2.3);

                    stroke(0);
                    line(this.currentX-9,this.y-37,this.currentX-5,this.y-30);
                    line(this.currentX-11,this.y-25,this.currentX-9,this.y-36);
                    line(this.currentX-11,this.y-24,this.currentX-15,this.y-29);

                    noStroke();
                    fill(255,128,0);
                    rect(this.currentX+1,this.y-33,20,20);
                    rect (this.currentX-10,this.y-28,15,20);

                    fill(255,128,0);
                    triangle(this.currentX-12,this.y-20,
                             this.currentX-8,this.y-36,
                             this.currentX-3,this.y-25);

                    rect(this.currentX-2,this.y-31,5,10);

                    ///////YELLOW FLAME DRAWING CODE/////////
                    fill(255,255,0);
                    stroke(0);
                    strokeWeight(1.5);

                    arc(this.currentX+2.5,this.y-17,27.5,27.5,0,PI);
                    arc(this.currentX+2,this.y-17,28,50,-PI/6,0);
                    arc(this.currentX-3,this.y-20,24,45,-PI/4,0);
                    line(this.currentX+9,this.y-20,this.currentX+14,this.y-30);
                    arc(this.currentX-4,this.y-15,15,25,PI,PI+PI/4);

                    noFill();
                    arc(this.currentX-2,this.y-30,15,25,-PI/6,PI/2.3);

                    fill(255,128,0);
                    stroke(255,128,0);
                    arc(this.currentX-3,this.y-30,15,25,-PI/6,PI/2);

                    stroke(0);
                    line(this.currentX-3,this.y-28,this.currentX+2,this.y-20);
                    line(this.currentX-5,this.y-16,this.currentX-3,this.y-27);
                    line(this.currentX-5,this.y-15,this.currentX-9,this.y-20);

                    noStroke();
                    fill(255,255,0);

                    triangle(this.currentX-6,this.y-10,
                             this.currentX-2,this.y-28,
                             this.currentX+3,this.y-15);
                };
    
    this.checkContact = function (penguin_x,penguin_y)
                        {

                            if (dist(penguin_x,penguin_y,this.currentX,this.y)< 40)
                            {
                                return true;
                            }
                            else 
                            {
                                return false;
                            }
                        }
}

function levelCompleteText()
{
    fill(255,0,255,50);
    rect(262,438,500,50);
    arc(262,463,50,50,PI/2,3*PI/2);
    arc(762,463,50,50,3*PI/2,PI/2);

    fill(0);
    textSize(25);
    push();
    strokeWeight(5);
    text("Level complete. Press space to continue.",312,458,[500],[100]);
    pop();

}

function gameOverText()
{
    fill(255,0,255,50);
    rect(262,438,500,50);
    arc(262,463,50,50,PI/2,3*PI/2);
    arc(762,463,50,50,3*PI/2,PI/2);

    fill(0);
    textSize(25);
    strokeWeight(5);
    text("Game over. Press space to continue.",312,458,[500],[100]);
    strokeWeight(1);
    noStroke();
}

function endGame()
{
    isRight = false;
    isLeft = false;
}

function drawSnowfallAnimation()
{
    
    for (var i=0; i<200; i++)
    {
        //adding objects to the array of snowballs, and using the random function to vary the x position, y position, and size of snowballs.
        snowballs.push({x: random(-2500,4500), y: random(0,floorPos_y),size: random(3,10)});
        
        //snowballs drawing code
        fill(255);
        ellipse(snowballs[i].x,snowballs[i].y,snowballs[i].size,snowballs[i].size);
        
        //incrementing the y position of snowballs so they fall vertically downwards
        snowballs[i].y+=snowballs[i].size/5;//I made the increment in the y position of snowballs proportional to the size of the snowballs, so that larger snowballs fall faster.

         //this conditional statement ensures that snowballs which reach the ground are rendered at the top of the canvas again.
        if (snowballs[i].y>=floorPos_y)
        {
            snowballs[i].y=0;
            snowballs[i].x=random(-2500,4500);//resetting the x position of the snowballs
        }
    }   
}

function drawFishAnimation()
{
    //red fish drawing code
    fill(255,0,0);
    ellipse(red_fish_x_pos,450,20,10);
    triangle(red_fish_x_pos+10,450,red_fish_x_pos+20,445,red_fish_x_pos+20,455);

    red_fish_x_pos-=4;//decrementing the x position of the red fish so it swims to the left
    
    //if the red fish reaches the left end of the canvas, it appears at the right end.
    if(red_fish_x_pos == 0)
    {
        red_fish_x_pos=width;
    }

    //green fish drawing code
    fill(0,255,0);
    ellipse(green_fish_x_pos,550,20,10);
    triangle(green_fish_x_pos-10,550,green_fish_x_pos-20,545,green_fish_x_pos-20,555);

    green_fish_x_pos+=4;//incrementing the x position of the green fish so it swims to the right

    //if the green fish reaches the right end of the canvas, it appears at the left end.
    if(green_fish_x_pos == width)
    {
        green_fish_x_pos-=width;
    }
}

function drawSunset()
{
    /////// SUNSET SKY//////////
    var blue = color(194,254,250);
    var white = color(255);
    var peach = color(254,160,188);
    var yellow = color(254,236,18);
    var light_peach = color(255,225,234);
    
    //loop for sky gradient between blue and white
    for (var i = 0; i < 380; i++)
    {
        var skycolour = lerpColor (blue,white,i/380);//renders a shade between blue and white, as i increases, the sky colour is lighter

        fill(skycolour);
        rect(0,i/2,width,0.5); //rectangles of height 0.5 are rendered below each other, with colours blending from blue to white, creating a gradient effect.
    } 
    
    //loop for sky gradient between white and peach
    for (var i = 0; i < 524; i++) 
    {
        var skycolour = lerpColor (white,peach,i/524);

        fill(skycolour);
        rect(0,190+i/2,width,0.5); //Adding 190 to the y position makes the white to peach gradient appear below the blue to white gradient
    } 

    //loop for sun gradient between yellow and peach
    for (var i = 0; i < 30; i++)
    {
        var skycolour = lerpColor(light_peach,yellow,i/30);

        fill(skycolour);
        ellipse(532,268,130-i,130-i);//Smaller ellipses are drawn over each other, with colours blending from peach to yellow. The smallest ellipse has diameter 130-30=100
    } 

    //loop for gradient between white hot center of sun and yellow edges
    for (var i = 0; i < 50; i++)
    {
        var skycolour=lerpColor(yellow,white,i/50);
        
        fill(skycolour);
        ellipse(532,268,100-i,100-i);// Smaller ellipses are rendered over each other, colours blending from yellow to white. The maximum diameter is 100, so this yellow to white gradient blends with the peach to yellow gradient.
    } 


    /////// REFLECTTION OF SUNSET IN WATER//////////
    
    //peach to white gradient
    for (var i = 0; i < 150; i++) 
    {
        var skycolour=lerpColor(peach,white,i/150);//I inverted the colours peach and white in the reflection

        fill(skycolour);
        rect(0,432+i/2,width,0.5);//I added 432 to the y position, so the reflection appears below the sky in the water.
    } 
    //white to blue gradient
    for (var i = 0; i < 300; i++) 
    {
        var skycolour=lerpColor(white,blue,i/300);

        fill(skycolour);
        rect(0,506+i/2,width,0.5);
    } 

    //sun reflection
    for (var i = 0; i < 30; i++) 
    {
        var skycolour=lerpColor(light_peach,yellow,i/30);

        fill(skycolour);
        arc(532,433,130-i,130-i,0,PI);//using the arc function to reflect half of the sun
    } 
    for (var i = 0; i < 50; i++) 
    {
        var skycolour=lerpColor(yellow,white,i/50);

        fill(skycolour);
        arc(532,433,100-i,100-i,0,PI);
    } 
}