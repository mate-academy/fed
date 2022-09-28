export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getByDataCy(selector: string): Chainable<JQuery>;
      byDataCy(name: string): Chainable<JQuery>;
    }
  }
}
