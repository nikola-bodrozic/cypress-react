describe("Users Component", () => {
  console.log(`The current environment is ${process.env.NODE_ENV}`);

  // baseUrl is set in cypress/cypress.config.js

  // this endpoint will be mocked with data from fixtures
  const baseApiUrl = "https://jsonplaceholder.typicode.com/users";

  let users;
  before(() => {
    cy.fixture("mockData").then((usersData) => {
      users = usersData.users;
    });
  });

  beforeEach(() => {
    cy.visit("/users");
  });

  it("should display list of users", () => {
    cy.intercept("GET", baseApiUrl, { statusCode: 200, body: users }).as("getData");
    cy.get("#loader").should("be.visible");
    cy.wait("@getData")
    cy.get('#loader').should('not.exist');
    cy.get("#pageTitle").should('be.visible').should('contain', 'Users Page');
    cy.get("#userList").children().should("have.length", users.length);
    cy.get("#userList").children().first('h3 a').contains("Aurélie Dupont")
    cy.get("#userList").children().first('h3 a').contains(users[0].name)
  });
});