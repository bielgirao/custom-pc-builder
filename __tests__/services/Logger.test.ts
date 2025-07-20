import { Logger } from '../../src/services/Logger';
import chalk from "chalk";

describe('Logger', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe('blank()', () => {
    it('should print exactly one empty line', () => {
      Logger.blank();
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith();
    });
  });

  describe('success()', () => {
    it('should log a success message with the correct style and icon', () => {
      const message = 'Operation completed successfully';
      Logger.success(message);

      const expected = chalk.green.bold(`✔ → ${message}`);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(expected);
    });
  });

  describe('error()', () => {
    it('should log an error message with the correct style and icon', () => {
      const message = 'Operation failed';
      Logger.error(message);

      const expected = chalk.red.bold(`✖ → ${message}`);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(expected);
    });
  });

  describe('info()', () => {
    it('should log an info message with the correct style and icon', () => {
      const message = 'Informational message logged';
      Logger.info(message);

      const expected = chalk.gray.bold(`ℹ → ${message}`);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(expected);
    });
  });

  describe('heading()', () => {
    it('should log a heading message with the correct style and icon', () => {
      const message = 'Heading message logged';
      Logger.heading(message);

      const expected = chalk.magenta.bold.underline(`→ ${message}`);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(expected);
    });
  });

  describe('body()', () => {
    it('should log a body message with the correct style and icon', () => {
      const message = 'Body message logged';
      Logger.body(message);

      const expected = chalk.white(`— ${message}`);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith(expected);
    });
  });

});