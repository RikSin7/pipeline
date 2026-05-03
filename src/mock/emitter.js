export class EventEmitter {
  constructor(events, onEmit, speed = 1) {
    this.events = [...events].sort((a, b) => a.timestamp - b.timestamp);
    this.onEmit = onEmit;
    this.timeouts = [];
    this.isPlaying = false;
    this.speed = speed;
  }

  play() {
    this.stop();
    this.isPlaying = true;

    if (!this.events || this.events.length === 0) return;

    const baseTime = this.events[0].timestamp; 

    this.events.forEach((event) => {
      const rawDelay = event.timestamp - baseTime;
      const delay = rawDelay / this.speed; 

      const id = setTimeout(() => {
        if (this.isPlaying) {
          this.onEmit(event); 
        }
      }, delay);

      this.timeouts.push(id);
    });
  }

  stop() {
    this.isPlaying = false;
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }
}