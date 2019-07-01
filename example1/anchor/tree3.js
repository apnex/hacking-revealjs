var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(document.body);


// init anchor
const a = anchor();
var main = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);
two.add(main);
var group1 = new Two.Group();
main.add(group1);

var pathArray = [];

var opts = {
	scale: {
		x: 40,
		y: 40
	}
};

// path1
addPath([
	[-4, -4],
	[-3, -4]
], 0, 1);

// path2
addPath([
	[2, -4],
	[3, -4]
], 1, 0);

// path3
addPath([
	[-4, -3],
	[-2, -3],
	[-2, -4],
	[1, -4],
	[1, -3]
], 0, 1);

// path4
addPath([
	[-1, 0],
	[-1, -3],
	[0, -3]
], 0, 1);

//path5
addPath([
	[2, -3],
	[3, -3]
], 1, 0);

//path6
addPath([
	[-4, -2],
	[-2, -2],
	[-2, 0]
], 0, 0);

//path7
addPath([
	[1, -1],
	[1, 0]
], 1, 0);

//path8
addPath([
	[0, 0],
	[0, -2],
	[3, -2]
], 0, 0);

//path9
addPath([
	[-4, -1],
	[-3, -1]
], 0, 1);

//path10
addPath([
	[2, -1],
	[3, -1]
], 1, 0);

// bottom boxes
addBox(0, 0, 0);
addBox(-2, 0, 0);

// left boxes
addBox(-4, -4, 1);
addBox(-4, -2, 1);

// right boxes
addBox(3, -4, 1);
addBox(3, -2, 1);

function addBox(x, y, rotate) {
	let scale = {
		x: opts.scale.x,
		y: opts.scale.y
	};
	let offset = {
		x: scale.x,
		y: scale.y / 2
	};
	let size = {
		x: 2 * scale.x,
		y: scale.y
	}
	let box;
	if(rotate) {
		box = new Two.RoundedRectangle(x * scale.y + offset.y, y * scale.x + offset.y, size.y, size.x, scale.x / 8);
	} else {
		box = new Two.RoundedRectangle(x * scale.x + offset.x, y * scale.y, size.x, size.y, scale.x / 8);
	}
	box.fill = colours['mRed-200'];
	box.stroke = colours['mRed-500'];
	box.linewidth = scale.x / 6;
	group1.add(box);
}

function addPath(points, start = 0, end = 0) {
	let scale = {
		x: opts.scale.x,
		y: opts.scale.y
	};
	let offset = {
		x: scale.x / 2,
		y: 0
	};
	let newPath = points.map((point) => {
		return {
			x: point[0] * scale.x + offset.x,
			y: point[1] * scale.y + offset.y
		};
	});
	let path = new Two.Path(a.toAnchors(a.roundCorners(newPath, scale.x / 4)), false, false, true);
	path.linewidth = scale.x * 0.8;
	path.fill = 'none';
	path.stroke = colours['mLight-Blue-600'];

	// testing handlers
	group1.add(path);
	pathArray.push(path);
	two.update();
	path._renderer.elem.addEventListener('mouseover', function() {
		path.stroke = colours['mRed-300'];
	}, false);
	path._renderer.elem.addEventListener('mouseout', function() {
		path.stroke = colours['mLight-Blue-600'];
	}, false);
	path._renderer.elem.addEventListener('click', function() {
		path.stroke = colours['mLight-Green-300'];
	}, false);

	if(start) {
		let circle = two.makeCircle(newPath[0].x, newPath[0].y, scale.x / 3);
		circle.fill = colours['mLight-Green-300'];
		circle.stroke = colours['mLight-Green-500'];
		circle.linewidth = scale.x / 4;
		group1.add(circle);
	}
	if(end) {
		let circle = two.makeCircle(newPath[newPath.length - 1].x, newPath[newPath.length - 1].y, scale.x / 3);
		circle.fill = colours['mLight-Green-300'];
		circle.stroke = colours['mLight-Green-500'];
		circle.linewidth = scale.x / 4;
		group1.add(circle);
	}
}

var rot1 = 90 * (Math.PI / 180); // 90
var rot2 = Math.PI; // 180
var rot3 = 270 * (Math.PI / 180); // 270
group1.center();
//group1.rotation = rot1;
//group1.translation.set(100, 0);

var afocus = two.makeCircle(20, 20, 10);
afocus.fill = colours['mRed-100'];
afocus.stroke = colours['mRed-400'];
afocus.linewidth = 2;

var keys = {
	'left': 37,
	'up': 38,
	'right': 39,
	'down': 40
};

window.onfocus = function() {
	console.log('focus is set');
	afocus.fill = colours['mLight-Green-300'];
	afocus.stroke = colours['mLight-Green-500'];
};
window.addEventListener("message", function(e) {
	if(e.data == 'slide:start') {
		console.log('slide:start');
		setTimeout(() => {
			window.focus();
		}, 100);
	}
}, false);
window.addEventListener("keyup", function(e) {
	console.log('key: ' + e.keyCode);
	pathArray.forEach((mypath) => {
		mypath.stroke = colours['mOrange-400'];
	});
	if(e.keyCode === keys.right) { // refocus parent
		afocus.fill = colours['mRed-100'];
		afocus.stroke = colours['mRed-400'];
		window.parent.focus();
	}
	//two.update();
}, false);
