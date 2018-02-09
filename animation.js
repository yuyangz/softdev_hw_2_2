var c = document.getElementById("slate");
var ctx = c.getContext("2d");


var animate = false;
var growing = true;
var radius = 100;
var go = 0;
var xcor = 100;
var ycor = 100;
var frame;
var xspeed;
var yspeed;


var draw = function(e){
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    if(growing){
		ctx.arc(250,250,go,0,2*Math.PI);
		ctx.fill();
        go += 1;
    }
	else{
		ctx.arc(250,250,go,0,2*Math.PI);
		ctx.fill();
        go -= 1;
	}
    if (go <= 0){
        growing = true;
    }
    if (go >= radius){
        growing = false;
    }
	frame = window.requestAnimationFrame(draw);
}

var growAnimation = function(e){
	if (!animate){
		animtate = true;
		frame = window.requestAnimationFrame(draw);
	}
}

var screensave = function(){
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.arc(xcor,ycor,50,0,2*Math.PI);
    ctx.fill();
    xcor += xspeed;
    if (xcor + 50 >= 500 || xcor - 50 <= 0){
        xspeed = xspeed * -1;
    }
    ycor += yspeed;
    if (ycor + 50 >= 500 || ycor - 50 <= 0){
        yspeed = yspeed * -1;
    }
    frame = window.requestAnimationFrame(screensave);
}

var animateShift = function(e){
	if (!animate){
		animate = true;
		frame = window.requestAnimationFrame(animate);
	}
}




var stop = function(e){
	if(animate){
		window.cancelAnimationFrame(frame);
		ctx.clearRect(0,0,500,500);
		animate = false;
	}
}


document.getElementById("stop").addEventListener("click", stop);
document.getElementById("start").addEventListener("click", growAnimation);
document.getElementById("dvd").addEventListener("click", screensave);
