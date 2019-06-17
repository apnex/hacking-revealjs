#!/usr/bin/env node

function anchor() {
	this.roundCorners = roundCorners;
	this.toAnchors = toAnchors;
	this.toString = toString;
	return this;
};
//module.exports = anchor;

function roundCorners(path, radius = 5, close = 0) {
	let newPath = [];
	for(let j = 0, jlen = path.length; j < jlen; j++) {
		let point = path[j];
		if(j > 0) { // not first point
			if(j < jlen - 1) { // not last point
				let newPoints = calcCorner(path[j - 1], point, path[j + 1], radius);
				newPoints.forEach((apoint) => {
					newPath.push(apoint);
				});
			} else { // last point
				if(close == 1) {
					calcCorner(path[j - 1], point, path[0], radius).forEach((apoint) => {
						newPath.push(apoint);
					});
					calcCorner(point, path[0], path[1], radius).forEach((apoint) => {
						newPath.push(apoint);
					});
					newPath.push({
						command: 'Z'
					});
				} else {
					newPath.push(point);
				}
			}
		} else { // first point
			if(close == 1) { // shift to accommodate curve
				let startPoint = getCoord(point, path[j + 1], radius);
				startPoint.x += point.x;
				startPoint.y += point.y;
				startPoint.command = 'L';
			} else {
				newPath.push(point);
			}
		}
	}
	return newPath;
}

function toAnchors(path) {
	let newPath = [];
	path.forEach((p) => {
		if(newPath.length == 0) {
			p.command = 'M';
		}
		switch(p.command) {
			case('M'):
				newPath.push(new Two.Anchor(p.x, p.y, 0, 0, 0, 0, Two.Commands.move));
			break;
			case('L'):
				newPath.push(new Two.Anchor(p.x, p.y, 0, 0, 0, 0, Two.Commands.line));
			break;
			case('Q'):
				newPath.push(new Two.Anchor(p.x, p.y, p.controls.left.x, p.controls.left.y, p.controls.right.x, p.controls.right.y, Two.Commands.curve));
			break;
			case('Z'):
				newPath.push(new Two.Anchor(p.x, p.y, 0, 0, 0, 0, Two.Commands.close));
			break;
			default:
				newPath.push(new Two.Anchor(p.x, p.y, 0, 0, 0, 0, Two.Commands.line));
		}
	});
	return newPath;
}

function toString(path) {
	let newPath = '';
	path.forEach((p) => {
		if(newPath.length > 0) {
			newPath += ' ';
		} else{
			p.command = 'M';
		}
		switch(p.command) {
			case('M'):
				newPath += 'M' + p.x + ' ' + p.y;
			break;
			case('L'):
				newPath += 'L' + p.x + ' ' + p.y;
			break;
			case('Q'): // quadratic bezier
				newPath += 'Q' + (p.controls.left.x + p.x) + ' ' + (p.controls.left.y + p.y) + ' ' + p.x + ' ' + p.y;
			break;
			case('Z'):
				newPath += 'Z';
			break;
			default:
				newPath += 'L' + p.x + ' ' + p.y;
		}
	});
	return newPath;
}

function calcCorner(prev, anchor, next, radius) {
	let point1 = getCoord(anchor, prev, radius);
	point1.command = 'L';
	let point2 = getCoord(anchor, next, radius);
	point2.command = 'Q';
	point2.controls = { // inject controls
		'left': {
			x: -point2.x,
			y: -point2.y
		},
		'right': {
			x: -point2.x,
			y: -point2.y
		}
	}
	point1.x += anchor.x;
	point1.y += anchor.y;
	point2.x += anchor.x;
	point2.y += anchor.y;
	return [point1, point2];
}

// stateless - relative coordinate
function getCoord(point1, point2, radius) {
	let r1x = point1.x - point2.x;
	let r1y = point1.y - point2.y;

	// find angle
	if(r1x == 0 && r1y == 0) { // two identical coords - catch div/zero error
		r1y =  1;
	}
	let ang = Math.atan(r1x / r1y);
	let opp = Math.sin(ang) * radius;
	let adj = Math.cos(ang) * radius;
	let mx = Math.abs(Math.round(opp));
	let my = Math.abs(Math.round(adj));
	let point = {};
	if(r1x < 0) {
		point.x = mx;
	} else {
		point.x = -mx;
	}
	if(r1y < 0) {
		point.y = my;
	} else {
		point.y = -my;
	}
	return point;
}
