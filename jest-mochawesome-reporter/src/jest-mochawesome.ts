// based on https://gist.github.com/dopry/691e6b21170b55c41768d02dc059c48b

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  AggregatedResult,
  BaseReporter,
  Config,
  TestResult,
} from '@jest/reporters';
import { AssertionResult } from '@jest/test-result';
import { 
  ErrorLog, 
  JestMochawesomeReporterOptions, 
  Suite, 
  Test,
  Report,
} from './typedefs';

export default class JestMochawesomeReporter extends BaseReporter {
  private readonly globalConfig: Config.GlobalConfig;

  private readonly options: Required<
    JestMochawesomeReporterOptions
  >;

  constructor(
    globalConfig: Config.GlobalConfig,
    options?: JestMochawesomeReporterOptions,
  ) {
    super();

    this.globalConfig = globalConfig;
    this.options = {
      outputDir: this.globalConfig.rootDir,
      createDirIfMissing: false,
      outputName: 'jest-mochawesome',
      ...options,
    };
  }

  onRunComplete(
    _?: any,
    results?: AggregatedResult,
  ): void {
    if (!results) {
      return;
    }

    const report = this.buildReport(results);

    this.writeReport(report);
  }

  private writeReport(report: Report): void {
    const {
      outputDir,
      outputName,
      createDirIfMissing,
    } = this.options;

    this.writeOutput(
      report,
      `${outputDir}/${outputName}.json`,
      createDirIfMissing,
    );
  }

  private buildElapsedTime(suites: TestResult[]): number {
    return suites.reduce((sum, suite) => (
      sum + suite.testResults.reduce((_sum, _test) => (
        _sum + (_test.duration ?? 0)
      ), 0)
    ), 0);
  }

  private writeOutput(
    payload: Report,
    filepath: string,
    createDirIfMissing: boolean,
  ): void {
    const json = JSON.stringify(payload);

    if (createDirIfMissing) {
      const dir = path.dirname(filepath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    fs.writeFile(filepath, json, 'utf8', (err) => {
      if (err) {
        throw err;
      }

      console.log(`Test results written to ${filepath}`);
    });
  }

  private getFullTitle(test: AssertionResult): string {
    const ancestors = test.ancestorTitles
      .reduce((sum, val) => `${sum} + ${val} > `, '');

    return ancestors + test.title;
  }

  private isPending(test: AssertionResult): boolean {
    return test.status === 'pending';
  }

  private isPassed(test: AssertionResult): boolean {
    return test.status === 'passed';
  }

  private isFailed(test: AssertionResult): boolean {
    return test.status === 'failed';
  }

  private createTest(
    test: AssertionResult,
    parentId: string,
  ): Test {
    const pass = this.isPassed(test);
    const fail = this.isFailed(test);
    const pending = this.isPending(test);

    return {
      title: this.getFullTitle(test),
      fullTitle: test.fullName,
      timedOut: false,
      duration: test.duration || 0,
      pass,
      fail,
      pending,
      code: '',
      uuid: uuidv4(),
      parentUUID: parentId,
      skipped: false,
      isHook: false,
      err: (
        fail
          ? this.getErrorLogForTest(test)
          : {}
      ),
    };
  }

  private removeANSIEscapeCodes(input: string): string {
    // eslint-disable-next-line no-control-regex
    const ansiEscapeCodes = /\x1B\[[0-9;]*[A-Za-z]/g;

    return input.replace(ansiEscapeCodes, '');
  }

  private getErrorLogForTest(test: AssertionResult): ErrorLog {
    const errorLog = {
      message: 'Test failed (click to view stacktrace)',
      estack: '',
    };

    if (test.failureMessages && test.failureMessages.length > 0) {
      errorLog.estack = this.removeANSIEscapeCodes(test.failureMessages[0]);
    }

    return errorLog;
  }

  private createSuite(suite: TestResult): Suite {
    const id = uuidv4();
    const tests = suite.testResults.map(
      (test) => this.createTest(test, id),
    );

    const {
      passes,
      failures,
      pending,
    } = tests.reduce((sum, test) => {
      if (test.pass) {
        sum.passes.push(test.uuid);
      } else if (test.fail) {
        sum.failures.push(test.uuid);
      } else if (test.pending) {
        sum.pending.push(test.uuid);
      }

      return sum;
    }, {
      passes: [] as string[],
      failures: [] as string[],
      pending: [] as string[],
    });

    return {
      title: suite.testResults[0].ancestorTitles[0],
      suites: [],
      tests,
      pending,
      root: false,
      uuid: id,
      _timeout: 5000,
      fullFile: suite.testFilePath,
      file: suite.testFilePath.split('/').pop() || '',
      beforeHooks: [],
      afterHooks: [],
      passes,
      failures,
      skipped: [],
      duration: suite.perfStats.end - suite.perfStats.start,
    };
  }

  private buildReport(testResults: AggregatedResult): Report {
    const elapsed = this.buildElapsedTime(testResults.testResults);
    const testSuites = testResults.testResults.map((suite) => (
      this.createSuite(suite)
    ));

    return {
      stats: {
        suites: testResults.numTotalTestSuites,
        tests: testResults.numTotalTests,
        testsRegistered: testResults.numTotalTests,
        passes: testResults.numPassedTests,
        pending: testResults.numPendingTests,
        failures: testResults.numFailedTests,
        start: new Date(testResults.startTime),
        end: new Date(testResults.startTime + elapsed),
        duration: elapsed,
        passPercent: (
          (testResults.numPassedTests / testResults.numTotalTests) * 100
        ),
        pendingPercent: (
          (testResults.numPendingTests / testResults.numTotalTests) * 100
        ),
        other: 0,
        hasOther: false,
        skipped: 0,
        hasSkipped: false,
      },
      results: testSuites,
    };
  }
}
