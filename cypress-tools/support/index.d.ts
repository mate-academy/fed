export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getByDataCy(selector: string): Chainable<JQuery>;
    }
  }
}