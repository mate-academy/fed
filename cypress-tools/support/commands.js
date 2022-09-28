Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add(
  'byDataCy',
  { prevSubject: 'optional' },

  (subject, name) => {
    const selector = `[data-cy="${name}"]`;

    return subject
      ? subject.find(selector)
      : cy.get(selector);
  },
);
