import Chance from 'chance'
const chance = new Chance()

describe('authentification', () => {
    const name = chance.name();
    const email = chance.email();
    const password = 'ValidPassword@123';
    it("sign in",()=> {
        cy.visit('http://localhost:5000/registerScreen');
        cy.contains("Create an Account");
        cy.get('input[name=name]').type(name);
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);
        cy.get('input[name=passwordCheck]').type(password);
        cy.screenshot("sign_in_form");
        cy.get('input[type=submit]').click();
        cy.url().should('include','dashboard');
        cy.screenshot("sign_in_success");
    });
    it("log in",()=> {
        cy.visit('http://localhost:5000/');
        cy.contains("Log In");
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);
        cy.screenshot("log_in_form");
        cy.get('input[type=submit]').click();
        cy.url().should('include','dashboard');
        cy.screenshot("log_in_success");

    })
})