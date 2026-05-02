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

    const baseTime = this.events[0].timestamp; //the first event in the array

    this.events.forEach((event) => {
      const rawDelay = event.timestamp - baseTime;

      const normalizedDelay = rawDelay / this.speed; //speed is used to control the speed of the events
      const delay = normalizedDelay > 1200 ? 1200 : normalizedDelay; //delay is used to control the delay of the events

      const id = setTimeout(() => {
        if (this.isPlaying) {
          this.onEmit(event); //onEmit = dispatch; Each event is sent to reducer
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