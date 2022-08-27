import { Linter } from '../../lint/Linter';
import { RuleName } from '../Rules.typedefs';
import { parseHtml } from '../../lint/parseHtml';

describe(`test ${RuleName.closingBracketLocation} rule`, () => {
  describe('rule enabled', () => {
    let linter: Linter;

    beforeAll(() => {
      linter = new Linter({
        ignore: [],
        rules: {
          [RuleName.closingBracketLocation]: true,
        },
      });
    });

    it('should return 0 errors if code is correct', () => {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Title</title>
          </head>
          <body>
            <input type="text" translate="no">
          </body>
        </html>
      `;

      const node = parseHtml(html);

      const errors = linter.linter(node);

      expect(errors.length).toBe(0);
    });

    it('should return error', () => {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Title</title>
          </head>
          <body>
          <input type="text" translate="no">
            </body>
        </html>
      `;

      const node = parseHtml(html);

      const errors = linter.linter(node);

      expect(errors.length).toBe(1);
      expect(errors[0]?.id).toBe(RuleName.closingBracketLocation);
      expect(errors[0]?.node.nodeName).toBe('body');
    });

    it('should return errors', () => {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
          <body>
            <input type="text" translate="no"
        >
           </body>
        </html>
      `;

      const node = parseHtml(html);

      const errors = linter.linter(node);

      expect(errors.length).toBe(3);
      errors.forEach((error) => {
        expect(error?.id).toBe(RuleName.closingBracketLocation);
      });
    });
  });

  describe('rule disabled', () => {
    it('should not return errors if rule disabled', () => {
      const linter = new Linter({
        ignore: [],
        rules: {
          [RuleName.closingBracketLocation]: false,
        },
      });

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

      expect(errors.length).toBe(0);
    });
  });
});
