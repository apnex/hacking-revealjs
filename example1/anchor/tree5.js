var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(document.body);

// init anchor
const a = anchor();
var group1 = new Two.Group();
var opts = {
	scale: {
		x: 20,
		y: 20
	}
};

addShape([
	[-4, 1],
	[3, 1],
	[3, -6],
	[-4, -6]
], 1);

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
	group1.add(path);

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

function addShape(points, closed = 1) {
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
	let path = new Two.Path(a.toAnchors(a.roundCorners(newPath, scale.x / 4, 1)), false, false, true);
	path.linewidth = scale.x * 0.8;
	path.fill = 'none';
	path.stroke = colours['mOrange-100'];

	// testing handlers
	group1.add(path);
	two.update();
}

var main = new Two.Group();

var rot1 = 90 * (Math.PI / 180); // 90
var rot2 = Math.PI; // 180
var rot3 = 270 * (Math.PI / 180); // 270
group1.center();
main.add(group1);

var group2 = group1.clone();
group2.rotation = rot1;
group2.translation.set(160, 0);
main.add(group2);

var group3 = group1.clone();
group3.rotation = rot3;
group3.translation.set(-160, 0);
main.add(group3);
main.translation.set(0, -300);

var main2 = main.clone();
main2.rotation = rot2;
main2.translation.set(0, 300);

var group4 = group1.clone();
group4.rotation = rot3;

var base = new Two.Group();
base.add(group4);
base.add(main);
base.add(main2);
base.center();
base.translation.set(-310, 0);

var base2 = base.clone();
base2.center();
base2.rotation = rot2;
base2.translation.set(310, 0);

var master = new Two.Group();
master.add(base);
master.add(base2);
master.translation.set(two.width / 2, two.height / 2);

two.add(master);
