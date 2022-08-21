import { Linter } from '../../lint/Linter';
import { RuleName } from '../Rules.typedefs';
import { parseHtml } from '../../lint/parseHtml';

describe('test closing-and-opening-on-seme-level rule', () => {
  let linter: Linter;

  beforeAll(() => {
    linter = new Linter({
      ignore: [],
      rules: {
        [RuleName.closingAndOpeningOnSemeLevel]: true,
      },
    });
  });

  it('should return 0 errors if code is correct', () => {
    const html = '<!DOCTYPE html>\n'
      + '<html lang="en">\n'
      + '  <head>\n'
      + '    <meta charset="UTF-8">\n'
      + '    <title>Title</title>\n'
      + '  </head>\n'
      + '  <body>\n'
      + '    <input type="text" translate="no">\n'
      + '  </body>\n'
      + '</html>\n';

    const node = parseHtml(html);

    const errors = linter.linter(node);

    expect(errors.length).toBe(0);
  });

  it('should return error', () => {
    const html = '<!DOCTYPE html>\n'
      + '<html lang="en">\n'
      + '  <head>\n'
      + '    <meta charset="UTF-8">\n'
      + '    <title>Title</title>\n'
      + '  </head>\n'
      + '  <body>\n'
      + '  <input type="text" translate="no">\n'
      + '   </body>\n'
      + '</html>\n';

    const node = parseHtml(html);

    const errors = linter.linter(node);

    expect(errors.length).toBe(1);
    expect(errors[0]?.id).toBe(RuleName.closingAndOpeningOnSemeLevel);
    expect(errors[0]?.node.nodeName).toBe('body');
    expect(errors[0]?.node.sourceCodeLocation?.startLine).toBe(7);
    expect(errors[0]?.node.sourceCodeLocation?.startCol).toBe(3);
  });

  it('should return errors', () => {
    const html = '<!DOCTYPE html>\n'
      + '<html lang="en">\n'
      + '  <head>\n'
      + '    <meta charset="UTF-8">\n'
      + '    <title>Title</title>\n'
      + '</head>\n'
      + '  <body>\n'
      + '    <input\n'
      + '         type="text" translate="no"\n'
      + '   >\n'
      + '   </body>\n'
      + '</html>\n';

    const node = parseHtml(html);

    const errors = linter.linter(node);

    expect(errors.length).toBe(3);
    errors.forEach((error) => {
      expect(error?.id).toBe(RuleName.closingAndOpeningOnSemeLevel);
    });
  });
});
