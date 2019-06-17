var el = document.getElementById("main");
var two = new Two({
	fullscreen: true
});
two.appendTo(el);

// make node
var node = new Two.Group();

// make path
/*
      point.command = Two.Commands.curve;
      point.x = 0;
      point.y = - size * 0.75;
      // Handlers are relative to the anchor point
      point.controls.left.x = - size * 0.25;
      point.controls.right.x = size * 0.25;
*/

var anchors = [
	new Two.Anchor(200, 200, 200, 200, 20, 20, Two.Commands.curve),
	new Two.Anchor(300, 200, 300, 200, 20, 20, Two.Commands.curve),
	new Two.Anchor(340, 260, 340, 260, 20, 20, Two.Commands.curve)
];
var path = new Two.Path(anchors, true, false, true);
node.add(path);

let box = new Two.RoundedRectangle(100, 100, 100, 100, 5);
box.fill = colours['mLight-Green-500'];
node.add(box);

let circle = two.makeCircle(100, 100, 10);
circle.fill = colours['mLight-Blue-500'];
//node.add(circle);

let text = new Two.Text('uplink-01', 100, 100, {
	family: 'monospace',
	size: 12,
	alignment: 'center',
	baseline: 'middle',
	fill: '#000'
});
//text.stroke = '#aaa';
//text.rotation;
//text.scale = 1;
node.add(text);

//console.log(JSON.stringify(Two.Text.Properties, null, "\t"));

two.add(node)
two.update();
