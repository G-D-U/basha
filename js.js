function getConnection() {

	const connection =
		navigator.connection ||
		navigator.mozConnection ||
		navigator.webkitConnection;

	connection.addEventListener('change', updateConnectionStatus);

	return connection;
}

function updateConnectionStatus() {
	
	var speed =
    80 +
		Math.floor(Math.random() * 10) ;

	if((speed<0)||(connection.downlink==0)) speed = 0.0;

	var type = connection.effectiveType;
	var rtt = connection.rtt;
	var angle = calcAngle(speed);

    document.getElementById("arrow").style.WebkitTransform = `rotate(${angle}deg)`; 
    document.getElementById("arrow").style.msTransform = `rotate(${angle}deg)`;
    document.getElementById("arrow").style.transform = `rotate(${angle}deg)`;
	document.getElementById("counter").innerHTML = `${speed.toFixed(1)} Mbps`;
	document.getElementById("effectiveType").innerHTML = `${type}`;
	document.getElementById("rtt").innerHTML = `${rtt} milliseconds`;
    
}

var connection = getConnection();
let timerId = setInterval(() => dummyRequest(), 1000 + Math.random() * 500 + Math.random() * 500 );

function refreshSpeedOMeter(){
	clearInterval(timerId);
	let speed = 0;
	let angle = calcAngle(speed);
	var type = "-";
	var rtt = connection.rtt;

	document.getElementById("arrow").style.WebkitTransform = `rotate(${angle}deg)`; 
    document.getElementById("arrow").style.msTransform = `rotate(${angle}deg)`;
    document.getElementById("arrow").style.transform = `rotate(${angle}deg)`;
    document.getElementById("counter").innerHTML = `${speed.toFixed(1)} Mbps`;
	document.getElementById("effectiveType").innerHTML = `${type}`;
	document.getElementById("rtt").innerHTML = `${rtt} milliseconds`;

	timerId = setInterval(() => dummyRequest(), 1000 + Math.random() * 500 + Math.random() * 500 );
}

function dummyRequest() {


	updateConnectionStatus();
}

function calcAngle(value) {
	var angle = -90;
	if (value < 1.5) {
		angle = (value / 0.1) * 60 - 90;
	} else if (value > 1.5 && value < 6.5) {
		angle = (value / 2) * 30 
	} else if (value > 6.5 && value < 15) {
		angle = (value / 5) * 30;
	} else {
		angle = (value / 15) * 15;
	}

	return Math.round(angle);
}
