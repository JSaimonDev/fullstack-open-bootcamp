describe('Blog App', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/test/reset')
        cy.visit('http://localhost:3000')
        const user = {
            name: 'Test User',
            username: 'testuser',
            password: 'testpassword'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
    })

    it('Login form is shown', function(){
        cy.contains('login')
    }
    )

    describe('Login', function(){
        it('succeds with correct username and password', function(){
            cy.get('#username-input').type('testuser')
            cy.get('#password-input').type('testpassword')
            cy.get('#login-button').click()
            cy.contains('testuser logged in')
        })
        it('fails with wrong username and password', function(){
            cy.get('#username-input').type('wrongusername')
            cy.get('#password-input').type('wrongpassword')
            cy.get('#login-button').click()
            cy.contains('Wrong credentials')
        })
    })

    describe('When logged in', function(){
        beforeEach(function(){
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'testuser',
                password: 'testpassword'
            }).then(response => {
                localStorage.setItem('logged user', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })
        it('A blog can be created', function(){
            cy.contains('new blog').click()
            cy.get('#title-input').type('test title')
            cy.get('#author-input').type('test author')
            cy.get('#url-input').type('test url')
            cy.get('#create-blog-button').click()
            cy.contains('button', 'Show blog').click()
            cy.contains('test title')
            cy.contains('test author')
        })

        it('A blog can be liked', function(){
            cy.contains('new blog').click()
            cy.get('#title-input').type('test title')
            cy.get('#author-input').type('test author')
            cy.get('#url-input').type('test url')
            cy.get('#create-blog-button').click()
            cy.contains('button', 'Show blog').click()
            cy.contains('button', 'Show details').click()
            cy.contains('button', 'like').click()
            cy.contains('1')
        })

        it('A blog can be deleted by the user who created it', function(){
            cy.contains('new blog').click()
            cy.get('#title-input').type('test title')
            cy.get('#author-input').type('test author')
            cy.get('#url-input').type('test url')
            cy.get('#create-blog-button').click()
            cy.contains('button', 'Show blog').click()
            cy.contains('button', 'Delete').click()
            cy.should('not.contain', 'test title')
            cy.should('not.contain', 'test author')
})
})})