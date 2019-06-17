var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(document.body);

// test path
var path1 = [
	{
		x: 100,
		y: 100,
		command: 'M'
	},
	{
		x: 200,
		y: 100,
		command: 'L'
	},
	{
		x: 200,
		y: 200,
		command: 'L'
	},
	{
		x: 300,
		y: 200,
		command: 'L'
	},
	{
		x: 300,
		y: 100,
		command: 'L'
	}
];

var path2 = [
	{
		x: 0,
		y: 100,
		command: 'M'
	},
	{
		x: 200,
		y: 100,
		command: 'L'
	},
	{
		x: 200,
		y: 200,
		command: 'L'
	},
	{
		x: 300,
		y: 200,
		command: 'L'
	},
	{
		x: 300,
		y: -100,
		command: 'L'
	},
	{
		x: 0,
		y: -100,
		command: 'L'
	}
];

// init anchor
const a = anchor();

// round path
var newPath = a.roundCorners(path2, 40, 1);
//console.log(a.toString(newPath));

// build anchor list
var pathTest = new Two.Path(a.toAnchors(newPath), false, false, true);
pathTest.linewidth = 20;
pathTest.stroke = colours['mLight-Blue-600'];

// add to scene
var group = new Two.Group();
group.translation.set(two.width / 2, two.height / 2);
group.add(pathTest);
group.center();
two.add(group);

var keys = {
	'left': 37,
	'up': 38,
	'right': 39,
	'down': 40
};

window.onfocus = function() {
	console.log('focus is now on!!!!');
};

window.onload = function() {
	console.log('slide:onload');
};

window.addEventListener("message", function(e) {
	if(e.data == 'slide:start') {
		console.log('slide:start');
		//console.log(e);
		//console.log(this);
		setTimeout(() => {
			window.focus();
			console.log('focus set after 100');
		}, 100);
	}
}, false);

window.addEventListener("keyup", function(e) {
	console.log('key: ' + e.keyCode);
	if(e.keyCode === keys.right) {
		// works perfectly to refocus on parent!
		window.parent.focus();
	}
}, false);
