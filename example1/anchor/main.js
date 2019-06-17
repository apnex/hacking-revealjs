var el = document.getElementById("main");
let c = colours;
var two = new Two({
	fullscreen: true
});
two.appendTo(el);

// make node
function makeNode(input) {
	let base = new Two.Group();
	let handles = new Two.Group();
	let pos = {
		x: 0,
		y: 0
	};
	let opts = {
		x: input.x,
		y: input.y,
		w: 100,
		h: 100
	};

	// add box
	let box = new Two.RoundedRectangle(0, 0, opts.w, opts.h, 8);
	box.fill = colours['mLight-Green-300'];
	box.stroke = colours['mLight-Green-600'];
	box.linewidth = 10;
	box.id = 'box';
	base.add(box);

	// add text
	let text = new Two.Text(input.name, pos.x, pos.y, {
		family: 'monospace',
		size: 12,
		alignment: 'center',
		baseline: 'middle',
		fill: '#000'
	});
	base.add(text);

	// add empty handles
	[0,1,2,3].forEach((id) => {
		let handle = new Two.Group();
		handle.id = id.toString();
		base.add(handle);
	});

	// shift node to target location
	base.translation.set(opts.x, opts.y);
	two.add(base); // add to scene
	return base;
}

// updateGroup
function shiftGroup(group, offset) {
	// shift existing ports
	let num = 1;
	Object.values(group.children.ids).forEach((child) => {
		child.translation.addSelf(new Two.Vector((offset.x / 2), (offset.y / 2)));
		num++;
	});
	let pos = getCoords(num, offset, 0);

	// create new port
	//let port = two.makeCircle(pos.x, pos.y, 10);
	let port = new Two.RoundedRectangle(pos.x, pos.y, 20, 20, 5);
	port.fill = colours['mBlue-200'];
	port.stroke = colours['mBlue-500'];
	port.linewidth = 3;
	group.add(port);
	return port;
}

// build group translation recursion
function getPosition(group) {
	let pos = group.translation.clone();
	if(typeof group.parent.translation !== 'undefined') {
		pos.addSelf(getPosition(group.parent));
	}
	return pos;
}

// grid coord function
function getCoords(num, gap, inst) {
	return {
		x: (0 - (((num - 1) * gap.x) / 2)) + (inst * gap.x),
		y: (0 - (((num - 1) * gap.y) / 2)) + (inst * gap.y)
	}
}

// build link
function buildLink(list) {
	let vertices = [];
	list.forEach((port) => {
		vertices.push(getPosition(port));
	})
	let path = new Two.Path(vertices, false, false);
	path.stroke = colours['mRed-400'];
	path.linewidth = 4;
	path.noFill();
	two.add(path);
}

function newNode(input) {
	let self = {
		base: makeNode(input),
		pos: {
			x: 0,
			y: 0
		},
		opts: {
			w: 100,
			h: 100
		},
		update: function() {
			// iterate port groups and test size
			[0,1,2,3].forEach((id) => {
				let size = self.base.children.ids[id].getBoundingClientRect(false);
				if(self.opts.w < ((size.width - 1) + 20)) {
					self.opts.w = (size.width - 1) + 20;
				}
				if(self.opts.h < ((size.height - 1) + 20)) {
					self.opts.h = (size.height - 1) + 20;
				}
			});

			// lock box ratio
			if(self.opts.w < self.opts.h) {
				self.opts.w = self.opts.h
			} else {
				self.opts.h = self.opts.w
			}

			// translate handles
			self.top.base.group.translation.set(0, -(self.opts.h / 2));
			self.bottom.base.group.translation.set(0, (self.opts.h / 2));
			self.left.base.group.translation.set(-(self.opts.w / 2), 0);
			self.right.base.group.translation.set((self.opts.w / 2), 0);

			// resize box
			self.base.children.ids['box'].width = self.opts.w;
			self.base.children.ids['box'].height = self.opts.h;
		},
		top: {
			base: {
				num: 0,
				offset: { x:-25, y:0 }
			},
			add: function() {
				let group = shiftGroup(this.base.group, this.base.offset);
				self.update();
				return group;
			}
		},
		right: {
			base: {
				num: 0,
				offset: { x:0, y:-25 }
			},
			add: function() {
				let group = shiftGroup(this.base.group, this.base.offset);
				self.update();
				return group;
			}
		},
		bottom: {
			base: {
				num: 0,
				offset: { x:25, y:0 }
			},
			add: function() {
				let group = shiftGroup(this.base.group, this.base.offset);
				self.update();
				return group;
			}
		},
		left: {
			base: {
				num: 0,
				offset: { x:0, y:25 }
			},
			add: function() {
				let group = shiftGroup(this.base.group, this.base.offset);
				self.update();
				return group;
			}
		}
	};
	self.top.base.group = self.base.children.ids['0'];
	self.right.base.group = self.base.children.ids['1'];
	self.bottom.base.group = self.base.children.ids['2'];
	self.left.base.group = self.base.children.ids['3'];
	return self;
}

let prouter = newNode({
	name: 'cisco-tor',
	x: 500,
	y: 100
});
prouter.top.add();
let port1 = prouter.bottom.add();
prouter.right.add();
prouter.left.add();

let t0core = newNode({
	name: 't0-core',
	x: 300,
	y: 250
});
let port2 = t0core.top.add();
t0core.right.add();
t0core.left.add();

let t1tenant1 = newNode({
	name: 't1-tenant-a',
	x: 500,
	y: 400
});
t1tenant1.bottom.add();
t1tenant1.right.add();
t1tenant1.left.add();

t0core.bottom.add();
t0core.bottom.add();

// issue - links need to occur after placement - or include an update function to reposition links
buildLink([
	port1,
	port2
]);

buildLink([
	t0core.bottom.add(),
	t1tenant1.top.add()
]);


two.update();
