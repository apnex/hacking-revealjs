function vm() {
	// setup painter (default style and line-routing)
	let myPainter = paint();
	myPainter.opts({
		handles: 0
	}).style({
		stroke: colours['mRed-600'],
		fill: 'none',
		linewidth: 6
	});

	// build grid (coordinate structure)
	let myGrid = grid();
	myGrid([
		[1,0,0,0,2],
		[0,0,0,0,0],
		[5,0,9,0,0],
		[0,0,0,0,0],
		[4,0,0,0,3]
	]);
	myGrid.painter(myPainter);
	myGrid.x(20);
	myGrid.y(20);
	myGrid.offset(myGrid.get(9));

	// build symbol
	let symbol = new Two.Group();
	//symbol.add(myGrid.show());

	// draw border
	let mypoint = myGrid.get(9); // obtain center coord
	symbol.add(myGrid.makePath(
		makeShape(mypoint.x, mypoint.y, 15, 4),
		{
			close: 1,
			radius: 40
		}, {
			linewidth: 30,
			stroke: colours['mRed-100'],
			fill: colours['mRed-500']
		}
	));

	// write text
	let p = myGrid.getTag(9);
	let atext = new Two.Text('vm', p.x, p.y);
	atext.fill = colours['mWhite'];
	//atext.stroke = colours['mRed-900'];
	//atext.linewidth = 1;
	atext.weight = 900;
	//atext.family = 'Courier New, Courier, monospace';
	//atext.family = 'monospace, monospace';
	atext.family = 'Arial, Helvetica, sans-serif';
	atext.baseline = 'middle';
	atext.alignment = 'center';
	atext.size = 120;
	symbol.add(atext);

	return symbol;
}
