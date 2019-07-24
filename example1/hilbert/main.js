var two = new Two({
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

// grid
let aGrid = grid();
aGrid([
	[42,0,43,0,46,0,47,0,58,0,59,0,62,0,63],
	[0,10,0,0,0,11,0,0,0,14,0,0,0,15,0],
	[41,0,44,0,45,0,48,0,57,0,60,0,61,0,64],
	[0,0,0,2,0,0,0,0,0,0,0,3,0,0,0],
	[40,0,39,0,50,0,49,0,56,0,55,0,66,0,65],
	[0,9,0,0,0,12,0,0,0,13,0,0,0,16,0],
	[37,0,38,0,51,0,52,0,53,0,54,0,67,0,68],
	[0,0,0,0,0,0,0,99,0,0,0,0,0,0,0],
	[36,0,33,0,32,0,31,0,74,0,73,0,72,0,69],
	[0,8,0,0,0,7,0,0,0,18,0,0,0,17,0],
	[35,0,34,0,29,0,30,0,75,0,76,0,71,0,70],
	[0,0,0,1,0,0,0,0,0,0,0,4,0,0,0],
	[22,0,23,0,28,0,27,0,78,0,77,0,82,0,83],
	[0,5,0,0,0,6,0,0,0,19,0,0,0,20,0],
	[21,0,24,0,25,0,26,0,79,0,80,0,81,0,84]
]);
aGrid.x(60);
aGrid.y(60);
aGrid.offset(aGrid.get(99)); // obtain center coord

// consolidate into a 'spread' operator
let range = (i, j, a = []) => {
	for(i; i <= j; i++) { a.push(i); } return a;
};
let order1 = range(1, 4);
let order2 = range(5, 20);
let order3 = range(21, 84);

// paths
aGrid.addPath(order3, {
	id: 'order3',
	close: 0,
	radius: 40
}, {
	linewidth: 10,
	stroke: colours['mLight-Blue-500']
});
aGrid.addPath(order2, {
	id: 'order2',
	close: 0,
	radius: 40
}, {
	linewidth: 15,
	stroke: colours['mLight-Green-500']
});
aGrid.addPath(order1, {
	id: 'order1',
	close: 0,
	radius: 40
}, {
	linewidth: 20,
	stroke: colours['mRed-500']
});

// final
let main = aGrid.main();
//main.add(aGrid.show());
main.translation.set(two.width / 2, two.height / 2);
two.add(main);

// timeline
let timeline = [
	{
		action: 'trace',
		query: '#order1'
	},
	{
		action: 'trace',
		query: '#order2'
	},
	{
		action: 'trace',
		query: '#order3'
	}
];

// controls.js to handle tracers
