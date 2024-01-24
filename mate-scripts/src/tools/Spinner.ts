export class Spinner {
  constructor(
    private readonly chars = '/-\\|',
    private current = 0,
    private interval: NodeJS.Timeout | null = null,
  ) {}

  start() {
    process.stdout.write('\x1B[?25l'); // Hide cursor
    this.interval = setInterval(() => {
      process.stdout.write(`\r${this.chars[this.current]}`);

      this.current = (this.current + 1) % this.chars.length;
    }, 500);
  }

  stop() {
    if (!this.interval) {
      return;
    }

    clearInterval(this.interval);

    process.stdout.write('\r \r');
    process.stdout.write('\x1B[?25h');
  }
}
