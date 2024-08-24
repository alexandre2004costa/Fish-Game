const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width=800;
canvas.height=500;
let score=0;
let gameFrame=0;
let click=false;
let gameSpeed=1;
ctx.font='50px Georgia';

let balas_array = [];
let bubble_array=[];
const b1 = new Image();
b1.src="bubble1.png";
const player=new Player();
const f_l=new Image();
f_l.src='fishi.png';
const f_r=new Image();
f_r.src='fishi2.png';

let canvas_position=canvas.getBoundingClientRect();
const mouse={
    x:canvas.width/2,
    y:canvas.height/2,
    click:false,
}
canvas.addEventListener("mousedown", (e) => {
    mouse.click = true;
    mouse.x = e.x - canvas_position.left;
    mouse.y = e.y - canvas_position.top;
    //let delta_y = player.y - mouse.y;
    //let delta_x = player.x - mouse.x;
    //let teta = Math.atan2(delta_x, delta_y);
    //balas_array.push(new Balas(teta));
  });
canvas.addEventListener("mouseup" , ()=>{
    mouse.click=false;
})
function create_Bubbles(){ 
    if (gameFrame%50==0){
        bubble_array.push(new Bubble());
    }
    for(let i=0;i<bubble_array.length;i++){
        bubble_array[i].update();
        bubble_array[i].draw();
        if (bubble_array[i].y<0-bubble_array[i].radius*2){
            bubble_array.splice(i,1);
            i--;
        }else if(bubble_array[i].distance<bubble_array[i].radius+player.radius){
            if(!bubble_array[i].counted){
                    score++;
                    bubble_array[i].counted=true;
                    bubble_array.splice(i,1);
                    i--;
                    }
                }
        }
        
        //if (!bubble_array[i].counted){
          //  for(let j=0;j<balas_array.length;j++){
            //    var d=Math.sqrt((balas_array[j].x-bubble_array[i].x)*
              //  (balas_array[j].x-bubble_array[i].x)+(balas_array[j].y-bubble_array[i].y)
               // *(balas_array[j].y-bubble_array[i].y))
               // if (d+5 < bubble_array[i].radius){
                 //   if(!bubble_array[i].counted){
                   //     score++;
                     //   bubble_array[i].counted=true;
                       // bubble_array.splice(i,1);
                   // }
               // }
           // }
       // }
}
function manage_balas(){
    for(let i=0;i<balas_array.length;i++){
        balas_array[i].update();
        balas_array[i].draw();
    }
    for(let i=0;i<balas_array.length;i++){
        if (balas_array[i].y<0-balas_array[i].radius*2 || balas_array[i].x<0-balas_array[i].radius*2){
            balas_array.splice(i,1);
        }
    }
}
const back=new Image();
back.src="background1.png";

const BG={
    x1:0,
    x2:canvas.width,
    y:0,
    width:canvas.width,
    height:canvas.height
}
function handleBackground(){
    BG.x1-=gameSpeed;
    if(BG.x1<-BG.width)BG.x1=BG.width;
    BG.x2-=gameSpeed;
    if(BG.x2<-BG.width)BG.x2=BG.width;
    ctx.drawImage(back,BG.x1,BG.y,BG.width,BG.height)
    ctx.drawImage(back,BG.x2,BG.y,BG.width,BG.height)
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleBackground();
    create_Bubbles();
    //manage_balas();
    player.update();
    player.draw();
    gameFrame++;
    ctx.fillStyle='orange';
    ctx.fillText("Score: "+score,10,50);
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize" , ()=>{
    canvas_position=canvas.getBoundingClientRect();
})