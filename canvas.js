// function that generates random colors
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// selecting the canvas element and storing it into canvas variable
var canvas = document. querySelector('canvas');

// assigning the window width and height to the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// taking a variable wich will be responsible for all the drawings we will impplement
var c = canvas.getContext('2d');

// Moving forvard with the making of different shapes in the canvas

// Color style to the rectangle
// c.fillStyle = "red";
// Rectangles
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "blue";
// c.fillRect(300, 200, 100, 100);
// c.fillStyle = "green";
// c.fillRect(500, 300, 100, 100);

// Lines
// c.beginPath();
// c.moveTo(200, 200);
// c.lineTo(300, 200);
// c.lineTo(400, 300);
// c.lineTo(500, 300);
// c.strokeStyle = "#dafc32";
// c.stroke(); 

// Arc or Circle
// c.beginPath();
// c.arc(500, 200, 40, 0, Math.PI*2, false);
// c.strokeStyle = "red";
// c.stroke();

// Creating multiple circles using for loops
// for (let i = 0; i < 100; i++) {
// 	c.beginPath();
// 	c.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 40, 0, Math.PI*2, false);
// 	c.strokeStyle = getRandomColor();
// 	c.stroke();
// }

var mouse = {
	x: undefined,
	y: undefined
}

let maxRadius = 40;

var colorArray = [
	'#fff',
	'red',
	'#eee',
	'#000',
	'#50e86b',
	'#51b9d0',
	'#FCE95F',
	'#3F52AE'
];

window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
	
});

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y =y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.coloSet = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		c.fillStyle = this.coloSet;
		c.fill();
	}
	this.update = function() {
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
			this.dx = -this.dx;
		}
		if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}
	
		this.x += this.dx;
		this.y += this.dy;

		// interactivity with the bubbles
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y <50 && mouse.y - this.y >-50) {
			if(this.radius < maxRadius) {
				this.radius += 1;
			}
		} else if(this.radius > this.minRadius) {
			this.radius -= 1; 
		}

		this.draw();
	}

}

// Begning of circle animation

var circleArray = [];
for(let i = 0; i < 500; i++) {
	let radius = Math.random() * 3 + 2;
	let x = Math.random() * (innerWidth - radius * 2) + radius;
	let y = Math.random() * (innerHeight - radius * 2) + radius;
	let dx = (Math.random() - 0.5);
	let dy = (Math.random() - 0.5);
	circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
};
animate();