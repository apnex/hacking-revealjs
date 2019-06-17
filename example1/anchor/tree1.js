var two = new Two({
  fullscreen: true,
  autostart: true
}).appendTo(document.body);

// init anchor
const a = anchor();
var group = new Two.Group();
group.translation.set(two.width / 2, two.height / 2);
two.add(group);

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
	let offset = {
		x: 40,
		y: 20
	};
	let scale = {
		x: 40,
		y: 40
	};
	let size = {
		x: 80,
		y: 40
	}
	let box;
	if(rotate) {
		box = new Two.RoundedRectangle(x * scale.y + offset.y, y * scale.x + offset.y, size.y, size.x, 5);
	} else {
		box = new Two.RoundedRectangle(x * scale.x + offset.x, y * scale.y, size.x, size.y, 5);
	}
	box.fill = colours['mRed-200'];
	box.stroke = colours['mRed-500'];
	box.linewidth = 6;
	group.add(box);
}

function addPath(points, start = 0, end = 0) {
	let offset = {
		x: 20,
		y: 0
	};
	let scale = {
		x: 40,
		y: 40
	};
	let newPath = points.map((point) => {
		return {
			x: point[0] * scale.x + offset.x,
			y: point[1] * scale.y + offset.y
		};
	});
	let path = new Two.Path(a.toAnchors(a.roundCorners(newPath, 10)), false, false, true);
	path.linewidth = 20;
	path.fill = 'none';
	path.stroke = colours['mLight-Blue-600'];
	group.add(path);
	if(start) {
		let circle = two.makeCircle(newPath[0].x, newPath[0].y, 10);
		circle.fill = colours['mLight-Green-300'];
		circle.stroke = colours['mLight-Green-500'];
		circle.linewidth = 10;
		group.add(circle);
	}
	if(end) {
		let circle = two.makeCircle(newPath[newPath.length - 1].x, newPath[newPath.length - 1].y, 10);
		circle.fill = colours['mLight-Green-300'];
		circle.stroke = colours['mLight-Green-500'];
		circle.linewidth = 10;
		group.add(circle);
	}
}
