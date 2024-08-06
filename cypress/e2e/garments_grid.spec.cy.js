describe('Garments grid test suite', () => {

  /**
   * Visits the homepage before each test
   */
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  /**
   * Tests that the delete button appears on hover and hides on mouse leave.
   *
   * This test ensures that:
   * - The delete button is initially hidden.
   * - The delete button appears when the garment is hovered over.
   * - The delete button hides when the mouse leaves the garment.
   */
  it('Shows button on hover and hides on mouse leave', () => {
    // Find the garment card containing 'Falconeri', scroll it into view, and hover over it
    cy.get('.garment').contains('Falconeri')
      .closest('.garment')
      .scrollIntoView()
      .trigger('mouseenter')
      .find('.button__delete-logo')
      .should('be.visible');

    // Trigger mouse leave to hide the delete button
    cy.get('.garment').contains('Falconeri')
      .closest('.garment')
      .scrollIntoView()
      .trigger('mouseleave')
      .find('.button__delete-logo')
      .should('not.be.visible');
  });

  /**
   * Tests that a new garment with type 'socks' can be added while the 'socks' filter is selected.
   *
   * This test ensures that:
   * - The socks filter can be selected.
   * - The add garment form can be opened and filled out.
   * - A new garment with the brand 'New Balance' and type 'socks' can be added.
   * - The newly added garment is visible in the grid.
   */
  it("Adds a new garment with a type 'socks' while the same filter is selected", () => {
    // Select the socks filter
    cy.get('.filters__socks').click();

    // Open the add garment form
    cy.get('.add-garment-button__icon').should('exist').and('be.visible').click();
    cy.get('.add-garment-form').should('exist').and('be.visible');

    // Fill out the form with new garment details
    cy.get('.form__input.form__brand').type('New Balance');
    cy.get('.form__input.form__garment').type('Socks');
    cy.get('.form__input.form__photo-link').type('https://img01.ztat.net/article/spp-media-p1/0ee67e0c5e85498ca31a863716031207/5a3997b890a440989c50233a927e6418.jpg?imwidth=500&filter=packshot');
    cy.get('.form__select').select('socks');
    cy.get('.form__submit').click();

    // Verify the newly added garment is visible in the grid
    cy.get('.garment__brand').contains('New Balance')
      .closest('.garment')
      .within(() => {
        cy.get('.garment__img').should('be.visible');
        cy.get('.garment__name').contains('Socks');
      });
  });

  /**
   * Tests that a garment can be deleted.
   *
   * This test ensures that:
   * - The garment with the brand 'Happy Socks' can be found.
   * - The delete button is visible when the garment is hovered over.
   * - The garment can be deleted.
   * - The deleted garment is no longer visible in the grid.
   */
  it("Deletes the Happy Socks pair of socks", () => {
    // Find and delete the garment with brand 'Happy Socks'
    cy.get('.garment__brand').contains('Happy Socks')
      .closest('.garment')
      .scrollIntoView()
      .trigger('mouseenter')
      .find('.garment__delete')
      .should('be.visible')
      .click();

    // Verify the garment is no longer in the grid
    cy.get('.garment__brand').contains('Happy Socks')
      .should('not.exist');
  });

});
