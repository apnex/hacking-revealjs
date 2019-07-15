var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// init anchor
const a = anchor();
let aGrid = grid();
aGrid([
	[0,0,0,0,0,0,0],
	[0,1,0,0,0,4,0],
	[0,2,0,9,0,5,0],
	[0,3,0,0,0,6,0],
	[0,0,0,0,0,0,0]
]);
aGrid.x(100);
aGrid.y(80);
aGrid.offset(aGrid.get(9)); // obtain center coord

let icons = new Two.Group();
let iconArray = [
	server(),
	server(),
	server(),
	server(),
	server(),
	server()
];

// set main
let main = new Two.Group();
let iconRenderingGroup = new Two.Group();
let iconGroup = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);
//main.add(aGrid.show());
main.add(iconGroup);
main.add(iconRenderingGroup);
two.add(main);

function makeIcon(icon, tags) {
	tags.forEach((tag) => {
		let p = aGrid.getTag(tag);
		// return array?
		let symbol = icon.clone();
		symbol.translation.set(p.x, p.y);
		symbol.scale = 0;
		iconRenderingGroup.add(symbol);
	});
}

// focus indicator
var afocus = two.makeRoundedRectangle(20, 20, 20, 20, 4);
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
	resetTimeline();
};
window.addEventListener("message", function(e) {
	if(e.data == 'slide:start') {
		console.log('slide:start');
		setTimeout(() => {
			window.focus();
		}, 100);
	}
}, false);

var visible = 0;
window.addEventListener("keyup", function(e) {
	console.log('key: ' + e.keyCode);
	if(e.keyCode === keys.right) { // refocus parent
		afocus.fill = colours['mRed-100'];
		afocus.stroke = colours['mRed-400'];
		window.parent.focus();
	}
	if(e.keyCode === keys.left) {
		if(visible < iconArray.length) { // show next icon
			console.log('group: ' +  visible);
			makeIcon(iconArray[visible], [visible + 1]);
			visible++;
		} else {
			resetTimeline();
		}
	}
}, false);

function resetTimeline() {
	if(iconRenderingGroup.children.length > 0) {
		console.log('Waiting for remaining rendering..');
	} else {
		Object.values(iconGroup.children.ids).forEach((icon) => {
		//iconGroup.children.forEach((icon) => { // broken
			icon.remove();
		});
		visible = 0;
	}
}

// render Loop
two.bind('update', (frameCount) => {
	let newIcons = iconRenderingGroup.children;
	let end = 0.2;
	if(newIcons.length > 0) {
		console.log('iconlength: ' + newIcons.length);
		newIcons.forEach((icon) => {
			if(icon.scale < (end - 0.001)) {
				icon.scale += (end - icon.scale) * 0.125;
			} else {
				icon.scale = end;
				iconRenderingGroup.remove(icon);
				iconGroup.add(icon);
				console.log('end group: ' + icon.id);
			}
		});
	}
}).play();
