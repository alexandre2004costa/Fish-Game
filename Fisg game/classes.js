class Player{
    constructor(){
        this.x=canvas.width/2
        this.y=canvas.height/2
        this.radius=50;
        this.angle=20;
        this.frameX=0;
        this.frameY=0;
        this.spriteHeight=1635/5;
        this.spriteWidth=1992/4;
    }
    update(){
        let dx=this.x-mouse.x;
        let dy=this.y-mouse.y;
        let teta=Math.atan2(dy,dx);
        this.angle=teta;
        if (mouse.x!=this.x){
        this.x-=dx/30
        }
        if(mouse.y!=this.y){
           this.y-=dy/30
        }
    }
    draw(){
        if(mouse.click){
            ctx.lineWidth=0.2;
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x,this.y,this.radius,10);
        
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);
        if (this.x>=mouse.x){
            ctx.drawImage(f_l,this.frameX*this.spriteWidth,this.frameY*this.spriteHeight,
                this.spriteWidth,this.spriteHeight,0-60,0-45,this.spriteWidth/4,
                this.spriteHeight/4);
        }else{
            ctx.drawImage(f_r,this.frameX*this.spriteWidth,this.frameY*this.spriteHeight,
                this.spriteWidth,this.spriteHeight,0-60,0-45,this.spriteWidth/4,
                this.spriteHeight/4);
        }
        ctx.restore();
        
    }
}
class Bubble{
    constructor(){
        this.x=Math.random()*canvas.width;
        this.y=canvas.height+Math.random()*canvas.height;
        this.radius=50;
        this.speed=Math.random()*5+1;
        this.distance;
        this.counted=false;
    }
    update(){
        this.y-=this.speed;
        const dy=this.y-player.y;
        const dx=this.x-player.x;
        this.distance=Math.sqrt(dy*dy+dx*dx);
    }
    draw(){
       /* ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.fill();
        ctx.closePath();
        ctx.stroke();*/
        ctx.drawImage(b1,this.x-65,this.y-65,this.radius*2.6,this.radius*2.6);
    }
}
class Balas{
    constructor(angle){
        this.x=player.x;
        this.y=player.y;
        this.angle=angle;
        this.speed=3;
        this.counted=false;
    }
    update(){
        this.y-=this.speed*Math.cos(this.angle);
        this.x-=this.speed*Math.sin(this.angle);
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
    }
}