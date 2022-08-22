import { findHtmlFiles } from './fs/findHtmlFiles';
import { lint } from './lint';
import config from './config';
import { formatError } from './printReports/formatError';
import { printReports } from './printReports/printReports';

export const htmlLint = (startPath: string) => {
  const htmlFiles = findHtmlFiles(startPath);

  const reports = lint(htmlFiles, config);

  const formatReports = reports.map(({ path, errors }) => ({
    path,
    errors: errors.map((error) => error && formatError(error)),
  }));

  printReports(formatReports);

  const errorsCount = reports.some(({ errors }) => (
    errors.length > 0
  ));

  if (errorsCount) {
    process.exit(1);
  } else {
    process.exit(0);
  }
};
