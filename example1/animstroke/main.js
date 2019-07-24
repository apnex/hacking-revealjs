var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);
two.renderer.domElement.setAttribute('xmlns', "http://www.w3.org/2000/svg");
const a = anchor();

// grid
let aGrid = grid();
aGrid([
	[1,0,0,0,2],
	[0,0,0,0,0],
	[0,0,9,0,0],
	[0,0,0,0,0],
	[4,0,0,0,3]
]);
aGrid.x(80);
aGrid.y(80);
aGrid.offset(aGrid.get(9)); // obtain center coord

// timeline
let timeline = [
	{ icon: server(), tags: [1] },
	{ icon: server(), tags: [2] },
	{ icon: server(), tags: [3] }
];

// set main
let main = new Two.Group();
let icons = new Two.Group();

// paths
[
	[1, 2, 3, 4]
].forEach((link) => {
	main.add(aGrid.addPath(link, {
		id: 'moo',
		close: 1,
		radius: 40
	}, {
		linewidth: 20
	}));
});

function placeIcon(icon, tags) {
	aGrid.addIcon(icon, tags).forEach((sym) => {
		sym.scale = 0.2;
		icons.add(sym);
	});
}

// final
main.translation.set(two.width / 2, two.height / 2);
main.add(icons);
two.add(main);

placeIcon(router(), [9]);

// key controls
two.update();
var trace = new tracer(document.getElementById('moo'));
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
};
window.addEventListener("message", function(e) {
	if(e.data == 'slide:start') {
		setTimeout(() => {
			window.focus();
		}, 100);
	}
}, false);
window.addEventListener("keyup", function(e) {
	console.log('key: ' + e.keyCode);
	if(e.keyCode === keys.right) { // refocus parent
		afocus.fill = colours['mRed-100'];
		afocus.stroke = colours['mRed-400'];
		window.parent.focus();
	}
	if(e.keyCode === keys.left) {
		trace.start();
	}
}, false);

// render Loop
var path = document.getElementById("moo");
var thearrow = document.getElementById("two-41");
var myarrow = new Arrow(thearrow, path);
two.bind('update', (frameCount) => {
	myarrow.update();
}).play();
