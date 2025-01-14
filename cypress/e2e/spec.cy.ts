describe('Users Component', () => {
  const { NODE_ENV } = process.env;

  console.log(`The current environment is ${NODE_ENV}`);
  
  let baseURL = "http://localhost"
  if (NODE_ENV?.toUpperCase() === "PRODUCTION") baseURL += ":8000"
  if (NODE_ENV?.toUpperCase() === "DEVELOPMENT") baseURL += ":3000"

  before(() => {
    cy.fixture("users").then((data) => {
      this.data = data;
    })
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/users');
  });

  it('should display list of users', () => {
    cy.intercept("GET", `https://jsonplaceholder.typicode.com/users`, { statusCode: 200, body: this.data.users }).as("getData");
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
