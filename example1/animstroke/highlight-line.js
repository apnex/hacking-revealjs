// thoughts on creating a highlighted line

highlight = [
	Math.round(Math.random() * 255),
	Math.round(Math.random() * 255),
	Math.round(Math.random() * 255)
];

for(i=5; i>=0; i--) {
	// draw each line, the last line in each is always white
	lineWidth = (i + 1) * 4 - 2;
	if(i == 0) {
		context.strokeStyle = '#fff';
	} else {
		context.strokeStyle = 'rgba(' + highlight[0] + ',' + highlight[1] + ',' + highlight[2] + ',0.2)';
	}
}
