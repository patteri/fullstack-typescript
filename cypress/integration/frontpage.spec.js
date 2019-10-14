context("Frontpage", () => {
  beforeEach(() => {
    cy.task("truncate-db");
  });

  it("Frontpage renders", () => {
    cy.visit("http://localhost:3000/");
    cy.get(".App-title").contains("Welcome to React");
  });

  it("Add and remove an item", () => {
    cy.visit("http://localhost:3000/");
    cy.get("table.item-table tbody tr td span").contains("No items");

    // Add two items
    cy.get("form").within(() => {
      cy.get('input[name="name"]').type("New item");
      cy.get('input[name="value"]').type("The value");
      cy.root().submit();
    });
    cy.get("form").within(() => {
      cy.get('input[name="name"]').type("New item 2");
      cy.get('input[name="value"]').type("The value 2");
      cy.root().submit();
    });
    cy.get("table.item-table tbody tr").should($tr => {
      expect($tr).to.have.length(2);
    });

    // Delete first item
    cy.get("table.item-table tbody tr:first button").click();

    cy.get("table.item-table tbody tr").should($tr => {
      expect($tr).to.have.length(1);
    });

    cy.get("table.item-table tbody tr td:first").contains("New item 2");
  });
});
