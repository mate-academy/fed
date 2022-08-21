/* eslint-disable max-len */
/* eslint-disable no-console */
import chalk from "chalk";
import {FormatedError} from "../matelint.typedefs";

const Table = require("table-layout");

interface Report {
  path: string;
  errors: (null | FormatedError)[]
}

const printReport = (report: Report) => {
  if (report.errors.length === 0) {
    return;
  }

  console.log(chalk.underline(report.path));

  const errors = report.errors.map((report) => {
    if (!report) {
      return null;
    }

    const {
      massage, ruleId, startLine, startCol,
    } = report;

    return {
      positions: chalk.gray(`${startLine}:${startCol}`),
      level: chalk.red('error'),
      massage,
      details: chalk.gray(`(${ruleId})`),
    };
  });

  const table = new Table(errors, { noTrim: true });

  console.log(table.toString());
};

export const printReports = (reports: Report[]) => {
  console.log(chalk.yellow('\n--- Mate: html linter ---\n'));

  if (reports.length === 0) {
    console.log('html files not found\n');

    return;
  }

  const errorsCount = reports.reduce((acc, { errors }) => (
    acc + errors.length
  ), 0);

  if (errorsCount > 0) {
    reports.forEach(printReport);

    console.log(chalk.red(`${errorsCount} ${errorsCount > 1 ? 'errors' : 'error'}`));
    console.log(chalk.gray('https://mate-academy.github.io/fed/matelint/rules-description.html'));
  } else {
    console.log('✨✨ Your BEM is fine! ✨✨\n');
  }
};
