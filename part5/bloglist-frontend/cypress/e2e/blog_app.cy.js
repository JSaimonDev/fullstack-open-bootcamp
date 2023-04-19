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
        it('A blog cannot be deleted by a user who did not create it', function(){
            cy.contains('new blog').click()
            cy.get('#title-input').type('test title')
            cy.get('#author-input').type('test author')
            cy.get('#url-input').type('test url')
            cy.get('#create-blog-button').click()
            cy.contains('button', 'Logout').click()
            const user = {
                name: 'Test User 2',
                username: 'testuser2',
                password: 'testpassword2'
            }
            cy.request('POST', 'http://localhost:3003/api/users', user)
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'testuser2',
                password: 'testpassword2'
            }).then(response => {
                localStorage.setItem('logged user', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
            cy.contains('button', 'Show blog').click()
            cy.contains('button', 'Delete').click()
            cy.contains('test title')
        })
        it.only('Blogs are ordered by likes', function(){
            cy.contains('new blog').click()
            cy.get('#title-input').type('test title')
            cy.get('#author-input').type('test author')
            cy.get('#url-input').type('test url')
            cy.get('#create-blog-button').click()
            cy.wait(2000)

            cy.get('#title-input').type('test title 2')
            cy.get('#author-input').type('test author 2')
            cy.get('#url-input').type('test url 2')
            cy.get('#create-blog-button').click()
            cy.wait(2000)

            cy.get('#title-input').type('test title 3').click()
            cy.get('#author-input').type('test author 3').click()
            cy.get('#url-input').type('test url 3').click()
            cy.get('#create-blog-button').click()
            cy.wait(2000)

            cy.get('.blog').eq(0).contains('Show blog').click()
            cy.get('.blog').eq(0).contains('Show details').click()
            cy.get('.blog').eq(0).contains('like').click()

            cy.get('.blog').eq(1).contains('Show blog').click()

            cy.get('.blog').eq(2).contains('Show blog').click()
            cy.get('.blog').eq(2).contains('Show details').click()
            cy.get('.blog').eq(2).contains('like').click()
            cy.get('.blog').eq(2).contains('like').click()

            cy.get('.blog').eq(0).contains('test title 3').click()
            cy.get('.blog').eq(1).contains('test title').click()
            cy.get('.blog').eq(2).contains('test title 2').click()

        })
    })
})