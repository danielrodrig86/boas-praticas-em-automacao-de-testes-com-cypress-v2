describe('Dependent tests bad practice', () => {
  beforeEach(() => {
    cy.visit('http://notes-serverless-app.com')

    cy.get('.navbar-nav a:contains(Login)').click()

    cy.get('#email').type('daniel.rodrigues1998@live.com')
    cy.get('#password').type('D@n12345.')
    cy.get('button[type="submit"]').click()
    
    cy.contains('h1', 'Your Notes').should('be.visible')
  })

  it('creates a note', () => {
    cy.contains('Create a new note').click()

    cy.get('#content').type('My note')
    cy.contains('Create').click()

    cy.get('.list-group').should('contain', 'My note')
  })

  it('edits a note', () => {
    cy.get('.list-group').contains('My note').click()
    cy.get('#content').type(' updated')
    cy.contains('Save').click()

    cy.get('.list-group').should('contain', 'My note updated')
    cy.get('.list-group:contains(My note updated)').should('be.visible')
  })

  it('deletes a note', () => {
    cy.get('.list-group').contains('My note updated').click()
    cy.contains('Delete').click()

    cy.get('.list-group:contains(My note updated)').should('not.exist')
  })
})
