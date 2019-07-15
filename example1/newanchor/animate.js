function animate(path) {
	let self = this;
	if(path) { // isDefined
		this.orig = path;
		this.pathLength = path.getTotalLength();
		this.length;
		this.timer;
		this.state = {
			fps: 120,
			dur: 2000
		}
		this.state.int = 1000 / this.state.fps;
		this.state.distpnt = this.pathLength / this.state.dur;
		this.state.distint = this.state.distpnt * this.state.int;
		console.log('length: ' + this.pathLength + ' duration: ' + this.state.dur + ' distance: ' + this.state.distint);

		this.startDrawingPath = function() {
			self.length = 0;
			self.timer = setInterval(self.increaseLength, self.state.int);
			console.log('start timer: ' + self.orig.id);
		};
		this.increaseLength = function() {
			self.length += self.state.distint;
			self.orig.style.strokeDasharray = [self.length, self.pathLength].join(' ');
			if(self.length >= self.pathLength) {
				console.log('end timer: ' + self.orig.id);
				clearInterval(self.timer);
			}
		};
		this.stopDrawingPath = function() {
			console.log('stop line');
			clearInterval(self.timer);
			self.orig.style.stroke = '';
			self.orig.style.strokeDasharray = '';
		};
	}
	return this;
}




