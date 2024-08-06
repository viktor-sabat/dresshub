describe('Filtering test suite', () => {

  /**
   * Visits the homepage before each test
   */
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  /**
   * Tests that all filter buttons are displayed correctly.
   *
   * This test ensures that:
   * - The filter buttons for 'All', 'Tops', 'Bottoms', 'Socks', 'Hats', 'Outwear', and 'Footwear' are present and visible.
   */
  it('Displays the filter buttons', () => {
    // Check if the filter buttons are present and contain the correct text
    cy.get('.filters__button').contains('All').should('be.visible');
    cy.get('.filters__button').contains('Tops').should('be.visible');
    cy.get('.filters__button').contains('Bottoms').should('be.visible');
    cy.get('.filters__button').contains('Socks').should('be.visible');
    cy.get('.filters__button').contains('Hats').should('be.visible');
    cy.get('.filters__button').contains('Outwear').should('be.visible');
    cy.get('.filters__button').contains('Footwear').should('be.visible');
  });

  /**
   * Tests that the 'All' filter is active by default.
   *
   * This test ensures that:
   * - The 'All' filter button is activated by default when the page loads.
   */
  it("Displays the 'All' filter as the default one", () => {
    // Check if the 'All' filter button is active by default
    cy.get('.filters__button.active').contains('All').should('be.visible');
  });

  /**
   * Tests that the 'All' filter is deactivated when another filter is selected.
   *
   * This test ensures that:
   * - Clicking on another filter (e.g., 'Tops') activates the selected filter.
   * - The 'All' filter button is deactivated after another filter is selected.
   */
  it("Deactivates the 'All' filter after another one has been selected", () => {
    // Click on the 'Tops' filter button
    cy.get('.filters__button').contains('Tops').click();

    // Check if the 'Tops' filter button is active
    cy.get('.filters__button.active').contains('Tops').should('be.visible');

    // Check if the 'All' filter button is no longer active
    cy.get('.filters__button.active').should('not.contain', 'All');
  });

});
