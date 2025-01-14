describe('Users Component', () => {
  console.log(`The current environment is ${process.env.NODE_ENV}`);

  const baseReactUrl = "http://localhost:3000"
  const baseApiUrl = "https://jsonplaceholder.typicode.com"

  before(() => {
    cy.fixture("users").then((data) => {
      this.data = data;
    })
  });

  beforeEach(() => {
    cy.visit(`${baseReactUrl}/users`);
  });

  it('should display list of users', () => {
    cy.intercept("GET", `${baseApiUrl}/users`, { statusCode: 200, body: this.data.users }).as("getData");
    cy.get('#loader').should('be.visible');
    cy.wait("@getData").then((interception) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      interception.response &&
        expect(interception.response.statusCode).to.equal(200);
    });
    cy.get('#loader').should('not.exist');
    cy.get("#pageTitle").should('be.visible').should('contain', 'Users Page');
    console.log(this.data.users)
    cy.get("#userList").children().should("have.length", this.data.users.length);
  });
});
