var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// init anchor
const a = anchor();
let aGrid = grid();
aGrid([
	[5,0,8,0,10,0,13],
	[1,0,2,9,3,0,4],
	[6,0,7,0,11,0,12]
]);
aGrid.x(100);
aGrid.y(100);
aGrid.offset(aGrid.get(9)); // obtain center coord

// set main
let main = new Two.Group();
main.translation.set(two.width / 2, two.height / 2);
//main.add(aGrid.show());
let pathGroup = new Two.Group();
let iconGroup = new Two.Group();
let iconRenderingGroup = new Two.Group();
main.add(pathGroup);
main.add(iconGroup);
main.add(iconRenderingGroup);
two.add(main);

// timeline
let timeline = [
	{
		action: 'show',
		tags: [1],
		icon: loadbalancer()
	},
	{
		action: 'show',
		tags: [2],
		icon: router()
	},
	{
		action: 'show',
		tags: [3],
		icon: firewall()
	},
	{
		action: 'show',
		tags: [4],
		icon: netswitch()
	},
	{
		action: 'trace',
		tags: ['moo']
	},
];

[
	[5, 6, 7, 8, 10, 11, 12, 13]
].forEach((link) => {
	pathGroup.add(aGrid.addPath(link, {
		id: 'moo',
		close: 1,
		radius: 40
	}, {
		linewidth: 20
	}));
});

function placeIcon(icon, tags) {
	aGrid.addIcon(icon, tags).forEach((sym) => {
		sym.scale = 0;
		iconRenderingGroup.add(sym);
	});
}

// key controls
two.update();
var afocus = two.makeRoundedRectangle(20, 20, 20, 20, 4);
afocus.fill = colours['mRed-100'];
afocus.stroke = colours['mRed-400'];
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

var idx = 0;
window.addEventListener("keyup", function(e) {
	console.log('key: ' + e.keyCode);
	if(e.keyCode === keys.right) { // refocus parent
		afocus.fill = colours['mRed-100'];
		afocus.stroke = colours['mRed-400'];
		window.parent.focus();
	}
	if(e.keyCode === keys.left) {
		if(idx < timeline.length) { // show next item
			console.log('group: ' +  idx);
			switch(timeline[idx].action) {
				case('show'):
					placeIcon(timeline[idx].icon, timeline[idx].tags);
				break;
				case('trace'):
					timeline[idx].tags.forEach((tag) => {
						let orig = document.getElementById(tag);
						let myanim = new animate(orig);
						myanim.startDrawingPath();
					});
				break;
			}
			idx++;
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
			icon.remove();
		});
		idx = 0;
	}
}

// render Loop
two.bind('update', (frameCount) => {
	let newIcons = iconRenderingGroup.children;
	let end = 0.3;
	if(newIcons.length > 0) {
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
