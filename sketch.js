// motion and orientation variables are global
// var alpha, beta, gamma; //ORIENTATION
// var xmotion, ymotion, zmotion; //MOTION

// I wanted to do a drawing thingy, where user directed the ellipse
// according to the alpha and beta orientation but that didn't work
// created a version of my bubble-tag but mobile

// position values
var x = 0; 
var y = 0; 

// var theX, theY;

// speed - velocity
var vx = 0; 
var vy = 0; 

// acceleration 
var ax = 0; 
var ay = 0; 

var bg = 'plum';

var vMultiplier = 0.007; // so we don't get a huge number
var bMultiplier = 0.4; // accounting for the bouncing 

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	background(bg);
	noStroke();
	fill('white'); 
	ellipse(x + 30, y + 30, 30);
	// ellipse(theX, theY, 100, 100);
}
 
function init() {

	function deviceMotion(event) {
		// returns acceleration of phone 
		var acc = event.acceleration;
		// orientation 
		var alpha = Math.floor(event.alpha);
		var beta = Math.floor(event.beta);
		var gamma = Math.floor(event.gamma); 

		// accelerates with movement not considering gravity 
		var ax = Math.abs(acc.x);
		var ay = Math.abs(acc.y);
		var az = Math.abs(acc.z);

		// velocity + directions 
		vx = vx + ax; 
		vy = vy + ay; 

		// x & y position formulas
		x = x + vx * vMultiplier;
		y = y + vy * vMultiplier; 

		// 4 cases when bubble hits the edges of screen
		if (x < 0) { 
			x = 0; // reset x 
			vx = -vx * bMultiplier; // changing direction of velocity
			bg = "coral";
			document.body.style.backgroundColor = bg;
		} 
		if (y < 0) {
			y = 0; 
			vy = -vy * bMultiplier; 
			bg = "salmon";
			document.body.style.backgroundColor = bg;
		}
		if (x > windowWidth - 30) { 
			x = windowWidth - 30; 
			vx = -vx + ax * bMultiplier; 
			bg = "orchid";
			document.body.style.backgroundColor = bg;
		}
		if (y > windowHeight - 30) { 
			y = windowHeight - 30; 
			vy = -vy + ay * bMultiplier; 
			bg = "yellowgreen";
			document.body.style.backgroundColor = bg;
		}
		
		// printing position values 
		document.getElementById('xmov').innerHTML = Math.floor(x);
		document.getElementById('ymov').innerHTML = Math.floor(y);
		
		// send information on data
		socket.emit('motion', {
			'x': Math.floor(x),
			'y': Math.floor(y)
		});

	} // end of deviceMotion fct

	window.addEventListener('devicemotion', deviceMotion, true);

	// when we touch we want velocity to change to 0
	function touchStarted(event) {
			
			vx = 0; 
			vy = 0; 
			ax = 0; 
			ay = 0;

		return false;
	} // end of touch 

} // end of init

window.addEventListener('load', init);