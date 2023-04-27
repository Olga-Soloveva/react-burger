describe("creating an order", () => {
  before(() => {
    let email = "testcypress@ya.ru";
    let password = "qwerty123";
    cy.intercept("POST", "**/orders").as("postOrder");
    cy.viewport(1400, 1200);
    cy.visit("http://localhost:3000/login");
    cy.get("input[type=email]").type(`${email}{enter}`);
    cy.get("input[type=password]").type(`${password}{enter}`);
  });

  it("drag and drop ingredients and create an order", () => {
    cy.contains("Соберите бургер");
    cy.get("[class^=burger-constructor_section_container__]").as("constructor");
    const dataTransfer = new DataTransfer();
    cy.get("[class^=ingredient-item_container__]")
      .first()
      .trigger("dragstart", {
        dataTransfer,
      });
    cy.get("@constructor").trigger("drop", {
      dataTransfer,
    });
    cy.get("[class^=ingredient-item_container__]").last().trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@constructor").trigger("drop", {
      dataTransfer,
    });
    cy.get("button").contains("Оформить заказ").click();
    cy.contains("Ожидайте номер заказа");
    cy.wait("@postOrder");
    cy.contains("идентификатор заказа");
    cy.get("[class^=modal_buttonClose__]").click();
    cy.contains("Перетащите в это поле ингридиенты из меню слева.");
  });
});
