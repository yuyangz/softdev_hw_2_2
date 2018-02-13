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
//for dvd animation
var xIncr;
var yIncr;
var id;




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
    animate = true;
}

//received function from JZhang
var animateDVD = function(e){
    //prevents ghosts
    ctx.clearRect(0,0,600,600);

    //
    xcor += xIncr;
    ycor += yIncr;

    var logo = new Image();
logo.src = "dvd.png";
ctx.drawImage(logo,xcor, ycor, radius, radius);
    //no longer necessary as we are now using logo
    /*
    ctx.beginPath();
    ctx.arc(xcor, ycor, radius, 0, 2*Math.PI);
    ctx.fill();    
    ctx.stroke();
*/

    //if the x or y is at the border, switch increments
    var temp;
    if(xcor <= radius || xcor >= 600 - radius){
	xIncr = -1 * xIncr;
    }
    if(ycor <= radius || ycor >= 600 - radius){
	yIncr = -1 * yIncr;
    }

    //keeps track of id in case you want to stop the animation
    id = window.requestAnimationFrame(animateDVD);
}

var dvd = function(e){
    if(!animate){
	xcor = Math.random() * 400 + 100;
	ycor = Math.random() * 400 + 100;

	xIncr = Math.random() * 10 - 5;
	yIncr = Math.random() * 10 - 5;
	
	animate = true;
	radius = 50;
	window.requestAnimationFrame(animateDVD);
    }
}




var stopFunction = function(e){
    if(animate){
	console.log("stop");
		window.cancelAnimationFrame(frame);
	    animate = false;
	console.log("stop");
	}
}

var dvdBtn = document.getElementById("dvd");


document.getElementById("stop").addEventListener("click", stopFunction);
document.getElementById("start").addEventListener("click", growAnimation);
dvdBtn.addEventListener("click", dvd);
