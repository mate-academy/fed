import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

addMatchImageSnapshotCommand({
  failureThreshold: 1.0,
  failureThresholdType: 'percent'
});
