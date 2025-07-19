import chalk, { ChalkInstance } from "chalk";

type LogLevel = 'success' | 'error' | 'info';

const ICONS: Record<LogLevel, string> = {
  success: '✔ →',
  error: '✖ →',
  info: 'ℹ →',
  body: '—',
  heading: '→'
}

const STYLES: Record<LogLevel, ChalkInstance> = {
  success: chalk.green.bold,
  error: chalk.red.bold,
  info: chalk.gray.bold,
  body: chalk.white,
  heading: chalk.magenta.bold.underline
}

export class Logger {
  static blank(): void {
    console.log();
  }

  private static log(level: LogLevel, message: string): void {
    const style: ChalkInstance = STYLES[level];
    const icon: string = ICONS[level];
    console.log(style(`${icon} ${message}`));
  }

  static success(message: string): void {
    this.log('success', message);
  }

  static error(message: string): void {
    this.log('error', message);
  }

  static info(message: string): void {
    this.log('info', message);
  }

  static heading(message: string): void {
    this.log('heading', message);
  }

  static body(message: string): void {
    this.log('body', message);
  }
}