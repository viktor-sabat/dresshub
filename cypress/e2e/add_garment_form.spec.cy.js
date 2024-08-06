describe('Add garment form test suite', () => {
  /**
   * Visits the homepage before each test
   */
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  /**
   * Tests that the add garment form displays all required elements correctly.
   *
   * This test ensures that:
   * - The button to open the add garment form is present and visible.
   * - The add garment form appears and contains all necessary fields and buttons.
   * - The form fields for Brand, Garment, and Photo Link are present and visible.
   * - The dropdown for selecting garment type contains the correct options.
   * - The submit button is present and correctly labeled.
   */
  it("Displays the forms for adding a new garment correctly", () => {
    // Check if the button to open the add garment form is present, visible, and can be clicked
    cy.get('.add-garment-button__icon').should('exist').and('be.visible').click();

    // Check if the 'Add Garment' form is present and visible
    cy.get('.add-garment-form').should('exist').and('be.visible');

    // Check if the form header and title are present and visible
    cy.get('.form-header').should('exist').and('be.visible');
    cy.get('.form__title').should('exist').and('be.visible').and('contain', 'Add new garment to your wardrobe');

    // Check if each form field is present and visible
    cy.get('.form__field').each(($el) => {
      cy.wrap($el).should('exist').and('be.visible');
    });

    // Check if the 'Brand' label and input field are present and visible
    cy.get('.form__label').contains('Brand').should('exist').and('be.visible');
    cy.get('.form__input.form__brand').should('exist').and('be.visible');

    // Check if the 'Garment' label and input field are present and visible
    cy.get('.form__label').contains('Garment').should('exist').and('be.visible');
    cy.get('.form__input.form__garment').should('exist').and('be.visible');

    // Check if the 'Photo Link' label and input field are present and visible
    cy.get('.form__label').contains('Photo Link').should('exist').and('be.visible');
    cy.get('.form__input.form__photo-link').should('exist').and('be.visible');

    // Check if the 'Type' dropdown is present, visible, and contains the correct number of options
    cy.get('.form__select.form__type').should('exist').and('be.visible');
    cy.get('.form__select.form__type option').should('have.length', 6);

    // Check if the submit button is present, visible, and correctly labeled
    cy.get('.form__submit').should('exist').and('be.visible').and('contain', 'Add Garment');

    // Check if the 'Close' button and its logo are present and visible
    // Click the 'Close' button button to close the form
    cy.get('.form__close').should('exist').and('be.visible');
    cy.get('.form__close-logo').should('exist').and('be.visible').click();

    // Make sure that the 'Add Garment' form is not visible after submission
    cy.get('.add-garment-form').should('not.be.visible');
  });
});
