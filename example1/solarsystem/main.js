console.log('moo');
var el = document.getElementById("main");
var two = new Two({
	fullscreen: true
});
two.appendTo(el);

//var circle = two.makeCircle(110, 110, 100);
//circle.fill = colours['mLight-Blue-500'];

function getPositions(angle, orbit) {
	return {
		x: Math.cos(angle * Math.PI / 180) * orbit,
		y: Math.sin(angle * Math.PI / 180) * orbit
	};
}

var earthAngle = 0,
	moonAngle  = 0,
	distance   = 30,
	radius     = 50,
	padding    = 100,
	orbit      = 200,
	offset     = orbit + padding,
	orbits     = two.makeGroup();

var earthOrbit = two.makeCircle(offset, offset, orbit);
earthOrbit.noFill();
earthOrbit.linewidth = 4;
earthOrbit.stroke = "#ccc";
orbits.add(earthOrbit);

var pos = getPositions(earthAngle++, orbit);
var earth = two.makeCircle(pos.x + offset, pos.y + offset, radius);
earth.stroke = "#123456";
earth.linewidth = 4;
earth.fill = "#194878";

var moonOrbit = two.makeCircle(earth.translation.x, earth.translation.y, radius + distance);
moonOrbit.noFill();
moonOrbit.linewidth = 4;
moonOrbit.stroke = "#ccc";
orbits.add(moonOrbit);

var pos = getPositions(moonAngle, radius + distance);
var moon = two.makeCircle(earth.translation.x + pos.x, earth.translation.y + pos.y, radius / 4);
moon.fill = "#474747";
orbits.visible = false;

two.bind("update", function (frameCount) {
	let earthPos = getPositions(earthAngle++, orbit);
	earth.translation.x = earthPos.x + offset;
	earth.translation.y = earthPos.y + offset;

	let moonPos = getPositions(moonAngle, radius + distance);
	moon.translation.x = earth.translation.x + moonPos.x;
	moon.translation.y = earth.translation.y + moonPos.y;
	moonAngle += 5;
	moonOrbit.translation.x = earth.translation.x;
	moonOrbit.translation.y = earth.translation.y;
});
two.play();

two.update();
