describe('Header test suite', () => {

  /**
   * Visits the homepage before each test
   */
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  /**
   * Tests that the correct message is displayed above the header.
   *
   * This test ensures that:
   * - The message above the header contains the text 'Your'.
   */
  it('Displays the correct message above the header', () => {
    cy.contains('Your wardrobe in your hands');
  });

  /**
   * Tests that the website logo is displayed correctly.
   *
   * This test ensures that:
   * - The header contains the logo text 'dresshub'.
   * - The logo image exists and is visible.
   */
  it('Displays the logo of the website', () => {
    cy.get('h1').contains('dresshub');
    cy.get('.logo__img').should('exist').and('be.visible');
  });

  /**
   * Tests that the 'add garment' button is displayed correctly.
   *
   * This test ensures that:
   * - The 'add garment' button is present and visible.
   */
  it("Displays the 'add garment' button", () => {
    cy.get('.add-garment-button__icon').should('exist').and('be.visible');
  });

});
