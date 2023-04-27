describe("open modal with ingredient", () => {
  before(() => {
    cy.viewport(1400, 1200);
    cy.visit("http://localhost:3000");
  });

  it("open modal with ingredient", () => {
    cy.get("[class^=ingredient-item_container__]").first().click();
    cy.contains("Детали ингредиента");
    cy.get("[class^=modal_buttonClose__]").click();
    cy.contains("Детали ингредиента").should("not.exist");
  });
});
