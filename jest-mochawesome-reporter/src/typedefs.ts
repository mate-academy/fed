export interface JestMochawesomeReporterOptions {
  outputDir?: string;
  outputName?: string;
  createDirIfMissing?: boolean;
}

export interface ErrorLog {
  message: string;
  estack: string;
}

export interface Test {
  title: string;
  fullTitle: string;
  timedOut: boolean;
  duration: number;
  pass: boolean;
  fail: boolean;
  pending: boolean;
  code: string;
  uuid: string;
  parentUUID: string;
  skipped: boolean;
  isHook: boolean;
  err: ErrorLog | Record<string, never>;
}

export interface Suite {
  title: string;
  suites: Suite[];
  tests: Test[];
  pending: string[];
  root: boolean;
  uuid: string;
  _timeout: number;
  fullFile: string;
  file: string;
  beforeHooks: any[];
  afterHooks: any[];
  passes: string[];
  failures: string[];
  skipped: string[];
  duration: number;
}

export interface Report {
  stats: {
    suites: number;
    tests: number;
    testsRegistered: number;
    passes: number;
    pending: number;
    failures: number;
    start: Date;
    end: Date;
    duration: number;
    passPercent: number;
    pendingPercent: number;
    other: number;
    hasOther: boolean;
    skipped: number;
    hasSkipped: boolean;
  };
  results: Suite[];
}
