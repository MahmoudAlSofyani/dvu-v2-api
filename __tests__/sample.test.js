const request = require('supertest')
const app = require("../app")



describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: "admin@volkskreisuae.com",
        password: 'password',
      })
    expect(res.statusCode).toEqual(200)
  })
})